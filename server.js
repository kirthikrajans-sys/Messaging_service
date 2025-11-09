// ===============================
// Unified Messaging App Server.js
// User Auth, Contacts, SMS Messages, Twilio webhook, .env config
// ===============================
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL config
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'msg_app'
});
db.connect(err => {
  if (err) console.error('MySQL error', err);
  else console.log('MySQL connected');
});

// Twilio API
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Table schemas
db.query(`CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
)`);
db.query(`CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255)
)`);
db.query(`CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_id INT NOT NULL,
  direction ENUM('inbound','outbound') NOT NULL,
  body TEXT NOT NULL,
  timestamp DATETIME NOT NULL,
  FOREIGN KEY (contact_id) REFERENCES contacts(id)
)`);

// --- Auth endpoints ---
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword], (err) => {
        if (err) return res.status(500).send('Error creating user');
        return res.status(201).send('User created');
      });
  } catch (err) {
    res.status(500).send('Server error');
  }
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send('Invalid credentials');
    const user = results[0];
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret');
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// --- Contact endpoints ---
app.post('/contacts', (req, res) => {
  const { name, phone, email } = req.body;
  db.query('INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)',
    [name, phone, email], (err) => {
      if (err) return res.status(500).send('Error adding contact');
      res.status(201).send('Contact added');
    });
});
app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) return res.status(500).send('Error fetching contacts');
    res.json(results);
  });
});

// --- Message endpoints ---
app.post('/send-sms', async (req, res) => {
  const { to, body, contactId } = req.body;
  try {
    const sms = await twilioClient.messages.create({
      body,
      to,
      from: process.env.TWILIO_PHONE_NUMBER
    });
    db.query('INSERT INTO messages (contact_id, direction, body, timestamp) VALUES (?, "outbound", ?, NOW())',
      [contactId, body]);
    res.json({ sid: sms.sid });
  } catch (err) {
    res.status(500).send('Failed to send SMS');
  }
});

// Receive SMS webhook (Twilio will POST here)
app.post('/sms-webhook', express.urlencoded({ extended: false }), (req, res) => {
  console.log('Inbound SMS from:', req.body.From, 'Message:', req.body.Body);
  const from = req.body.From;
  const body = req.body.Body;
  db.query('SELECT id FROM contacts WHERE phone = ?', [from], (err, results) => {
    const contactId = results.length ? results[0].id : null;
    if (contactId) {
      db.query('INSERT INTO messages (contact_id, direction, body, timestamp) VALUES (?, "inbound", ?, NOW())',
        [contactId, body]);
    }
  });
  res.type('text/xml').send('<Response></Response>');
});

// Get all messages for a contact
app.get('/messages/:contactId', (req, res) => {
  db.query('SELECT * FROM messages WHERE contact_id = ? ORDER BY timestamp ASC', [req.params.contactId], (err, results) => {
    if (err) return res.status(500).send('Error fetching messages');
    res.json(results);
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));
