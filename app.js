const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const cors = require('cors')
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

const host = process.env.DATABASEHOST
const user = process.env.DATABASEUSER
const password = process.env.DATABASEPASSWORD
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
        cc: ["sekretariat@swissalbmed.ch"],
        subject: 'Willkommen in unserer Gemeinschaft!',
        html: `<div>
        <p>
        Guten Tag, ${name}
        </p>
      
        <P>
          Wir freuen uns sehr, dass Sie der Gemeinschaft von Swissalbmed beigetreten sind! Ihre Mitgliedschaft bedeutet uns sehr viel, und wir sind bestrebt, ihnen die Ressourcen, die Unterstützung und die Vorteile zu bieten, die Sie für Ihren Erfolg benötigen.
        </P>
      
        <p>
          Als Mitglied haben Sie Zugang zu exklusiven Veranstaltungen, Online-Ressourcen usw. Wir ermutigen Sie, alle Vorteile der Mitgliedschaft zu nutzen  und sich in unserer Gemeinschaft zu engagieren.
        </p>
      
        <p>
          Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten und Sie auf Ihrem Weg zu unterstützen. Wenn Sie Fragen haben oder Hilfe benötigen, zögern Sie  bitte nicht, sich an uns zu wenden.
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
        cc: ["sekretariat@swissalbmed.ch"],
        subject: 'Faleminderit për regjistrim!',
        html: `<div>
        <p>
          E/I nderuar/i ${name}
        </p>
      
        <P>
          Me kënaqësi iu konfirmoj anëtarësimin tuaj në Lidhjen e Mjekëve Shqiptarë në Zvicër dhe përzemërsisht iu dëshirojmë mirëseardhje!
        </P>
      
        <p>
          Në mënyrë që të njiheni për së afërmi me LMSHZ-në, gjegjësisht me misionin e saj, iu ftoj ta vizitoni webfaqen tonë; swissalbmed.ch
        </p>
      
        <p>
          Në përputhje me statutin e shoqatës, çdo anëtar është i detyruar të paguajë kuotën e anëtarësimit. Shuma e kontributit vjetor është përcaktuar dhe miratuar në Mbledhjen e Parë të Përgjithshme të Kuvendit. Fletëpagesa e anëtarësisë dërgohet në fillim të vitit.
        </p>
      
        <p>
          Për çdo pyetje dhe paqartësi ju lutem t’na kontaktoni nëpermes E-Mailit: sekretariat@swissalbmed.ch
        </p>
      
        <p>
          Me respekt!
        </p>
      
        <p>
          Dr. med. Valbone Miftari
        </p>
      
        <p>
          Sekretare e përgjithshme e LMSHZ-së
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
