const express = require('express');
const loginRouter = express.Router();
const bodyParser = express.json();


const logins = [
    {
        "id": "123456",
        "username": "hello@gmail.com" ,
    "password": "password1"
},
{
    "id": "45364576",
    "username": "bye@gmail.com" ,
"password": "password2"
},
{
    "id": "helloworld",
    "username": "wow@gmail.com" ,
"password": "password3"
},
]

loginRouter
.route('/api/login')
.post(bodyParser, (req, res) => {
    const { username, password} = req.body
    if(!username) {
        return res
            .status(400)
            .send('Username Required');
    }
    if(!password) {
        return res
            .status(400)
            .send('Password Required');
    }
    if(username.length < 6 || username.length > 20) {
        return res
            .status(400)
            .send('Username must be between 6 and 20 characters long')
    }
    if(password.length < 8 || password.length > 25) {
        return res
            .status(400)
            .send('Password must be between 8 and 25 characters long')
    }
    else {
        res.status(201).json({
            message: "Login was created!"
        })
    }
})

loginRouter
.route('/api/login/:id')
.get(( req, res) => {
    const { id } = req.params;
    const login = logins.find( li => li.id == id);

    if(!login) {
        return res
            .status(404)
            .send(`Login with id ${id} not found`)
    }
    res.json(login)
})
.delete((req, res) => {
    const {id} = req.params;

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