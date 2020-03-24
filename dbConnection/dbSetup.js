import connection from "./connection"
import query from "./query"

const params = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

async function dbSetup() {
    const conn = await connection(params).catch(e => { throw e})
    query(conn, `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`).then(result => {
        console.log(`Database ${process.env.DB_NAME} created!`)
        query(conn, `USE ${process.env.DB_NAME}`).then(result => {
            console.log(`Database ${process.env.DB_NAME} selected!`)
            query(conn, `CREATE TABLE IF NOT EXISTS Cities (
                \`city_id\` INT(20) NOT NULL AUTO_INCREMENT,
                \`name\` VARCHAR(100) NOT NULL,
                \`state_id\` INT(20) NOT NULL,
                PRIMARY KEY (\`city_id\`),
                UNIQUE KEY (\`name\`,\`state_id\`)
            )`).then(result => {
                console.log("Table 'Cities' created")
                query(conn, `CREATE TABLE IF NOT EXISTS Genders (
                    \`gender_id\` INT(20) NOT NULL AUTO_INCREMENT,
                    \`name\` VARCHAR(100) NOT NULL,
                    PRIMARY KEY (\`gender_id\`),
                    UNIQUE KEY (\`name\`)
                )`).then(result => {
                    console.log("Table 'Genders' created")
                    query(conn, `CREATE TABLE IF NOT EXISTS Users(
                        \`email\` VARCHAR(255) NOT NULL,
                        \`username\` VARCHAR(50) NOT NULL,
                        \`password\` VARCHAR(255) NOT NULL,
                        \`firstname\` VARCHAR(255) NOT NULL,
                        \`lastname\` VARCHAR(255) NOT NULL,
                        \`gender_id\` INT(20),
                        \`city_id\` INT(20),
                        \`profile_picture_url\` VARCHAR(255),
                        \`birth_date\` DATE,
                        \`date_created\` DATE NOT NULL,
                        \`date_updated\` DATE,
                        \`active\` TINYINT(1) NOT NULL DEFAULT 0,
                        \`vkey\` VARCHAR(255) NOT NULL,
                        \`verified\` TINYINT(1) NOT NULL DEFAULT 0,
                        \`email_notification\` TINYINT(1) NOT NULL DEFAULT 1,
                        \`last_login\` DATE DEFAULT NULL,
                        PRIMARY KEY (\`email\`),
                        UNIQUE(\`username\`),
                        FOREIGN KEY (\`gender_id\`) REFERENCES Genders(\`gender_id\`),
                        FOREIGN KEY (\`city_id\`) REFERENCES Cities(\`city_id\`)
                    )`).then(result => {
                        console.log("Table 'Users' created!")
                        conn.end()
                    })
                })
            })
        })
    }).catch(e => { throw e });
}

export { dbSetup }