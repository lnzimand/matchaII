"use strict"
import express, { request, response } from "express"
const router = express.Router()
import { User } from "../dbConnection/Users"
import { validateUser, x as empty } from "../helpers/validation"

router.get('/', (request, response, next) => {
    response.render('completeProfile', {page: 'Profile',
    menuId: 'profile'})
})

router.post('/', (request, response, next) => {
    var user = new User()
    var mail = 'vedino8792@mailmyrss.com'
    var fields = {user_id: mail}
    Object.assign(fields, request.body.interests);

    if (request.body.gender) {
        var name = {name: request.body.gender}
        user.updateRefTable(name, 'Genders', 'gender_id')
        console.log('Gender updated')
    }
    if (request.body.sexualPreference) {
        user.updateRefTable(request.body.sexualPreference, 'SexualPreference', 'sexual_preference_id')
        console.log('Sexual preference updated')
    }

    user.findOne({user_id: mail}, 'Interests').then(result => {
        if (result.length === 0) {
            user.pushInfo(fields, 'Interests').then(result => {
                response.render('layout', {page: 'Home',
                menuId: 'home'})
            }).catch(error => {
                response.json(error)
            })
        } else {
            user.updateInfo(fields, {condition: 'user_id', value: mail}, 'Interests').then(result => {
                console.log('Interests updated')
                response.render('layout', { page: 'Home',
                menuId: 'home'})
            }).catch(error => {
                response.send('Something went wrong while trying to update interests. Error: ' + error)
            })
        }
    }).catch(error => {
        console.log(error)
    })
})

export { router }