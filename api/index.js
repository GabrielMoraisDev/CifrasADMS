const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;
app.use(cors());

const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
      console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
      console.log('Conectado ao banco de dados SQLite.');
  }
});

app.get('/hinos', (req, res) => {
  const sql = 'SELECT id, name, tom FROM hinos ORDER BY name';

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: rows,
    });
  });
});

app.get('/harpa', (req, res) => {
  const sql = 'SELECT name, id, tom FROM harpa ORDER BY name';

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: rows,
    });
  });
});

app.get('/qnt', (req, res) => {
  const sql = 'SELECT count(id) as qnt FROM hinos'; // Substitua 'sua_tabela' pelo nome da tabela

  db.get(sql, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({
        row
      });
    } else {
      res.status(404).json({ message: 'Registro não encontrado' });
    }
  });
});

app.get('/:consul/:id', (req, res) => {
  const id = req.params.id;
  const consul = req.params.consul;

  // Verifique se o valor de 'consul' é válido para evitar injeção de SQL
  const allowedTables = ['hinos', 'harpa']; // Adicione as tabelas permitidas aqui
  if (!allowedTables.includes(consul)) {
    return res.status(400).json({ error: 'Tabela inválida' });
  }

  const sql = `SELECT name, texto, cifra, tom, artista FROM ${consul} WHERE id = ?`; 

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({
        data: row
      });
    } else {
      res.status(404).json({ message: 'Registro não encontrado' });
    }
  });
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Fechar conexão ao encerrar o processo (exemplo)
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error('Erro ao fechar o banco de dados:', err.message);
    }
    console.log('Conexão com o banco de dados fechada.');
    process.exit(0);
  });
});