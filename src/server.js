const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();

const PORT = process.env.PORT || 8000;

const db = knex({
    client: 'pg',
    connection: DATABASE_URL
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


app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};