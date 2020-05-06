
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
        .where('id', id)
        .first()
    },
    hasUserWithEmail(knex, email) {
        return knex('login')
        .select('*')
        .where('email', email)
        .first()
    },
}

module.exports = LoginService


