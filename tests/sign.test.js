import { afterAll, beforeEach } from '@jest/globals';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';

beforeAll(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM sessions');
});

afterAll(async () => {
    await connection.end();
});

describe("POST /sign-up", () => {
    it("returns status 201 for valid sign-up", async () => {
        const body = { name: "Teste", email: "teste@teste.com", password: "teste" };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(201);
    });
    it("returns status 409 for email already in use", async () => {
        const body = { name: "Teste", email: "teste@teste.com", password: "teste" };
        await supertest(app).post("/sign-up").send(body);
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(409);
    });
});

describe("POST /sign-in", () => {
    it("returns status 200 for valid user/password", async () => {
        const body = { email: "teste@teste.com", password: "teste" };
        const result = await supertest(app).post("/sign-in").send(body);
        expect(result.status).toEqual(200);
    });
    it("returns { name, token } for valid user/password", async () => {
        const body = { email: "teste@teste.com", password: "teste" };
        const result = await supertest(app).post("/sign-in").send(body);
        const session = await connection.query(`
            SELECT users.name AS name, sessions.token 
            FROM sessions 
            JOIN users ON users.id = sessions."userId"
            WHERE users.email = $1
        `, [body.email]);
        const lastSession = session.rows[session.rows.length - 1];
        const name = lastSession.name;
        const token = lastSession.token;
        expect(result.body).toEqual({ name, token });
    });
    it("returns status 401 for incorrect user", async () => {
        const body = { email: "tteste@teste.com", password: "teste" };
        const result = await supertest(app).post("/sign-in").send(body);
        expect(result.status).toEqual(401);
    })
    it("returns status 401 for incorrect password", async () => {
        const body = { email: "teste@teste.com", password: "tteste" };
        const result = await supertest(app).post("/sign-in").send(body);
        expect(result.status).toEqual(401);
    })
});