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

    console.log(message)
    if (empty(message)) {
        user.find(`SELECT * FROM \`users\` WHERE \`username\`=?`, username).then(result => {
            if (result.length > 0) {
                response.json(result)
            } else {
                response.send("Username doesn't exist")
            }
        })
    }
})

export { router }