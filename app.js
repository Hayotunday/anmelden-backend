// const express = require('express')
// const mysql = require('mysql')
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer')
// const cors = require('cors')
// require('dotenv').config()

// const app = express();
// app.use(cors({
//   origin: '*'
// }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(bodyParser.json());

// const host = process.env.DATABASEHOST
// const user = process.env.DATABASEUSER
// const password = process.env.DATABASEPASSWORD
// const email_register = process.env.EMAILREGISTER
// const mailpass_register = process.env.MAILPASSREGISTER
// const email_entry = process.env.EMAILENTRY
// const mailpass_entry = process.env.MAILPASSENTRY

// // Create connection
// const db = mysql.createConnection({
//   host: host,
//   user: user,
//   password: password,
//   database: user
// })

// db.connect((err) => {
//   if (err) {
//     console.log('MySql not connected...')
//     throw err
//   }
//   console.log('MySql Connected...')
// })


// // Mail sender function
// const sendMail = async (receiver, name, type) => {
//   let transporter
//   let mailOptions = {}

//   switch (type) {
//     case "entry":
//       transporter = nodemailer.createTransport({
//         service: 'gmail',
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//           user: email_entry,
//           pass: mailpass_entry
//         }
//       });

//       mailOptions = {
//         from: email_entry,
//         to: receiver,
//         cc: ["sekretariat@swissalbmed"],
//         subject: 'Willkommen in unserer Gemeinschaft!',
//         html: `<div>
//         <p>
//         Sehr geehrtes, ${name}
//         </p>

//         <P>
//           Wir freuen uns sehr, dass Sie der Gemeinschaft von Swissalbmed beigetreten sind! Ihre Mitgliedschaft bedeutet uns sehr viel, und wir sind bestrebt, hnen die Ressourcen, die Unterst??tzung und die Vorteile zu bieten, die Sie f??r Ihren Erfolg ben??tigen.
//         </P>

//         <p>
//           Als Mitglied haben Sie Zugang zu exklusiven Veranstaltungen, Online-Ressourcen usw. Wir ermutigen Sie, alle Vorteile der Mitgliedschaft zu nutzen  und sich in unserer Gemeinschaft zu engagieren.
//         </p>

//         <p>
//           Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten und Sie auf Ihrem Weg zu unterst??tzen. Wenn Sie Fragen haben oder Hilfe ben??tigen, z??gern Sie  bitte nicht, sich an uns zu wenden.
//         </p>

//         <p>
//           Mit freundlichen Gr????en,
//           Valbona MIftari
//         </p>

//         <p>
//           Dr. med. Valbona Miftari
//         </p>

//         <p>
//           Swissalbmed
//         </p>
//       </div>`
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log('Email not sent: ' + error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       })
//       break;
//     case "register":
//       transporter = nodemailer.createTransport({
//         service: 'gmail',
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//           user: email_register,
//           pass: mailpass_register
//         }
//       });

//       mailOptions = {
//         from: email_register,
//         to: receiver,
//         cc: ["sekretariat@swissalbmed"],
//         subject: 'Willkommen zum Symposium!',
//         html: `<div>
//         <p>
//           Sehr geehrte(r) ${name}
//         </p>

//         <P>
//           wir freuen uns sehr, dass Sie am Anmeldung symposium teilnehmen werden! Wir haben hart daran gearbeitet, ein
//           unvergessliches Erlebnis f??r alle Teilnehmer zu schaffen, und wir k??nnen es kaum erwarten, dass Sie ein Teil davon
//           sind.
//         </P>

//         <p>
//           Auf dem Symposium werden Sie die M??glichkeit haben, [einige der wichtigsten H??hepunkte der Veranstaltung
//           aufzulisten, wie z. B. Networking-M??glichkeiten, Vortr??ge von Gastrednern, Podiumsdiskussionen usw.]. Unser Ziel ist
//           es, Ihnen wertvolle Einblicke aktuelle Informationen etc zu vermitteln, die Sie in Ihr [berufliches/pers??nliches
//           leben mitnehmen und anwenden k??nnen.
//         </p>

//         <p>
//           Bitte z??gern Sie nicht, uns zu kontaktieren, wenn Sie Fragen oder Bedenken haben. Unser Team steht Ihnen w??hrend des
//           gesamten Anmeldung symposium zur Verf??gung.
//         </p>

//         <p>
//           Noch einmal: Herzlich willkommen zum Anmeldung symposium. Wir freuen uns darauf, Sie bald wiederzusehen!
//         </p>

//         <p>
//           Mit freundlichen Gr??ssen,
//         </p>

//         <p>
//           Dr. med. Valbona Miftari
//         </p>

