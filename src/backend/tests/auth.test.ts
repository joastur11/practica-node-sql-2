jest.mock('../services/auth.services.js', () => ({
  loginService: jest.fn(),
  registerService: jest.fn(),
  insertRefreshService: jest.fn().mockResolvedValue(undefined),
}))

import request from 'supertest'
import app from '../app.js'
import { loginService, registerService } from '../services/auth.services.js'

describe('Auth endpoints', () => {

  // test de que devuelve 404 si alguien pone una ruta inexistente
  it('should return 404 on unknown route', async () => {
    const response = await request(app).get('/unknown-route')
    expect(response.status).toBe(404)
  })

  // test login
  describe('POST /login', () => {
    // credenciales validas
    it('should return 200 and jwt tokens when credentials are valid', async () => {
      (loginService as jest.Mock).mockResolvedValue(123)

      const response = await request(app)
      .post('/login')
      .send({
        email: 'test@mail.com',
        password: '123456'
      })

      expect(response.status).toBe(200)
      expect(response.body.accessToken).toBeDefined()
      expect(response.body.refreshToken).toBeDefined()
    })
    
    // credenciales invalidas
    it('should return 401 if credentials are invalid', async () =>{
      (loginService as jest.Mock).mockRejectedValue(new Error('Invalid credentials'))
  
      const response = await request(app)
      .post('/login')
      .send({
        email: 'wrong@asd.com',
        password: 'wrongweong'
      })
  
      expect(response.status).toBe(401)
      expect(response.body.error).toBeDefined()
    })
  })
  
  // test register
  describe('POST /register', () => {
    // registro exitoso
    it('should return 201 and new user id if register was succesfull', async () =>{
      (registerService as jest.Mock).mockResolvedValue(123)

      const response = await request(app)
      .post('/register')
      .send({
        email: 'asd@asd.com',
        password: 'asd',
        name: 'asd',
        lastname: 'asd'
      })

      expect(response.status).toBe(201)
      expect(response.body.newUserId).toBeDefined()
    })

    // error, email ya registrado
    it('should return 409 if the email is already in use', async () => {
      (registerService as jest.Mock).mockRejectedValue(new Error('email already in use'))

      const response = await request(app)
      .post('/register')
      .send({
        email: 'usedemail@asd.com',
        password: 'asd',
        name: 'asd',
        lastname: 'asd'
      })

      expect(response.status).toBe(409)
    })

    // error, registro invalido
    it ('should return 400 if the credentials are invalid', async () => {
      (registerService as jest.Mock).mockRejectedValue(new Error('Error en el registro'))

      const response = await request(app)
      .post('/register')
      .send({
        email: 'usedemail@asd.com',
        password: 'asd',
        name: 'asd',
        lastname: 'asd'
      })

      expect(response.status).toBe(400)
    })
  })

  // test refresh
  

})
