-- +goose Up
-- +goose StatementBegin
CREATE TABLE articles (
    row_id INTEGER PRIMARY KEY AUTOINCREMENT,
    id TEXT UNIQUE NOT NULL,
    updatedAt DATE,
    createdAt DATE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    description TEXT NOT NULL
);
CREATE VIRTUAL TABLE articles_fts USING fts5(
    id,
    title,
    description,
    content='articles',
    content_rowid='row_id'
);

CREATE TRIGGER articles_ai AFTER INSERT ON articles
BEGIN
    INSERT INTO articles_fts (rowid, id, title, description)
    VALUES (new.row_id, new.id, new.title, new.description);
END;

CREATE TRIGGER articles_ad AFTER DELETE ON articles
BEGIN
    DELETE FROM articles_fts WHERE rowid = old.row_id;
END;

CREATE TRIGGER articles_au AFTER UPDATE ON articles
BEGIN
    UPDATE articles_fts SET 
        id = new.id, 
        title = new.title, 
        description = new.description 
    WHERE rowid = old.row_id;
END;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TRIGGER articles_au;
DROP TRIGGER articles_ad;
DROP TRIGGER articles_ai;
DROP TABLE articles_fts;
DROP TABLE articles;
-- +goose StatementEnd
