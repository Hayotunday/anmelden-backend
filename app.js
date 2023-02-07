const express = require('express')
const mysql = require('mysql')
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());

// const host = process.env.DATABASEHOST
// const user = process.env.DATABASEUSER
// const password = process.env.DATABASEPASSWORD
const host = "80.74.145.118"
const user = "forms_DB"
const password = "u1&ap3C56"
const email_register = process.env.EMAILREGISTER
const mailpass_register = process.env.MAILPASSREGISTER
const email_entry = process.env.EMAILENTRY
const mailpass_entry = process.env.MAILPASSENTRY

// Create connection
const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: user
})

db.connect((err) => {
  if (err) {
    console.log('MySql not connected...')
    throw err
  }
  console.log('MySql Connected...')
})


// Mail sender function
const sendMail = async (receiver, name, type) => {
  let transporter
  let mailOptions = {}

  switch (type) {
    case "entry":
      transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: email_entry,
          pass: mailpass_entry
        }
      });

      mailOptions = {
        from: email_entry,
        to: receiver,
        subject: 'Willkommen in unserer Gemeinschaft!',
        html: `<div>
        <p>
          Lieber, ${name}
        </p>
      
        <P>
          wir freuen uns sehr, Sie als neuen Mitglied in unserer Community begrüssen zu dürfen!
        </P>
      
        <p>
          Wir haben es uns zur Aufgabe gemacht, unseren Mitglieder
          qualitativ hochwertigsten Informationen, Ressourcen und Möglichkeiten in Ihrer beruf zu bieten. Von interessanten
          Artikeln und wertvollen Tipps bis hin zu spannenden Veranstaltungen und exklusiven Angeboten
          können Sie sich darauf verlassen, dass wir Sie auf dem Laufenden halten.
        </p>
      
        <p>
          Wir ermutigen Sie auch, sich zu beteiligen, indem Sie Ihre Gedanken mitteilen Feedback geben etc. Wir hören gerne
          von unseren Abonnenten und schätzen Ihre Beiträge zu unserer Gemeinschaft.
        </p>
      
        <p>
          Noch einmal: Herzlich willkommen in unserer Community! Wir freuen uns sehr, Sie bei uns zu haben.
        </p>
      
        <p>
          Mit freundlichen Grüssen,
        </p>
      
        <p>
          Dr. med. Valbona Miftari
        </p>
      
        <p>
          Swissalbmed
        </p>
      </div>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Email not sent: ' + error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      break;
    case "register":
      transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: email_register,
          pass: mailpass_register
        }
      });

      mailOptions = {
        from: email_register,
        to: receiver,
        subject: 'Willkommen zum Symposium!',
        html: `<div>
        <p>
          Sehr geehrte(r) ${name}
        </p>
      
        <P>
          wir freuen uns sehr, dass Sie am Anmeldung symposium teilnehmen werden! Wir haben hart daran gearbeitet, ein
          unvergessliches Erlebnis für alle Teilnehmer zu schaffen, und wir können es kaum erwarten, dass Sie ein Teil davon
          sind.
        </P>
      
        <p>
          Auf dem Symposium werden Sie die Möglichkeit haben, [einige der wichtigsten Höhepunkte der Veranstaltung
          aufzulisten, wie z. B. Networking-Möglichkeiten, Vorträge von Gastrednern, Podiumsdiskussionen usw.]. Unser Ziel ist
          es, Ihnen wertvolle Einblicke aktuelle Informationen etc zu vermitteln, die Sie in Ihr [berufliches/persönliches
          leben mitnehmen und anwenden können.
        </p>
      
        <p>
          Bitte zögern Sie nicht, uns zu kontaktieren, wenn Sie Fragen oder Bedenken haben. Unser Team steht Ihnen während des
          gesamten Anmeldung symposium zur Verfügung.
        </p>
      
        <p>
          Noch einmal: Herzlich willkommen zum Anmeldung symposium. Wir freuen uns darauf, Sie bald wiederzusehen!
        </p>
      
        <p>
          Mit freundlichen Grüssen,
        </p>
      
        <p>
          Dr. med. Valbona Miftari
        </p>
      
        <p>
          Swissalbmed
        </p>
      </div>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Email not sent: ' + error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      break;
    default:
      break;
  }
}

// Insert details to registration table
app.post('/addnewdetails/', (req, res) => {
  const { firstname, lastname, email, phone, profession } = req.body;
  sql = `insert into Registration (firstname, lastname, email, phone, profession) values ('${firstname}','${lastname}','${email}','${phone}','${profession}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result)
    res.send('Inserted into database.....');
    const type = "register"
    sendMail(email, firstname, type);
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

  sql = `insert into EntryFormTable (
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
    surname,
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
    if (err) {
      console.log(err);
    }
    console.log(result)
    res.send('Inserted into database.....');
    const type = "entry";
    sendMail(email, firstname, type);
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server started on port 3000')
})
