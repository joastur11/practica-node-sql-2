import request from 'supertest'
import app from '../app.js'

describe('Auth endpoints', () => {

  it('should return 404 on unknown route', async () => {
    const response = await request(app).get('/unknown-route')
    expect(response.status).toBe(404)
  })

})
