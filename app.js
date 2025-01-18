const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Conexão com o banco de dados SQLite
const dbPath = path.join(__dirname, 'System.db'); // Coloque o banco no mesmo diretório do projeto
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Middleware para servir arquivos estáticos e interpretar JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota para buscar todos os pedidos
app.get('/dados', (req, res) => {
    const query = 'SELECT * FROM Cliente';
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar os dados:', err.message);
            res.status(500).send('Erro ao buscar os dados.');
        } else {
            res.json(rows);
        }
    });
});

// Rota para inserir um novo pedido
app.post('/dados', (req, res) => {
    const { Nome, Pedido, Preço, Data, Tamanho, Id } = req.body;
    const query = `INSERT INTO Cliente (Nome, Pedido, Preço, Data, Tamanho, Id) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [Nome, Pedido, Preço, Data, Tamanho, Id], function (err) {
        if (err) {
            console.error('Erro ao inserir o pedido:', err.message);
            res.status(500).send('Erro ao inserir o pedido.');
        } else {
            res.json({ id: this.lastID });
        }
    });
});

// Rota para remover um pedido pelo ID
app.delete('/pedido/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Cliente WHERE Id = ?';
    db.run(query, id, function (err) {
        if (err) {
            console.error('Erro ao remover o pedido:', err.message);
            res.status(500).send('Erro ao remover o pedido.');
        } else {
            res.send({ message: `Pedido ${id} removido.` });
        }
    });
});

// Iniciar o servidor
app.listen(port, '10.0.0.133', () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
