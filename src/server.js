const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const app = require('./app')
const knex = require('knex')

const { PORT, DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})








 /*
app.post ('api/login', jsonParser, (req, res) => {
  let {email, password} = req.body;

  db
    .select('*')
    .from('login')
    .where( {email, password})
    .then(result => {

        if(result.length === 0 ) {
          return res.status(404).send("Pleae enter valid credentials!")
        }
        else {
          return res.status(200).json( {
            message: "Welcome back!"
          })
        }
        console.log(result);
    });
});

*/


