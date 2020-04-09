"use strict"
import express, { request, response } from "express"
import { User } from "../dbConnection/Users"
import { validateUsername, x as empty } from "../helpers/validation"
const router = express.Router()

router.get('/', (request, response, next) => {
    response.render('layout', {page: 'Home',
    menuId: 'home'})
})

router.post('/bio', (request, response) => {
    var user = new User()
    user.updateInfo(request.body, {condition: 'email', value: 'janedoe@example.com'}, 'Users')
    response.json(request.body)
})

router.post('/interests', (request, response) => {
    var user = new User()
    var fields = request.body
    var mail = 'vedino8792@mailmyrss.com'
    Object.assign(fields, {user_id: mail});

    user.findOne({user_id: mail}, 'Interests').then(result => {
        if (result.length === 0) {
            user.pushInfo(fields, 'Interests').then(result => {
                response.json(result);
            }).catch(error => {
                response.json(error)
            })
        } else {
            user.updateInfo(fields, {condition: 'user_id', value: mail}, 'Interests').then(result => {
                response.send('Interests updated')
            }).catch(error => {
                response.send('Something went wrong while trying to update interests. Error: ' + error)
            })
        }
    }).catch(error => {
        console.log(error)
    })
})

router.post('/sexual_preference', (request, response) => {
    var user = new User()

    console.log(request.body)
    user.updateRefTable(request.body, 'SexualPreference', 'sexual_preference_id')
    response.send('Sexual preference updated')
})

export { router }