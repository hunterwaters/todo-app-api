const express = require('express');
const loginRouter = express.Router();
const bodyParser = express.json();
const knex = require('knex')
const LoginService = require('./login-service');
const xss = require('xss')


const serializeLogin = login => ({
    email: xss(login.email),
    password: xss(login.password)
})

const path = require('path')

const db = knex({
    client: 'pg',
    connection: 'postgresql://dunder_mifflin@localhost/todo_app'
  })

loginRouter
.route('/api/login')
.post(bodyParser, (req, res) => {
    const {email, password} = req.body
    let newLogin = {
        email,
        password
    }
    db
    .select('*')
    .from('login')
    .where({email:email})
    .then(result => {
        if( result.length === 0) {
            db
            .insert(newLogin)
            .into('login')
            .returning('*')
            .then(result => {
                return res.status(201).json(result);
            })
            .catch(err => {
                return res.status( 500 ).end();
            });
        }
        else {
            db
            .returning('*')
            .from('todo_chart')
            .where({login:email})
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status( 500 ).end();
            })
        }
    });
});


loginRouter
.route('/api/login')
.post(bodyParser, (req, res, next) => {
const { email, password} = req.body
    const newLogin = {email, password}
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
    if(email.length < 6 || email.length > 40) {
        return res
            .status(400)
            .send('Email must be between 6 and 20 characters long')
    }
    if(password.length < 5 || password.length > 30) {
        return res
            .status(400)
            .send('Password must be between 8 and 25 characters long')
    }
    db 
    .insert( newLogin)
    .into( 'login')
    .returning('*')
    .then ( result => {
        return res.status( 201).json( result);
    })
    .catch(next)
});

loginRouter
.route('/api/login')
.post(bodyParser, (req, res) => {
    const {email, password} = req.body
    const newLogin = {email, password}

    db
    .select('*')
    .from('todo_chart')
    .where({login:email})
    .then(result => {
        return res.status(201).json(result);
    })
    .catch(err => {
        return res.status( 500 ).end();
    })
});



loginRouter
.route('/api/login/')
.all(( req, res, next) => {
    LoginService.getById(
        req.app.get('db'),
        req.params.id
    )
    .then(login => {
        if(!login) {
            return res.status(404).json({
                error: {message: `Login does not exist`}
            })
        }
        res.login = login
        next()
    })
    .catch(next)
})
.get((req, res, next) => {
    res.json(serializeLogin(res.login))

})

    .delete((req, res, next) => {
    LoginService.deleteLogin(
        req.app.get('db'),
        req.params.id
    )
    .then(numRowsAffected => {
        res
        .send('Deleted')
        .status(204).end()

    })
    .catch(next)
})

module.exports = loginRouter
