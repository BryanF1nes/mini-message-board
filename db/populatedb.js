const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user VARCHAR ( 255 ),
    message TEXT,
    added 
);

INSERT INTO messages (messages)
VALUES
    ('Hello world!'),
    ('
`
