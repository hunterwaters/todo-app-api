const express = require('express')
const todolistRouter = express.Router()
const bodyParser = express.json()

const todolists = [
    {
        "id": "123456",
        "title": "this is title 1",
        "summary": "This is summary 1",
        "date": "01/02/2013"
},
{
    "id": "45364576",
    "title": "this is title 2",
    "summary": "This is summary 2",
     "date": "01/02/2011"
},
{
    "id": "helloworld",
    "title": "this is title 3",
    "summary": "This is summary 3",
    "date": "01/02/2016"
}
]


    todolistRouter
        .route('/api/todolist/:id' )
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

        const index = todolists.findIndex(c => c.id === id) ;

        if(index === -1 ) {
            return res
            .status(404)
            .send('TodoList not Found!');
        }
        todolists.splice(index, 1);
        res.send('Deleted')
        })

    module.exports = todolistRouter

