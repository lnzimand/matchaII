"use strict"
import express from "express"
const router = express.Router()

router.get('/', (request, response, next) => {
    request.session.destroy(function(error) {
        if (error) {
            console.log("Something went wrong when trying to logout")
        } else {
            console.log("Session destroyed")
        }
      })
    response.redirect("/")
})

export { router }