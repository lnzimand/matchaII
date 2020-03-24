"use strict"
import express from "express"
const router = express.Router()

router.get('/', (request, response, next) => {
    response.render('layout', {page: 'Home',
    menuId: 'home'})
})

export { router }