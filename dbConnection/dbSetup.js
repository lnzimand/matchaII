import connection from "./connection"
import query from "./query"

const params = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

async function dbSetup() {
    console.log(params)
    const conn = await connection(params).catch(e => { throw e}) 
    query(conn, `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`).then(result => {
        console.log(`Database ${process.env.DB_NAME} created!`)
        query(conn, `USE ${process.env.DB_NAME}`).then(result => {
            console.log(`Database ${process.env.DB_NAME} selected!`)
            query(conn, `CREATE TABLE IF NOT EXISTS \`users\` (
                \`email\` VARCHAR(100) NOT NULL PRIMARY KEY,
                \`username\` VARCHAR(50) NOT NULL,
                \`firstname\` VARCHAR(255) NOT NULL,
                \`lastname\` VARCHAR(255) NOT NULL,
                \`password\` VARCHAR(255) NOT NULL,
                \`vkey\` VARCHAR(50) NOT NULL,
                \`verified\` TINYINT(1) NOT NULL DEFAULT 0,
                \`email_notification\` TINYINT(1) NOT NULL DEFAULT 1,
                UNIQUE(\`email\`, \`username\`)
            )`).then(result => console.log("Table 'users' created!"))
        })
    }).catch(e => { throw e });
}

export { dbSetup }