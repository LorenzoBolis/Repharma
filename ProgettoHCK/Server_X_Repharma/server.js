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
     database: 'repharma',
     connectionLimit: 5
});


app.post('/signup', async (req, res) => {
  const { mail, password } = req.body;

  // Controlla se l'username esiste già
  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT * FROM utente WHERE mail = "${mail}"`);
  conn.end();

  if (rows.length > 0) {
      return res.json({ success: false, message: "Mail già registrata" });
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // dati inseriti nel database
  const conn2 = await pool.getConnection();
  await conn2.query(`INSERT INTO utente (mail, hash) VALUES ("${mail}", "${hash}")`);
  conn2.end();

  res.json({ success: true });
  console.log("Registrazione completata con successo!");
});

app.post('/login', async (req, res) => {
  console.log("Ricevuto");
  const { mail, password } = req.body;

  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT hash FROM utente WHERE mail = "${mail}"`);
  conn.end();
  // controlla la presenza dell'utente
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

app.post('/medicine', async (req, res) => {
  const { nome, quantita, orario, mail_utente } = req.body;
  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT hash FROM utente WHERE mail = "${mail_utente}"`);
  conn.end();

  // controlla la presenza dell'utente
  if (rows.length === 0) {
      return res.json({ success: false, message: "Utente non trovato" });
  }

  const conn2 = await pool.getConnection();
  await conn2.query(`INSERT INTO medicinale (nome, quantita, orario, mail_utente) VALUES ("${nome}", "${quantita}", "${orario}", "${mail_utente}")`);
  conn2.end();

  res.json({ success: true });
  console.log("Inserimento medicinale completato con successo");
});

// get in base alla mail utente
app.get('/medicine/:mail', async (req, res) => {
  const mail = req.params.mail;
  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT * FROM medicinale WHERE mail_utente = "${mail}"`);
  conn.end();

  if (rows.length === 0) {
      return res.json({ success: false, message: "Nessun medicinale inserito" });
  }

  res.json({ success: true, cont: rows });
});

// in base ad id  -> ?id=10
app.get('/medicine', async (req, res) => {
  const {id} = req.query;
  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT * FROM medicinale WHERE id = ?`, [id]);
  conn.end();

  if (rows.length === 0) {
      return res.json({ success: false, message: "Nessun medicinale trovato" });
  }

  res.json({ success: true, cont: rows[0] });
});


app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
