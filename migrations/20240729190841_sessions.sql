-- +goose Up
-- +goose StatementBegin
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  updatedAt DATE,
  createdAt DATE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE sessions;
-- +goose StatementEnd
