import { afterAll, beforeEach } from '@jest/globals';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';

beforeEach(async () => {
    //delete database;
});

afterAll(async () => {
    //delete database
    //insert what i want
    await connection.end();
});

describe("GET /teste", () => {
    it("return status 200 for valid params", async () => {
        const result = await supertest(app).get("/teste");
        expect(result.status).toEqual(200);
    });
});