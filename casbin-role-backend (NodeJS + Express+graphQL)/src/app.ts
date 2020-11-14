import express from 'express'
import cors from 'cors'
import router from './router/router'

const app = express()
app.use(cors())

app.use(router)

app.listen(process.env.PORT || '5000', () => {
    console.log(`Server is running on ${process.env.PORT || '5000'}`)
})