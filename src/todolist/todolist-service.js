const TodoListService = {
    getAllLogins(knex) {
        return knex.select('*').from('todo_chart')
    },
    deletetodo(knex, id){
        return knex('todo_chart')
        .where({ id })
        .delete()
    },

}

module.exports = TodoListService