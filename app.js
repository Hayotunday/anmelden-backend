const express = require('express')
const mysql = require('mysql')
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Anmelden'
})

db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('MySql Connected...')
})

const app = express();
app.use(bodyParser.json());

// Mail sender function
const sendMail = async (receiver, name) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'idowudanielayotunde@gmail.com',
      pass: 'imzfdxcbjicwsugw'
    }
  });

  let mailOptions = {
    from: 'idowudanielayotunde@gmail.com',
    to: receiver,
    subject: 'Welcome',
    html: `<b>We are happy you joined us, ${name}</b>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email not sent: ' + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}

// Create Database
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS Anmelden'
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result)
    res.send('Database created...')
  })
})

// Create rgistration table
app.get('/createregistertable', (req, res) => {
  let sql = 'create Table IF NOT EXISTS Registration (id int AUTO_INCREMENT, firstname Varchar(50), surname varchar(50) , email varchar(50), phone varchar(20), profession varchar(50), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result)
    res.send('Table Registration created...')
  })
})

// Create entry table
// app.get('/createentrytable', (req, res) => {
//   let sql = 'create Table IF NOT EXISTS Entry (id int AUTO_INCREMENT, firstname Varchar(50), lastname varchar(50) , email varchar(50), phone varchar(20), profession varchar(50), PRIMARY KEY(id))';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result)
//     res.send('Table Registration created...')
//   })
// })

// Insert details to registration table
app.post('/adddetails/', (req, res) => {
  console.log(req.body)
  const { firstname, lastname, email, phone, profession } = req.body;
  let sql = `insert into anmelden.registration (firstname, lastname, email, phone, profession) values ('${firstname}','${lastname}','${email}','${phone}','${profession}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result)
    res.send('Inserted new details...');
    let name = lastname + '' + firstname
    sendMail(email, name);
  })
})

app.listen('3000', () => {
  console.log('Server started on port 3000')
})