//         <p>
//           Swissalbmed
//         </p>
//       </div>`
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log('Email not sent: ' + error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       })
//       break;
//     default:
//       break;
//   }
// }

// // Insert details to registration table
// app.post('/addnewdetails/', (req, res) => {
//   const { firstname, lastname, email, phone, profession } = req.body;
//   sql = `insert into Registration (firstname, lastname, email, phone, profession) values ('${firstname}','${lastname}','${email}','${phone}','${profession}')`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result)
//     res.send('Inserted into database.....');
//     const type = "register"
//     sendMail(email, firstname, type);
//   })
// })

// // Insert data to entry table
// app.post('/addentry/', (req, res) => {
//   const {
//     salutation,
//     employment,
//     title,
//     practice,
//     eduTitle,
//     street,
//     profession,
//     postcode,
//     firstname,
//     location,
//     lastname,
//     phone,
//     dob,
//     email,
//     diplomaCountry,
//     privateaddress,
//     diplomayear,
//     privatezip,
//     gln,
//     privatelocation,
//     uid,
//     privatephone
//   } = req.body;

//   sql = `insert into EntryFormTable (
//     salutation,
//     employment,
//     title,
//     practice,
//     eduTitle,
//     street,
//     profession,
//     postcode,
//     firstname,
//     location,
//     surname,
//     phone,
//     dob,
//     email,
//     diplomaCountry,
//     privateaddress,
//     diplomayear,
//     privatezip,
//     gln,
//     privatelocation,
//     uid,
//     privatephone
//     ) values ('${salutation}','${employment}','${title}','${practice}','${eduTitle}','${street}','${profession}','${postcode}','${firstname}','${location}','${lastname}','${phone}','${dob}','${email}','${diplomaCountry}','${privateaddress}','${diplomayear}','${privatezip}','${gln}','${privatelocation}','${uid}','${privatephone}')`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result)
//     res.send('Inserted into database.....');
//     const type = "entry";
//     sendMail(email, firstname, type);
//   })
// })

// const port = process.env.PORT || 3000

// app.listen(port, () => {
//   console.log('Server started on port 3000')
// })


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
        cc: "sekretariat@swissalbmed.ch",
        subject: 'Willkommen in unserer Gemeinschaft!',
        html: `<div>
        <p>
        Guten Tag, ${name}
        </p>
      
        <P>
          Wir freuen uns sehr, dass Sie der Gemeinschaft von Swissalbmed beigetreten sind! Ihre Mitgliedschaft bedeutet uns sehr viel, und wir sind bestrebt, ihnen die Ressourcen, die Unterst??tzung und die Vorteile zu bieten, die Sie f??r Ihren Erfolg ben??tigen.
        </P>
      
        <p>
          Als Mitglied haben Sie Zugang zu exklusiven Veranstaltungen, Online-Ressourcen usw. Wir ermutigen Sie, alle Vorteile der Mitgliedschaft zu nutzen  und sich in unserer Gemeinschaft zu engagieren.
        </p>
      
        <p>
          Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten und Sie auf Ihrem Weg zu unterst??tzen. Wenn Sie Fragen haben oder Hilfe ben??tigen, z??gern Sie  bitte nicht, sich an uns zu wenden.
        </p>
      
        <p>
          Mit freundlichen Gr??ssen,
          
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
        cc: "sekretariat@swissalbmed.ch",
        subject: 'Danke f??r die Anmeldung!',
        html: `<div>
        <p>
          Guten Tag ${name}
        </p>
      
        <P>
          wir freuen uns sehr, dass Sie am symposium teilnehmen werden! Wir haben hart daran gearbeitet, ein
          unvergessliches Erlebnis f??r alle Teilnehmer zu schaffen, und wir k??nnen es kaum erwarten, dass Sie ein Teil davon
          sind.
        </P>
      
        <p>
          Auf dem Symposium werden Sie die M??glichkeit haben, wie z. B. Networking-M??glichkeiten, Vortr??ge von Gastrednern, Podiumsdiskussionen usw.]. Unser Ziel ist es, Ihnen wertvolle Einblicke aktuelle Informationen etc zu vermitteln, die Sie in Ihr berufliches leben mitnehmen und anwenden k??nnen.
        </p>
      
        <p>
          Bitte z??gern Sie nicht, uns zu kontaktieren, wenn Sie Fragen oder Bedenken haben. Unser Team steht Ihnen w??hrend des
          gesamten symposium zur Verf??gung.
        </p>
      
        <p>
          Noch einmal: Herzlich willkommen zum symposium. Wir freuen uns darauf, Sie bald wiederzusehen!
        </p>
      
        <p>
          Mit freundlichen Gr??ssen,
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
