require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('../postgrator-config')
const app = express();
const knex = require('knex')
require('dotenv/config');
const bodyParser = require('body-parser')

const morganOption = (NODE_ENV === 'production')
? 'tiny'
: 'common';


app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use((req ,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        if(req.method === 'OPTIONS') {
            res.header(' Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({})
        }
        next();
});

const logins = [
    {
        "id": "123456",
        "email": "hello@gmail.com" ,
    "password": "password1"
},
{
    "id": "45364576",
    "email": "bye@gmail.com" ,
"password": "password2"
},
{
    "id": "helloworld",
    "email": "wow@gmail.com" ,
"password": "password3"
},
]

app.use(( error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.get('/', (req, res) => {
    res.send("Hello World");
});
    //todolist Endpoints!!

    app.get('/api/todolist', (req, res, next)=> {
        res.status(200).json({
            message: 'Handling GET requests to /todolist'
        });
    });

    app.delete('/api/todolist' , (req, res, next) => {
        res.status(200).json({
            message: 'Handling DELETE requests to /todolist'
        });
    });
    

//todolist id Endpoints!!

app.get('/api/todolist/:id', (req, res, next ) => {
    const id = req.params.id;
    if(id === 'special' ){
        res.status(200).json({
            message: 'You discovered the special ID'
            });
        } else {
            res.status(200).json({
                message: 'You passed an Id'
            });
        }
    });

        //Addtodo Endpoint!!

        app.post('/api/addtodo' , (req, res, next) => {
            const todo = {
                title: req.body.title,
                summary: req.body.summary,
                date: req.body.date
            };
            if(!req.body.title || !req.body.summary || !req.body.date) {
                res.status(400).send('Title, Summary, and Date are required!!');
                    }
                else {
                      res.status(201).json({
                          message: "todo was created!",
                          todo: todo
                      })
                }
        });


//Login Endpoints!!!

app.get('/api/login', (req,res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /login'
    });
});

app.delete('/api/login', (req, res, next) => {
    res.status(200).json({
        message: 'Handling DELETE request from /login'
    });
});


app.post('/api/login' , (req, res, next) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    };
    if(!req.body.email || !req.body.password) {
        res.status(400).send('Email and Password  are required!!');
            }
        else {
              res.status(201).json({
                  message: 'Login was Created',
                  login: login
              });
            }
        })


//Login id Endpoints!!


 app.get('/api/login/:id', (req, res, next) => {
    const id = req.params.id;
    if(id === 'special' ){
        res.status(200).json({
            message: 'You discovered the special ID'
            });
        } else {
            res.status(200).json({
                message: 'You passed an Id'
            });
        }
    });

    app.delete('/api/login/:id', (req, res) => {
        const {id} = req.params;

        const index = logins.findIndex(c => c.id === id) ;

        if(index === -1 ) {
            return res
            .status(404)
            .send('Login not Found!');
        }
        logins.splice(index, 1);
        res.send('Deleted')
    });




module.exports = app

