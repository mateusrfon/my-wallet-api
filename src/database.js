import pg from 'pg';

const { Pool } = pg;
const connection = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mywallet',
    password: '123456',
    port: 5432
});

export default connection;