import { pool } from "./poolConnection"
import query from "./query"

class dbUserActions {
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

    User = {
        findEmail: (email) => {
            const queryString = 'SELECT * FROM `Users` WHERE `email`=?'
            return this.inquiry(queryString, email)
        },
        findUsername: (username) => {
            const queryString = 'SELECT * FROM `Users` WHERE `username`=?'
            return this.inquiry(queryString, username)
        },
        pushUser: (params) => {
            const queryString = 'INSERT INTO `Users` SET ?'
            return this.inquiry(queryString, params)
        }
    }
}

var userReg = { email: 'mail', username: 'username', firstname: 'firstname', lastname: 'lastname', password: 'password', vkey: 'vkey', date_created: new Date() }
const variable = new dbUserActions()
variable.User.pushUser(userReg).then(result => console.log(result)).catch(error => console.log(error))
// dbUserActions.User.findEmail("lebus23@gmail.com").then(result => console.log(result))