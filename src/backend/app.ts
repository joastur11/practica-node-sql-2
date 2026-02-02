import express from 'express'
import registerRoutes from './routes/register.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
  res.send('Api funcionando!!')
})

app.use('/register', registerRoutes)

const PORT = 1234

app.listen(PORT, () => {
  console.log(`App listening on port: http://localhost:${PORT}`)
})
