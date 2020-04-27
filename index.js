const express =require('express')
const app = express();
const knex = require('knex')
const mongoose = require('mongoose');
require('dotenv/config');
//const jsonParser = bodyParser.json();

app.use(express.json());
const loginRoute = require('./routes/login');
app.use('/login', loginRoute);
const port = process.env.PORT || 8000;


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/api/logins', (req,res) => {
    res.send([1,2,3])
});

mongoose.connect(
    'process.env.DB_URL',
     { useNewUrlParser: true },
    () => console.log('connected to database!!')
    );

const todos = [
   { id: 1, title: 'title1', summary: 'this is summary 1', date: '10/02/2019' },
   {id: 2, title: 'title2', summary: 'this is summary 2', date: '11/02/2010' },
   {id: 3, title: 'title1', summary: 'this is summary 3', date: '08/02/2017' },
   {id: 4, title: 'title4', summary: 'this is summary 4', date: '02/13/2016' },
]

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













