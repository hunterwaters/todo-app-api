const express = require('express');
const router = express.Router();
const Login = require('../models/Login')
const mongoose = require('mongoose');

const logins = [
    { id : 1, email: '123@gmail.com', password: 'pass123' },
    { id : 2, email: '456@gmail.com', password: 'pass456' },
    { id : 3, email: '789@gmail.com', password: 'pass789' }
 ]

router.get('/', (req, res) => {
    res.send("We are on login!!")
})

router.post('/', (req,res) => {
    const login = new Login({
        email: req.body.email,
        password: req.body.password
    });

    login.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })
});


router.post('/' , (req, res) => {
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

 router.get('/:id', (req, res) => {
    const login = logins.find(c => c.id === parseInt(req.params.id))
    if(!login)res.status(404).send('The Login with given id was not found')
    res.send(login);
 });


module.exports = router;