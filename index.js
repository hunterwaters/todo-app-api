const express =require('express')
const app = express();
const knex = require('knex')
//const jsonParser = bodyParser.json();

app.use(express.json());

const port = process.env.PORT || 8000;

const logins = [
   { id : 1, email: '123@gmail.com', password: 'pass123' },
   { id : 2, email: '456@gmail.com', password: 'pass456' },
   { id : 3, email: '789@gmail.com', password: 'pass789' }
]


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/api/logins', (req,res) => {
    res.send([1,2,3])
});

app.get('/api/logins/:id', (req, res) => {
   const login = logins.find(c => c.id === parseInt(req.params.id))
   if(!login)  res.status(404).send('The Login with given id was not found')
   res.send(login);
});

app.post('/api/logins' , (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).send('Email and Password are required');
            }
        else {
             return res.status(200).send('Welcome Back!!')
        }
    const login = {
        id: logins.length + 1,
        email: req.body.email,
        password: req.body.password
    };
    logins.push(login);
    res.send(login);
})

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









