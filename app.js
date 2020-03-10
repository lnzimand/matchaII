import express from "express"
import path from "path"
import morgan from "morgan"
import { json } from "body-parser"
import cors from "cors"
import "dotenv/config"
var favicon = require("serve-favicon")

import { router as indexRouter } from './routes/'

const app = express()
app.use(favicon(path.join(__dirname, 'views', 'partials', 'image', 'favicon.ico')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('combined'))
app.use(json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})