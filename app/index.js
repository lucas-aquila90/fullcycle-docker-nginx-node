const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3005;

// Configuração do MySQL
const db = mysql.createPool({
  host: process.env.MYSQL_HOST || 'mysql',
  user: 'root',
  password: 'root',
  database: 'fullcycle',
});

app.get('/', async (req, res) => {
  try {
    // Inserindo um registro aleatório
    const name = `Nome_${Math.floor(Math.random() * 1000)}`;
    await db.query('INSERT INTO people(name) VALUES (?)', [name]);

    // Consultando todos os registros
    const [rows] = await db.query('SELECT * FROM people');

    let list = '<ul>';
    rows.forEach(person => {
      list += `<li>${person.name}</li>`;
    });
    list += '</ul>';

    res.send(`<h1>Full Cycle Rocks!</h1>${list}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});