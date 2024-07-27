-- +goose Up
-- +goose StatementBegin
-- Create the 'articles' table
CREATE TABLE articles (
    id TEXT PRIMARY KEY,
    updatedAt DATE,
    createdAt DATE,
    title TEXT,
    description TEXT
);
-- +goose StatementEnd

-- +goose StatementBegin
-- Create the 'activity_logs' table
CREATE TABLE activity_logs (
    id TEXT PRIMARY KEY,
    updatedAt DATE,
    createdAt DATE,
    name TEXT,
    metaData JSON
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE articles;
-- +goose StatementEnd
-- +goose StatementBegin
DROP TABLE activity_logs;
-- +goose StatementEnd
