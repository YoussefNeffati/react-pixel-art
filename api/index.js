const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(express.json());

app.use(cors());

app.listen(8000, () => {
  console.log(`App server now listening on port ${8000}`);
});

app.get('/get', (req, res) => {
  const { table } = req.query;

  pool.query(`select * from ${table}`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//LOGIN (AUTHENTICATE USER)
app.post('/inscription', (req, res) => {
  const { table } = req.query;

  let nom = req.body.user.name;
  let password = req.body.user.password;
  
 
  const user={nom, password}
  pool.query(`INSERT INTO account (name,password) VALUES ('${nom}','${password}')`, (err, results) => {
      if(err) {
          console.log("insert error");
          res.send(err)
      }
      else {
          res.send({ error: false, data: results, message: 'user has been updated successfully.' });
      }

  });   
});