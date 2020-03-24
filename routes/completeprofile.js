"use strict"
import express, { request, response } from "express"
const router = express.Router()
import { dbUserActions as User } from "../dbConnection/users"
import { validateUser, x as empty } from "../helpers/validation"

router.get('/', (request, response, next) => {
    response.render('completeProfile', {page: 'Profile',
    menuId: 'profile'})
})

export { router }