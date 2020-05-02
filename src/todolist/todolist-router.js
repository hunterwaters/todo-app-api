const express = require('express')
const todolistRouter = express.Router()
const bodyParser = express.json()
const TodoListService = require('./todolist-service');
const knex = require('knex')
const xss = require('xss')

const db = knex({
    client: 'pg',
    connection: 'postgresql://dunder_mifflin@localhost/todo_app'
  })

  const serializeTodolist = todolist => ({
      id: todolist.id,
      title: xss(todolist.title),
      summary: xss(todolist.summary),
      date: todolist.date

  })


    todolistRouter
        .route('/api/todolist/:id' )
        .all(( req, res, next) => {
            TodoListService.getById(
                req.app.get('db'),
                req.params.id
            )
            .then(todolist => {
                if(!todolist){
                    return res.status(404).json({
                        error: {message: `Todo does not exist`}
                    })
                }
                res.todolist= todolist
                next()
            })
            .catch(next)
           })
           
           
           .get((req, res, next) => {
               res.json(serializeTodolist(res.todolist))
           })
        
        
        .delete(( req, res, next) => {
            TodoListService.deletetodo(
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

    module.exports = todolistRouter

