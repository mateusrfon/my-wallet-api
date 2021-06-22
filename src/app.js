import express from 'express';
import cors from 'cors';
import pg from 'pg';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(4000, () => {
    console.log('Server started on port 4000.');
})