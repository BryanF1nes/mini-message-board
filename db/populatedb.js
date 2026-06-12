const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    message TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, message, date_added)
VALUES
    ('Bryan', 'Hello world!', now()),
    ('Jason', 'This is cool.', now());
`;

async function main() {
    console.log("seeding...");

    const client = new Client({
        connectionString: "postgresql://bryan:root@localhost:5432/mini_message_board",
    });
    await client.connect();
    console.log("connected...");
    await client.query(SQL);
    console.log("querying...");
    await client.end();
    console.log("done");
}

main();
