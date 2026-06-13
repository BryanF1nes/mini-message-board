require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE messages;
DROP TABLE changelog;

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

INSERT INTO messages (username, message)
VALUES
    ('Bryan', 'Hello world!'),
    ('Jason', 'This is cool.'),
    ('Kevin', 'Did you know that everyone wants a water buffalo?'),
    ('Aaragorn', 'I would follow you to the end little one...'),
    ('Boromir', 'One does not simply walk into Mordor. Its Black Gates are guarded by more than just orcs... It is folly..'),
    ('Gimli', 'Nobody tosses a dwarf!'),
    ('Legolas', 'The way is shut. It was made by those who are dead, and the dead keep it.'),
    ('David', 'Psalm 23: The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name’s sake. Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me. You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows. Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever.');

INSERT INTO changelog (description, items)
VALUES
    ('Verison 1.0.1 - SQL Database is a go!',
    ARRAY[
        'We now have changelog information!',
        'Soon we may even have tailwind support?!',
        'But this is just a sample changelog, not the real deal.'
        ]
    );

INSERT INTO changelog (description, items)
VALUES
    ('Verison 1.0.2 - Soon we will get OpenAI support!',
    ARRAY[
        'This developer is a pretty cool dude!',
        'If only we had cooler changelog messages.',
        'At least he lets us post pictures?',
        'Just wait until he figures out how to do real time streaming.'
        ]
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
