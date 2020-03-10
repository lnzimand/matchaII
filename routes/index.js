"use strict"
import express from "express"
const router = express.Router()

router.get('/', (request, respond, next) => {
    respond.render('index', {page: 'Home',
    menuId: 'home'})
})

router.get('/login', (request, respond, next) => {
    respond.render('login', {page: 'Login',
    menuId: 'login'})
})

router.get('/registration', (request, respond, next) => {
    respond.render('registration', {page: 'Registration',
    menuId: 'register'})
})

router.get('/about', (request, respond, next) => {
    respond.render('about', {page: 'About Us',
    menuId: 'about'})
})

router.get('/contact', (request, respond, next) => {
    respond.render('contact', {page: 'Contact Us',
    menuId: 'contact'})
})

export { router }