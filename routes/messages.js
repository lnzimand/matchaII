"use strict"
import express from "express"
const router = express.Router()

router.get('/', (request, response, next) => {
    response.render('messages', {page: 'Message',
    menuId: 'message'})
})

export { router }