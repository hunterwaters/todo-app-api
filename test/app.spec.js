const supertest = require ('supertest');
const app = require ('../src/app')
const knex = require('knex')
//const {makeLoginsArray} = require('./logins.fixtures')

const db = knex({
    client: 'pg',
    connection: 'postgresql://dunder_mifflin@localhost/todo_app'
  })

  app.set('db', db)
    


describe(' GET /api/login/:id', () => {
    it('id with 4', () => {
        return supertest(app)
        .get('/api/login/4')
        .query({ id : 4})
        .expect( 200)
    });
    it(`should return 404 if id not found`, () => {
        return supertest(app)
        .get('/api/login/12')
        .query({ id: 12})
        .expect(404, `Login does not exist`)
    });
});

describe(' GET /api/todolist/:id', () => {
    it('id with 123456', () => {
        return supertest(app)
        .get('/api/todolist/3')
        .query({ id : 3})
        .expect( 200)
    });
    it(`should return 404 if id not found`, () => {
        return supertest(app)
        .get('/api/login/123')
        .query({ id: 123})
        .expect(404, `Login with id 123 not found`)
    });
});

describe('DELETE /api/login/:id', () => {
    it('return login not found', () => {
        return supertest(app)
        .delete('/api/login/4')
        .query({ id: 4})
        .expect(200)
    });
});

describe('DELETE /api/todolist/:id', () => {
    it('should delete with given id found', () => {
        return supertest(app)
        .delete('/api/todolist/3')
        .query({ id: 3})
        .expect(200)
    });
});

describe(`POST /api/login`, () => {
    it(`creates a login, responding with  201 and the new login in json format`, function () {
        const newLogin = {
            id: "12345",
            email: "testusername",
            password: "testpassword"
        }
        return supertest(app)
        .post('/api/login')
        .send(newLogin)
        .expect(201)
        .expect( res => {
            expect(res.body.email).to.eql(newLogin.email)
            expect(res.body.password).to.eql(newLogin.password)
            expect(res.body.id).to.eql(newLogin.id)
            })
        })
    })

describe(`POST /api/addtodo`, () => {
    it(`creates a new todo, responding with 201 and the new todo in json format`, function () {
            const newTodo = {
                title: "Test Title",
                summary: "Test Summary",
                date: "03/02/2012"
            }
            return supertest(app)
            .post('/api/addtodo')
            .send(newTodo)
            .expect(201)
            .expect( res => {
                expect(res.body.title).to.eql(newTodo.title)
                expect(res.body.summary).to.eql(newTodo.summary)
                expect(res.body.date).to.eql(newTodo.date)
                })
            })
        })












