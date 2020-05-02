const TodoListService = {
    getAllLogins(knex) {
        return knex.select('*').from('todo_chart')
    },
    deletetodo(knex, id){
        return knex('todo_chart')
        .where({ id })
        .delete()
    },
    getById(knex, id) {
        return knex
        .from('todo_chart')
        .select('*')
        .where('id', id)
        .first()
    },
}

module.exports = TodoListService