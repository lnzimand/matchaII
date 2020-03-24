"use strict"
import express from "express"
const router = express.Router()

router.get('/', (request, response, next) => {
    response.render('404', {page: '404',
    menuId: '404'})
})

export { router }