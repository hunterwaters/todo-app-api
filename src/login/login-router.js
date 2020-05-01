const express = require('express');
const loginRouter = express.Router();
const bodyParser = express.json();
const knex = require('knex')
const LoginService = require('./login-service');
//const xss = require('xss')
const path = require('path')

const db = knex({
    client: 'pg',
    connection: 'postgresql://dunder_mifflin@localhost/todo_app'
  })


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

loginRouter
.route('/api/login')
.post(bodyParser, (req, res) => {
const { id, email, password} = req.body
    const newLogin = {id, email, password}
    if(!email) {
        return res
            .status(400)
            .send('Email Required');
    }
    if(!password) {
        return res
            .status(400)
            .send('Password Required');
    }
    if(email.length < 6 || email.length > 20) {
        return res
            .status(400)
            .send('Email must be between 6 and 20 characters long')
    }
    if(password.length < 8 || password.length > 25) {
        return res
            .status(400)
            .send('Password must be between 8 and 25 characters long')
    }
    else {
        res.status(201).json({
            ...req.body
        })
    }
    db 
    .insert( newLogin)
    .into( 'login')
    .returning('*')
    .then ( result => {
        return res.status( 201).json( result);
    })
    .catch(err => {
        return res.status( 500 ).end()
    });
});


loginRouter
.route('/api/login/:id')
.get(( req, res) => {
    const { id } = req.params;
    const login = logins.find(c => c.id == id);
    if(!login) {
        return res
            .status(404)
            .send(`Login with id ${id} not found`)
    }
    res.json(login)
})
.delete((req, res) => {
    //const knex = req.app.get('db')
    const id = req.params.id;

    const index = logins.findIndex(c => c.id === id) ;
        if(index === -1 ) {
            return res
            .status(404)
            .send('Login not Found!');
        }
        logins.splice(index, 1);
        res.send('Deleted')
        
})

module.exports = loginRouter
