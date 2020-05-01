const express = require('express')
const todolistRouter = express.Router()
const bodyParser = express.json()


todolistRouter
    .route('/api/todolist')
    .get((req, res) => {
        res.status(200).json({
            message: 'Handling GET requests to /todolist'
        });
    })

    todolistRouter
        .route('./api/todolist/:id' )
        .get(( req, res) => {
            const { id } = req.params;
    const todolist = todolists.find(c => c.id == id);

    if(!todolist) {
        return res
        .status(400)
        .send(`List with id ${id} not found`);
    }
    res.json(todolist);
        })
        .delete(( req, res) => {
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

    module.exports = todolistRouter

