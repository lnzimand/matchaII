"use strict"
import express, { request, response } from "express"
import { User } from "../dbConnection/Users"
import { validateNames, x as empty } from "../helpers/validation"
import { sendMail } from "../helpers/mail"
const router = express.Router()

router.get('/', (request, response, next) => {
    response.render('settings', {page: 'Settings',
    menuId: 'settings'})
})

router.post('/edit_names', (request, response) => {
    var user = new User()
    var mail = 'vedino8792@mailmyrss.com'
    var details = { firstname: request.body.user.firstname, lastname: request.body.user.lastname }
    user.updateInfo(details, {condition: 'email', value: mail}, 'Users').then(result =>{
        console.log(`Names successfully changed ${result}`)
        response.json(request.body)
    }).catch(error => {
        console.log(`Error: ${error}`)
        response.send('Couldn\'t update names')
    })
})

router.post('/edit_username', (request, response) => {
    var user = new User()
    var username = request.body.username

    user.findOne({username: username}, 'Users').then(result => {
        if (result.length > 0) {
            response.send('Username already exists')
        } else {
            var mail = 'vedino8792@mailmyrss.com'
            var newUsername = { username: request.body.username }
            user.updateInfo(newUsername, {condition: 'email', value: mail}, 'Users').then(result => {
                console.log(`Username updated`)
                response.json(request.body)
            }).catch(error => {
                console.log(`Error: ${error}`)
                response.send('Couldn\'t update username')
            })
        }
    }).catch(error => console.log(error))
})

router.post('/edit_gender', (request, response) => {
    var user = new User()
    if (request.body.gender) {
        var name = {name: request.body.gender}
        user.updateRefTable(name, 'Genders', 'gender_id')
        response.send('Gender updated')
    } else {
        response.send('Gender not selected')
    }
})

router.post('/edit_email', (request, response) => {
    var user = new User()
    user.findOne({email: request.body.mail}, 'Users').then(result => {
        if (result.length > 0) {
            response.send('Email already exists')
        } else {
            user.updateInfo({email: request.body.mail}, {condition: 'email', value: 'vedino8792@mailmyrss.com'}, 'Users').then(result => {
                response.send('Email updated')
            }).catch(error => {
                console.log(error)
                response.send('Something went wrong')
            })
        }
    })
})

router.post('/edit_password', (request, response) => {
    var user = new User()
    var { oldpassword, newpassword, cpassword } = request.body

    user.getPassword('janedoe@example.com').then(result => {
        if (result === oldpassword) {
            if (newpassword === cpassword) {
                user.updateInfo({password: newpassword}, {condition: 'email', value:'janedoe@example.com'}, 'Users')
                response.send('password updated')
            } else {
                console.log('Password don\'t match')
            }
        } else {
            response.json('Password is incorrect')
        }
    })
})

export { router }