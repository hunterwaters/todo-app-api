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
const loginRouter = require('./login/login-router')
const todolistRouter = require('./todolist/todolist-router')
const addtodoRouter = require('./addtodo/addtodo-router')

const morganOption = (NODE_ENV === 'production')
? 'tiny'
: 'common';


app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(loginRouter);
app.use(todolistRouter)
app.use(addtodoRouter)

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

app.use(( error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app

