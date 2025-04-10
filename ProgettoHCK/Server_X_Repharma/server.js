const express = require('express');
const mariadb = require('mariadb');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 4111;

app.use(express.json());

const pool = mariadb.createPool({
     host: 'db.dintra.duckdns.org', 
     user:'Bolis', 
     password: 'b1234b',
     database: 'boliso',
     connectionLimit: 5
});


app.post('/signup', async (req, res) => {
  //DAI CARISSONI
});

app.post('/login', async (req, res) => {
  console.log("Ricevuto");
  const { username, password } = req.body;

  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT hash FROM dati WHERE username = "${username}"`);
  conn.end();

  if (rows.length === 0) {
      return res.json({ success: false, message: "Utente non trovato" });
  }

  const hash = rows[0].hash;

  // Confronta la password inserita con l'hash memorizzato nel database
  const match = await bcrypt.compare(password, hash);

  if (match) {
      res.json({ success: true });
  } else {
      res.json({ success: false, message: "Password errata" });
  }
});


app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
