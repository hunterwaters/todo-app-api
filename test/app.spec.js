const supertest = require ('supertest');
const app = require ('../src/app')


describe(' GET /api/login/:id', () => {
    it('id with 123456', () => {
        return supertest(app)
        .get('/api/login/123456')
        .query({ id : 123456})
        .expect( 200)
    });
    it(`should return 404 if id not found`, () => {
        return supertest(app)
        .get('/api/login/123')
        .query({ id: 123})
        .expect(404, `Login with id 123 not found`)
    });
});

describe(' GET /api/todolist/:id', () => {
    it('id with 123456', () => {
        return supertest(app)
        .get('/api/todolist/123456')
        .query({ id : 123456})
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
        .delete('/api/login/1234')
        .query({ id: 1234})
        .expect(404, 'Login not Found!')
    });
});

describe('DELETE /api/todolist/:id', () => {
    it('should delete with given id found', () => {
        return supertest(app)
        .delete('/api/todolist/1234')
        .query({ id: 1234})
        .expect(404, 'TodoList not Found!')
    });
});












