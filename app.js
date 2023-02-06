const express = require('express')
const mysql = require('mysql')
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

// Insert details to registration table
app.post('/addnewdetails/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
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
  res.header("Access-Control-Allow-Origin", "*");
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

  sql = `insert into sql8595427.EntryFormTable (
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
