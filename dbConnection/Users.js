import { pool } from "./poolConnection"
import query from "./query"
import { response } from "express"

class User {
    constructor() {
        this.connection = pool
        this.query = query
    }

    inquiry(queryString, params) {
        return new Promise ((resolve, reject) =>
        this.connection.getConnection((objError, objConnection) => {
            if (objError) {
                reject(objError)
            } else {
                query(objConnection, queryString, params).then(result => {
                    objConnection.release()
                    resolve(result)
                }).catch(error => {
                    objConnection.release()
                    reject(error)
                })
            }
        }))
    }

    findOne(object, table) {
        const queryString = `SELECT * FROM ${table} Where ?`
        return this.inquiry(queryString, object)
    }

    getPassword(id) {
        return new Promise((resolve, reject) => {
            const queryString = 'SELECT password FROM Users WHERE email = ?'
            this.inquiry(queryString, id).then(result => {
                resolve(result[0].password)
            }).catch(error => {
                reject(error)
            })
        })
    }

    pushInfo(params, table) {
        const queryString = `INSERT INTO ${table} SET ?`
        return this.inquiry(queryString, params)
    }

    updateInfo(params, object, table) {
        const queryString = `UPDATE ${table} SET ? WHERE ${object.condition} = '${object.value}'`
        return this.inquiry(queryString, params)
    }

    updateRefTable(params, table, userfield) {
        this.findOne(params, table).then(result => {
            if (result.length == 0) {
                this.pushInfo(params, table).then(result => {
                    this.findOne(params, table).then(result => {
                        const queryString = 'UPDATE Users SET ?'
                        userfield = JSON.parse(`{"${userfield}": "${result[0].id}"}`)
                        this.inquiry(queryString, userfield)
                    })
                })
            } else {
                userfield = JSON.parse(`{"${userfield}": "${result[0].id}"}`)
                const queryString = 'UPDATE Users SET ?'
                this.inquiry(queryString, userfield)
            }
        }).catch(error => {
            console.log('Error ' + error)
        })
    }

    async isVerified(username) {
        try {
            return new Promise((resolve, reject) => {
                this.findOne(username, 'Users').then(result => {
                    if (result[0].verified) {
                        resolve(true)
                    }
                    else {
                        reject(false)
                    }
                })
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    async firstTimeLogin(username) {
        try {
            return new Promise((resolve, reject) => {
                this.findOne(username, 'Users').then(result => {
                    if (result[0].last_login === null) {
                        resolve(true)
                    }
                    else {
                        reject(false)
                    }
                })
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export { User }