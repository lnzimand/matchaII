import { pool } from "./poolConnection"
import query from "./query"

class dbUserActions {
    constructor() {
        this.connection = pool
        this.query = query
    }

    find(queryString, params) {
        return new Promise ((resolve, reject) =>
        this.connection.getConnection((objError, objConnection) => {
            if (objError) {
                reject(objError)
            } else {
                query(objConnection, queryString, params).then(result =>                
                    resolve(result)
                ).catch(error =>
                    reject(error)
                )
            }
        }))
    }

    insert(queryString, params) {
        return new Promise ((resolve, reject) => {
            this.connection.getConnection((objError, objConnection) => {
                if (objError) {
                    reject(objError)
                } else {
                    query(objConnection, queryString, params).then(result =>
                        resolve(result)
                    ).catch(error =>
                        reject(error)
                    )
                }
            })
        })
    }
}

export { dbUserActions }