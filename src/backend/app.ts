import express from 'express'
import registerRoutes from './routes/register.js'
import loginRoutes from './routes/login.js'
import refreshRoutes from './routes/refresh.js'
import logoutRoutes from './routes/logout.js'
import profileRoutes from './routes/profile.js'
import { corsMiddleware } from './middlewares/corsMiddleware.js'

const app = express()

app.use(express.json())

app.use(corsMiddleware())

app.use(express.static('src/public'))

app.disable('x-powered-by')

app.use('/register', registerRoutes)

app.use('/login', loginRoutes)

app.use('/refresh', refreshRoutes)

app.use('/logout', logoutRoutes)

app.use('/profile', profileRoutes)

const PORT = 1234

app.listen(PORT, () => {
  console.log(`App listening on port: http://localhost:${PORT}`)
})
