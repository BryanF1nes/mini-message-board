const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    message TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS changelog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    items TEXT[] NOT NULL
);

INSERT INTO messages (username, message, date_added)
VALUES
    ('Bryan', 'Hello world!', now()),
    ('Jason', 'This is cool.', now());
`;

async function main() {
    console.log("seeding...");

    const client = new Client({
        connectionString: process.env.CONNECTION_STRING,
    });
    await client.connect();
    console.log("connected...");
    await client.query(SQL);
    console.log("querying...");
    await client.end();
    console.log("done");
}

main();
