export const sortByDate = (a, b) =>
  new Date(b.frontmatter.pubDate).valueOf() -
  new Date(a.frontmatter.pubDate).valueOf();
