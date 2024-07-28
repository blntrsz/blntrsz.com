-- +goose Up
-- +goose StatementBegin
CREATE TABLE activity_logs (
    row_id INTEGER PRIMARY KEY AUTOINCREMENT,
    id TEXT UNIQUE,
    updatedAt DATE,
    createdAt DATE,
    name TEXT,
    metaData JSON
);

CREATE VIRTUAL TABLE activity_logs_fts USING fts5(
    id,
    name,
    metaData,
    content='activity_logs',
    content_rowid='row_id'
);

CREATE TRIGGER activity_logs_ai AFTER INSERT ON activity_logs 
BEGIN
    INSERT INTO activity_logs_fts(rowid, id, name, metaData)
    VALUES (new.row_id, new.id, new.name, new.metaData);
END;

CREATE TRIGGER activity_logs_au AFTER UPDATE ON activity_logs BEGIN
    INSERT INTO activity_logs_fts(activity_logs_fts, rowid, id, name, metaData)
    VALUES ('delete', old.row_id, old.id, old.name, old.metaData);
    INSERT INTO activity_logs_fts(rowid, id, name, metaData)
    VALUES (new.row_id, new.id, new.name, new.metaData);
END;

CREATE TRIGGER activity_logs_ad AFTER DELETE ON activity_logs BEGIN
    INSERT INTO activity_logs_fts(activity_logs_fts, rowid, id, name, metaData)
    VALUES ('delete', old.row_id, old.id, old.name, old.metaData);
END;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TRIGGER activity_logs_ai;
DROP TRIGGER activity_logs_au;
DROP TRIGGER activity_logs_ad;
DROP TABLE activity_logs_fts;
DROP TABLE activity_logs;
-- +goose StatementEnd
