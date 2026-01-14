import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
  res.send('Api funcionando!!')
})

const PORT = 1234

app.listen(PORT, () => {
  console.log(`App listening on port: http://localhost:${PORT}`)
})
