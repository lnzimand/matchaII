"use strict"
import express from "express"
const router = express.Router()
import { sendMail } from "../helpers/mail"

router.get('/', (request, response, next) => {
    response.render('resetPassword', {page: 'Reset Password',
    menuId: 'reset password'})
})

router.post('/', (request, response, next) => {
    const { mail } = request.body
    const options = {to: mail, subject: "Reset password", message: `<a href="localhost:8080/new_password">Click here</a> to reset password`}
    sendMail(options).then((result) => {
        response.send(`Email successfully sent to ${result}`)
    }).catch(error => {
        response.send("Something went wrong, unable to sent mail")
    })
})

export { router }