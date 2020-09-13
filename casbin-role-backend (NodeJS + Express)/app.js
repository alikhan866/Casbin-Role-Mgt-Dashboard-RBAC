const express = require('express')
const apiRouter = require('./routes/routes')
const app = express()
var cors = require('cors')

app.use(cors())

app.use(express.json())

app.use(apiRouter)

app.listen(process.env.PORT || '2000', () => {
    console.log(`Server is running on ${process.env.PORT || '2000'}`)
})