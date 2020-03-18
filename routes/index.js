"use strict"
import express from "express"
const router = express.Router()

router.get('/', (request, response, next) => {
    response.render('index', {page: 'Home',
    menuId: 'home'})
})

router.get('/about', (request, response, next) => {
    response.render('about', {page: 'About Us',
    menuId: 'about'})
})

router.get('/contact', (request, response, next) => {
    response.render('contact', {page: 'Contact Us',
    menuId: 'contact'})
})

export { router }