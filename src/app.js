import express from 'express';
import cors from 'cors';
import connection from './database.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userCheck = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (userCheck.rows[0]) return res.sendStatus(409);
        const hashPassword = bcrypt.hashSync(password, 12);
        await connection.query(`
            INSERT
            INTO users (name, email, password)
            VALUES ($1,$2,$3)
            `, [name, email, hashPassword]);
        res.sendStatus(201);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post("/sign-in", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userQuery = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const user = userQuery.rows[0];
        if (user && bcrypt.compareSync(password, user.password))  {
            const token = uuidv4();
            await connection.query(`
                INSERT INTO sessions ("userId", token) VALUES ($1,$2)
                `, [user.id, token]);
            res.send({ name: user.name, token });
        } else {
            return res.sendStatus(401);
        }
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/transactions", async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) return res.sendStatus(401);
        const request = await connection.query(`
            SELECT transactions.* FROM transactions
            JOIN sessions ON sessions."userId" = transactions."userId"
            WHERE sessions.token = $1
            `, [token]);
        const transactions = request.rows;
        res.send(transactions);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post("/transaction", async (req, res) => {
    try {
        const { value, description } = req.body;
        const token = req.headers.authorization?.replace('Bearer ', '');
        const request = await connection.query(`
            SELECT * FROM sessions
            WHERE token = $1
            `, [token]);
        const session = request.rows[0];
        
        if (!session) return res.sendStatus(401);

        await connection.query(`
            INSERT INTO transactions
            ("userId", date, value, description)
            VALUES ($1, NOW(), $2, $3)
            `, [session.userId, value, description]);
        res.sendStatus(201);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default app;
