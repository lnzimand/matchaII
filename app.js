import express from "express"
import path from "path"
import morgan from "morgan"
import { json } from "body-parser"
import cors from "cors"
import "dotenv/config"
import { dbSetup } from "./dbConnection/dbSetup"
var favicon = require("serve-favicon")

import { router as indexRouter } from './routes/'
import { router as loginRouter } from './routes/login'
import { router as registrationRouter } from './routes/registration'
import { router as resetPwdRouter } from './routes/resetPassword'
import { request } from "http"

const app = express()
app.use(favicon(path.join(__dirname, 'public', 'image', 'favicon.ico')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
dbSetup()

app.use(morgan('combined'))
app.use(json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/registration', registrationRouter)
app.use('/reset_password', resetPwdRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})