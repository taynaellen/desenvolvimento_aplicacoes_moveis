const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./models/database.sqlite');

const email = 'teste@teste.com';
const password = '1234';

db.run(
    `INSERT INTO users (email, password) VALUES (?, ?)`,
    [email, password],
    function(err) {
        if (err) {
        return console.error(err.message);
        }
        console.log(`Usuário inserido com ID ${this.lastID}`);
    }
);

db.close();
