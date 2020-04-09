import express, { request, response } from "express"
const router = express.Router()
import { User } from '../dbConnection/Users'

router.get('/user', (request, response) => {
    var user = new User()

    user.findOne(request.query, 'Users').then(result => {
        if (result[0].vkey === request.query['vkey'] && result[0].verified === 0) {
            var obj = {verified: 1}
            user.updateInfo(obj, {condition: 'email', value: result[0].email}, 'Users').then(result => {
                response.render('login', {page: 'Login',
                menuId: 'login', errorMessage: ''})
            }).catch(error => {
                response.send(error)
            })
        } else {
            if (result[0].verified === 1) {
                response.send("Email is already verified")
            } else {
                response.render('404', {page: '404',
                menuId: '404'})
            }
        }
    }).catch(error => {
        response.json(error)
    })
})

export { router }