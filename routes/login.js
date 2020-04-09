"use strict"
import express from "express"
const router = express.Router()
import bcrypt from "bcrypt"
import { User } from "../dbConnection/Users"
import { validateUsername, x as empty } from "../helpers/validation"

router.get('/', (request, response, next) => {
    response.render('login', {page: 'Login',
    menuId: 'login', errorMessage: ''})
})

router.post('/', (request, response, next) => {
    var { username, password } = request.body
    var user = new User()
    var message = validateUsername(username)
    // var userSess = {
    //     loggedIn: true,
    //     username: username
    // }
    // request.session.user = user
    
    if (empty(message)) {
        user.findOne({username: username}, 'Users').then(result => {
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, result) => {
                    if (result) {
                        user.isVerified({username: username}).then(result => {
                            console.log(result)
                            user.firstTimeLogin({username: username}).then(result => {
                                user.updateInfo({last_login: new Date()}, {condition: 'username', value: username}, 'Users')
                                response.render('completeProfile', {page: 'Complete Profile',
                                menuId: 'complete profile'})
                            }).catch(notFirstLogger => {
                                user.updateInfo({last_login: new Date()}, {condition: 'username', value: username}, 'Users')
                                response.render('layout',{ page: 'Home',
                                menuId: 'home'})
                            })
                        }).catch(notVerified => {
                            response.render('login', { page: 'Login',
                            menuId: 'login', errorMessage: "Please check your email and verify your account"})
                        })
                    } else {
                        response.render('login', { page: 'Login',
                        menuId: 'login', errorMessage: "Incorrect password"})
                    }
                })
            } else {
                response.render('login', { page: 'Login',
                menuId: 'login', errorMessage: '*Username doesn\`t exist*'})
            }
        }).catch(error => console.log(error))
    }
})

export { router }