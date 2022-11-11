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

app.use(cors());

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
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
app.post('/login', (req, res) => {

  const { table } = req.query;

  let nom = req.body.name;
  let password = req.body.password;
  
 
  const user={nom, password}
  pool.query(`INSERT INTO ${table} SET ?`, user, (err, results) => {
      if(err) {
          console.log("insert error");
          res.send(err)
      }
      else {
          res.send({ error: false, data: results, message: 'user has been updated successfully.' });
      }

  });   
});