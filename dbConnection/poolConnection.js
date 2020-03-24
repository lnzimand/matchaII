import { createPool } from 'mysql'
const pool = createPool({
    connectionLimit : 100,
    host     : process.env.DB_HOST || 'remotemysql.com',
    user     : process.env.DB_USER || 'FMcJKj8JR8',
    password : process.env.DB_PASSWORD || 'mSG8AAoJ9F',
    database : process.env.DB_NAME || 'FMcJKj8JR8'
})

export { pool }