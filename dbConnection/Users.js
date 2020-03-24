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
            const queryString = 'SELECT * FROM \`Users\` WHERE \`email\`=?'
            return this.inquiry(queryString, email)
        }
    }
}

export { dbUserActions }