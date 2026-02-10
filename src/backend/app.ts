import express from 'express'
import registerRoutes from './routes/register.js'
import loginRoutes from './routes/login.js'
import refreshRoutes from './routes/refresh.js'
import 'dotenv/config'

const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
  res.send('Api funcionando!!')
})

app.use('/register', registerRoutes)

app.use('/login', loginRoutes)

app.use('/refresh', refreshRoutes)

const PORT = 1234

app.listen(PORT, () => {
  console.log(`App listening on port: http://localhost:${PORT}`)
})
