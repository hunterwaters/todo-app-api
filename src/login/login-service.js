
const LoginService = {
    deleteLogin(knex,id) {
        return knex
        .from('login')
        .where({id})
        .delete()
    }
}

module.exports = LoginService


