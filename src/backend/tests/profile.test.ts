jest.mock('../services/profile.services', () =>({
  profileService: jest.fn()
}))
jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  default: {
    verify: jest.fn(),
    sign: jest.fn()
  }
}))

import request from 'supertest'
import app from '../app.js'
import { profileService } from '../services/profile.services.js'
import jwt from 'jsonwebtoken'


afterEach(() => {
  jest.clearAllMocks()
})

describe('Profile endpoints0', () => {
  describe('GET /profile', () => {
    // perfil valido
    it('should return 200 and user profile if token is valid', async () => {
      const mockUser = {
        email: 'test@test.com',
        name: 'Juan',
        lastname: 'Perez',
        created_at: '2024-01-01'
      }

      ;(jwt.verify as jest.Mock).mockReturnValue({ userId: 123 })
      ;(profileService as jest.Mock).mockResolvedValue({ mockUser})

      const response = await request(app)
      .get('/profile')
      .set('Authorization', 'Bearer validtoken')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ mockUser })
    })

    // token invalido
    it('should return 401 if the refresh token is invalid', async () => {
      ;(jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('invalid token')
      })
      
      const response = await request(app)
      .get('/profile')
      .set('Authorization', 'Bearer validtoken')

      expect(response.status).toBe(401)
    })

    // no token in header
    it('should return 401 if no token is provided', async () => {
      const response = await request(app)
      .get('/profile')

      expect(response.status).toBe(401)
    })

    // usuario no existe
    it('should return 404 if user doesnt exists', async () =>{
      ;(jwt.verify as jest.Mock).mockReturnValue({ userId: 123 })
      ;(profileService as jest.Mock).mockRejectedValue(new Error('User not found'))

      const response = await request(app)
      .get('/profile')
      .set('Authorization', 'Bearer validtoken')

      expect(response.status).toBe(404)
    })


  })
})
