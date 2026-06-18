require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DO $$
BEGIN
CREATE TYPE user_role as ENUM (
    'standard',
    'moderator',
    'admin'
);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END
$$;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    password VARCHAR(255),
    role user_role NOT NULL DEFAULT 'standard',
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER REFERENCES users(id),
    body TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    thread_id INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS changelog (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    description TEXT NOT NULL,
    items TEXT[] NOT NULL,
    date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email TEXT,
    bio TEXT,
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
