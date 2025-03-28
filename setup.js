const path = require("path");

const sqlite = require("sqlite3");

const dbFilePath = path.join(__dirname, "dev.db");

const createUsersQuery = `
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);
`;

const createCommentsQuery = `
CREATE TABLE IF NOT EXISTS comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT DEFAULT '' NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);
`;
const createCommentsReplyQuery = `
CREATE TABLE IF NOT EXISTS reply (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT DEFAULT '' NOT NULL,
    user_id INTEGER NOT NULL,
    comment_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comment (id) ON DELETE CASCADE
);
`;



const insertUserQuery = `
INSERT INTO user 
  (name)
VALUES
  ('Bob');
  
`;


const db = new sqlite.Database(
  dbFilePath,
  sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE
);

db.serialize(() => {
  db.run(createUsersQuery);
  console.log("[✔️] Added user table successfully");

  db.run(createCommentsQuery);
  console.log("[✔️] Added comment table successfully");

  db.run(createCommentsReplyQuery);
  console.log("[✔️] Added reply table successfully");

 
  
});

db.close();
