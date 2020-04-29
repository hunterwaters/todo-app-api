require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('../postgrator-config')
const app = express();
const knex = require('knex')
require('dotenv/config');
const loginRouter = require('./routes/login')
;

const app = express()
//const jsonParser = bodyParser.json();

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json());
app.use('/login', loginRouter);


const db = knex({
    client: 'pg',
    connection: DATABASE_URL
  })

  const morganOption = (NODE_ENV === 'production')
? 'tiny'
: 'common';


app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/api/logins', (req,res) => {
    res.send([1,2,3])
});


app.post('/api/todos' , (req, res) => {
    if(!req.body.title || !req.body.summary || !req.body.date) {
        res.status(400).send('Title, Summary, and Date are required!!');
            }
        else {
             return res.status(200).send('Here are your todos!!')
        }
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        summary: req.body.summary
    };
    todos.push(todo);
    res.send(todo);
    
});

app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id))
    if(!todo)res.status(404).send('The Todo with given id was not found')
    res.send(todo);
 });


app.use(function errorHandler(error, req, res, next) {
    let response
    if(NODE_ENV === 'production') {
        response = { error: { message: 'server error'}}
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app

