
const LoginService = {
    getAllLogins(knex) {
        return knex.select('*').from('login')
    },
    deleteLogin(knex, id){
        return knex('login')
        .where({ id })
        .delete()
    },
    getById(knex, id) {
        return knex('login')
        .select('*')
        .where({ id })
        .first()
    },
}

module.exports = LoginService


