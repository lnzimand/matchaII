"use strict"
import express from "express"
const router = express.Router()

router.get('/', (request, response, next) => {
    response.render('resetPassword', {page: 'Reset Password',
    menuId: 'reset password'})
})

router.post('/', (request, response, next) => {
    response.send(request.body)
})

export { router }