const express = require('express')
const addtodoRouter = express.Router()
const jsonParser = express.json()
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: 'postgresql://dunder_mifflin@localhost/todo_app'
  })


addtodoRouter
    .route('/api/addtodo')
    .post( jsonParser, (req, res) => {
        const { id, title, summary, date} = req.body
    const addTodo = {id, title, summary, date}
        if(!title) {
            return res
                .status(400)
                .send('Title Required');
        }
        if(!summary) {
            return res
                .status(400)
                .send('Summary Required');
        }
        if(!date) {
            return res
                .status(400)
                .send('Date is Required')
        }
        else {
            res.status(201).json({
                ...req.body
            })
        }
        db 
        .insert( addTodo)
        .into( 'add_todo')
        .returning('*')
        .then ( result => {
            return res.status( 201).json( result);
        })
        .catch(err => {
            return res.status( 500 ).end()
        });
    })

    module.exports = addtodoRouter
