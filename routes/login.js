"use strict"
import express from "express"
const router = express.Router()
import { dbUserActions as User } from "../dbConnection/users"
import { validateUsername, x as empty } from "../helpers/validation"

router.get('/', (request, response, next) => {
    response.render('login', {page: 'Login',
    menuId: 'login'})
})

router.post('/', (request, response, next) => {
    var { username, password } = request.body
    var user = new User()
    var message = validateUsername(username)
    var user = {
        loggedIn: true,
        username: username
    }
    request.session.user = user

    console.log(request.body)
    if (empty(message)) {
        user.find(`SELECT * FROM \`Users\` WHERE \`username\`=?`, username).then(result => {
            if (result.length > 0) {
                console.log(result)
                if (result[0].password === password) {
                    if (result[0].verified === 0) {
                        response.send("Please check your email and verify your account")
                    } else {
                        if (result[0].last_login === null) {
                            response.redirect('/enrich_profile')
                        }
                    }
                } else {
                    response.send("Incorrect password")
                }
            } else {
                response.send("Username doesn't exist")
            }
        })
    }
})

export { router }