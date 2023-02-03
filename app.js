const express = require('express')
const mysql = require('mysql')
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
require('dotenv').config()

const host = process.env.DATABASEHOST
const user = process.env.DATABASEUSER
const password = process.env.DATABASEPASSWORD
const email = process.env.EMAIL
const mailpass = process.env.MAILPASS

// Create connection
const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: user
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
      user: email,
      pass: mailpass
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

// Create Tables
// app.get('/createtable', (req, res) => {
//   let sql = 'create Table IF NOT EXISTS EntryFormTable ('
//     + 'id int AUTO_INCREMENT,'
//     + 'salutation Varchar(10) not null,'
//     + 'employment varchar(20) not null,'
//     + 'title varchar(50) not null,'
//     + 'practice varchar(50),'
//     + 'eduTitle Varchar(50),'
//     + 'street varchar(150),'
//     + 'profession varchar(50) not null,'
//     + 'postcode int(20),'
//     + 'firstname Varchar(50) not null,'
//     + 'location varchar(50) not null,'
//     + 'surname varchar(50) not null,'
//     + 'phone varchar(20),'
//     + 'dob date,'
//     + 'email varchar(50) not null,'
//     + 'diplomaCountry varchar(50) not null,'
//     + 'privateAddress Varchar(50),'
//     + 'diplomayear date,'
//     + 'privatezip varchar(20) not null,'
//     + 'gln varchar(50),'
//     + 'privatelocation varchar(150) not null,'
//     + 'uid Varchar(100),'
//     + 'privatephone varchar(50),'
//     + 'PRIMARY KEY(id))'
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result)
//     res.send('Table Entry created...')
//   })

//   sql = 'create Table IF NOT EXISTS Registration (id int AUTO_INCREMENT, firstname Varchar(50) not null, lastname varchar(50) not null, email varchar(50) not null, phone varchar(20) not null, profession varchar(50) not null, PRIMARY KEY(id))';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result)
//     res.send('Table Registration created...')
//   })
// })

// Insert details to registration table
app.post('/addnewdetails/', (req, res) => {
  const { firstname, lastname, email, phone, profession } = req.body;
  sql = `insert into sql8595427.Registration (firstname, lastname, email, phone, profession) values ('${firstname}','${lastname}','${email}','${phone}','${profession}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result)
    res.send('Inserted new details...');
    let name = lastname + '' + firstname
    sendMail(email, name);
  })
})

// Insert data to entry table
app.post('/addentry/', (req, res) => {
  const {
    salutation,
    employment,
    title,
    practice,
    eduTitle,
    street,
    profession,
    postcode,
    firstname,
    location,
    lastname,
    phone,
    dob,
    email,
    diplomaCountry,
    privateaddress,
    diplomayear,
    privatezip,
    gln,
    privatelocation,
    uid,
    privatephone
  } = req.body;

  sql = `insert into sql8595427.Registration (
    salutation,
    employment,
    title,
    practice,
    eduTitle,
    street,
    profession,
    postcode,
    firstname,
    location,
    lastname,
    phone,
    dob,
    email,
    diplomaCountry,
    privateaddress,
    diplomayear,
    privatezip,
    gln,
    privatelocation,
    uid,
    privatephone
    ) values ('${salutation}','${employment}','${title}','${practice}','${eduTitle}','${street}','${profession}','${postcode}','${firstname}','${location}','${lastname}','${phone}','${dob}','${email}','${diplomaCountry}','${privateaddress}','${diplomayear}','${privatezip}','${gln}','${privatelocation}','${uid}','${privatephone}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result)
    res.send('Inserted new details...');
    let name = lastname + '' + firstname
    sendMail(email, name);
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server started on port 3000')
})
