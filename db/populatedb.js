require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE messages;
DROP TABLE changelog;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER REFERENCES users(id),
    body TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS changelog (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    description TEXT NOT NULL,
    items TEXT[] NOT NULL,
    date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);
`;

async function main() {
    console.log("seeding...");

    const client = new Client({
        connectionString: process.env.DEV_CONNECTION_STRING,
    });
    await client.connect();
    console.log("connected...");
    await client.query(SQL);
    console.log("querying...");
    await client.end();
    console.log("done");
}

main();
