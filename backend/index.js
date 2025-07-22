const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email e senha obrigatórios.' });

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';

    db.run(sql, [email, password], function(err) {
        if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Email já cadastrado.' });
        }
        return res.status(500).json({ error: 'Erro no banco.' });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.get(sql, [email, password], (err, row) => {
        if (err) return res.status(500).json({ error: 'Erro no banco.' });
        if (!row) return res.status(401).json({ error: 'Credenciais inválidas.' });

        res.json({ id: row.id, email: row.email });
    });
});

app.post('/favorites', (req, res) => {
    const { user_id, movie_id, title, poster_path } = req.body;

    if (!user_id || !movie_id) return res.status(400).json({ error: 'user_id e movie_id obrigatórios.' });

  const checkSql = 'SELECT * FROM favorites WHERE user_id = ? AND movie_id = ?';
    db.get(checkSql, [user_id, movie_id], (err, row) => {
        if (err) return res.status(500).json({ error: 'Erro no banco.' });
        if (row) return res.status(409).json({ error: 'Filme já está nos favoritos.' });

        const insertSql = 'INSERT INTO favorites (user_id, movie_id, title, poster_path) VALUES (?, ?, ?, ?)';
        db.run(insertSql, [user_id, movie_id, title, poster_path], function(err) {
        if (err) return res.status(500).json({ error: 'Erro ao salvar favorito.' });

        res.status(201).json({ message: 'Filme adicionado aos favoritos!' });
        });
    });
});

app.get('/favorites/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM favorites WHERE user_id = ?';

    db.all(sql, [user_id], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erro no banco.' });
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
