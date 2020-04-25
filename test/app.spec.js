
const app = require ('../src/app')


describe('App', () => {
    it('GET / responds with 200 containing "Hello, world!" ', () => {
        return supertest(app)
        .get('/')
        .expect(200, "Hello, world!")
    })
})

describe('findLogin', () => {
    it('GET/  responds with 400 if id is not available', () => {
        return supertest(app)
        .get('/api/logins/10')
        .expect(400);
    })
})



