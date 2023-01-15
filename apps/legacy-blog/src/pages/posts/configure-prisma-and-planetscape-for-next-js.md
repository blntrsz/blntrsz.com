---
setup: 'import Layout from ''../../layouts/BlogPost.astro''

  '
title: Configure Prisma and PlanetScale for Next.js
pubDate: 2022-06-02T22:00:00Z
tags:
- typescript
- prisma
description: Prisma is the best ORM for TypeScript so let's add it to our project
github: https://github.com/blntrsz/hypebeast-stack

---
First, let's install the necessary dependencies:

```bash
pnpm add -D prisma @prisma/client
```

# Configure the schema for PlanetScale connect

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["referentialIntegrity"]
}

datasource db {
  provider             = "mysql"
  url                  = env("DATABASE_URL")
  referentialIntegrity = "prisma"
}
```

Now we need the secret. Add `DATABASE_URL` to `.env`:

```bash
DATABASE_URL='mysql://<name>:<password>.<location>.psdb.cloud/<db-name>?sslaccept=strict'
```

The important part is `?sslaccept=strict`, without it we get and error. Now add some models to out schema:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int

  @@index(authorId)
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique

  @@index(userId)
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

With that, we can deploy the schema to the database:

```bash
npx prisma db push
```

For development, we can generate types:

```bash
npx prisma generate
```

And now we can use prisma!