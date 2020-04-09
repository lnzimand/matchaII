"use strict"
import express from "express"
const router = express.Router()
import bcrypt from "bcrypt"
import { User } from "../dbConnection/Users"
import { validateUser, x as empty } from "../helpers/validation"
import { sendMail } from "../helpers/mail"
import randomstring from "randomstring"

router.get('/', (request, response, next) => {
    response.render('registration', {page: 'Registration',
    menuId: 'registration', message: '', errorMessage: ''})
})

router.post('/', (request, response, next) => {
    var { firstname, lastname, username, mail, password, confirmPassword } = request.body.user
    var errorMessages = validateUser({firstname, lastname, username, mail, password, confirmPassword})

    var user = new User()
    var vkey = randomstring.generate()
    if (empty(errorMessages)) {
        user.findOne({email: mail}, 'Users').then(result => {
            if (result.length > 0) {
                response.render('registration', { page: 'Registration',
                menuId: 'registration', message: '', errorMessage: '*Email already exist*'})
            } else {
                user.findOne({username: username}, 'Users').then(result => {
                    if (result.length > 0) {
                        response.render('registration', { page: 'Registration',
                        menuId: 'registration', message: '', errorMessage: '*Username already exist*'})
                    } else {
                        bcrypt.hash(password, 10, (error, hash) => {
                            var userReg = { email: mail, username: username, firstname: firstname, lastname: lastname, password: hash, vkey: vkey, date_created: new Date() }
                            var options = {to: mail, subject: "Email verification", message: `<a href='localhost:8080/verify/user?vkey=${vkey}'>Click here</a> to verify your email`}

                            sendMail(options).then((result) => {
                                user.pushInfo(userReg, 'Users').then(result => {
                                    response.render('registration', { page: 'Registration',
                                    menuId: 'registration', message: '*User successfully registered, check your email for verification', errorMessage: ''})
                                }).catch(error => {
                                    response.render('registration', { page: 'Registration',
                                    menuId: 'registration', message: '', errorMessage: '*Something went wrong. Please try again*'})
                                })
                            }).catch(error => {
                                response.render('registration', { page: 'Registration',
                                menuId: 'registration', message: '', errorMessage: `*Something went wrong, unable to sent mail. Please try again later`})
                            })
                        })
                    }
                })
            }
        }).catch(error => {
            response.send(error)
        })
    } else {
        response.redirect('/registration')
    }
})

export { router }