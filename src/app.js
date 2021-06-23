import express from 'express';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcrypt'; //segurança de senha
import { v4 as uuidv4 } from 'uuid'; //gerar token

const app = express();
app.use(express.json());
app.use(cors());

const { Pool } = pg;
const connection = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mywallet',
    password: '123456',
    port: 5432
});

//rota cadastro
//const hashPassword = bcrypt.hashSync(password, 12); //2^12 hash encrypt

//rota login
//bcrypt.compareSync(password, hashPassword) //comparison, returns bool
//const token = uuid.v4(); //geração do token
//INSERT INTO sessions ("userId", token) VALUES ($1, $2) //armazena o token gerado

//rota get transactions
//const authorization = req.headers['Authorization'];
//const token = authorization.replace('Bearer ', '');

//rota nova entrada

//rota nova saída

app.listen(4000, () => {
    console.log('Server started on port 4000.');
})

/* mywallet
users (id SERIAL, nome TEXT, email TEXT, password TEXT);
transactions (id SERIAL, "userId" INTEGER, date DATE, value INTEGER, description TEXT);
sessions (id SERIAL, "userId" INTEGER, token TEXT);
*/
