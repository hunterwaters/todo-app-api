require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const { NODE_ENV } = require('../postgrator-config')
const app = express();
const knex = require('knex')
require('dotenv/config');
const bodyParser = require('body-parser')
const loginRouter = require('./login/login-router')
const todolistRouter = require('./todolist/todolist-router')
const addtodoRouter = require('./addtodo/addtodo-router')

const morganOption = (NODE_ENV === 'production')
? 'tiny'
: 'common';

app.use(
function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
});


app.use(morgan(morganOption))
app.use(helmet())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(loginRouter);
app.use(todolistRouter)
app.use(addtodoRouter)

app.use(( error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.get('/', (req, res)=> {
    res.send('Hello, world!')
})


module.exports = app

