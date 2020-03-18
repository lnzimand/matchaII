"use strict"
import express from "express"
const router = express.Router()
import { dbUserActions as User } from "../dbConnection/users"
import { validateUser, x as empty } from "../helpers/validation"
import { sendMail } from "../helpers/mail"
import randomstring from "randomstring"

router.get('/', (request, response, next) => {
    response.render('registration', {page: 'Registration',
    menuId: 'registration'})
})

router.post('/', (request, response, next) => {
    var { firstname, lastname, username, mail, password, confirmPassword } = request.body.user
    var message = validateUser({firstname, lastname, username, mail, password, confirmPassword})

    var user = new User()
    var vkey = randomstring.generate()
    if (empty(message)) {
        user.find('SELECT * FROM \`users\` WHERE \`email\`=?', mail).then(result => {
            if (result.length > 0) {
                response.send("Email already exist")
            } else {
                user.find('SELECT * FROM \`users\` WHERE \`username\`=?', username).then(result => {
                    if (result.length > 0) {
                        response.send("Username already exist, please choose a different username")
                    } else {
                        var userReg = { email: mail, username: username, firstname: firstname, lastname: lastname, password: password, vkey: vkey }
                        var options = {to: mail, subject: "Email verification", message: `<a href='localhost:8080/verify/:${vkey}'>Click here</a> to verify your email`}

                        sendMail(options).then((result) => {
                            user.insert('INSERT INTO `users` SET ?', userReg).then(result => {
                                response.send("User successfully registered")
                            }).catch(error => {
                                throw error
                            })
                        }).catch(error => {
                            response.send("Something went wrong, unable to sent mail")
                        })
                    }
                })
            }
        }).catch(error => {
            console.log(error)
            response.redirect('registration')
        })
    } else {
        response.redirect('registration')
    }
})

export { router }