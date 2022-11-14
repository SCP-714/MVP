const express = require('express');
const app = express();
const { Pool } = require('pg');
const port = 2016;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'scp_mvp',
    password: 'docker',
    port: 5432,
});


app.get('/', (req, res) => {
    res.send('HelloWorld!');
});


app.get('/api/scp', (req, res) => {
    async function allSCP() {
        try {
            let querystring = 'SELECT * FROM scp';
            const result = await pool.query(querystring);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack);
        }
    }
    allSCP();
});


app.get('/api/scp/:id', (req, res) => {
    async function getSCP() {
        try {
            let querystring = 'SELECT * FROM scp WHERE id = $1';
            const result = await pool.query(querystring, [req.params.id]);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack);
        }
    }
    getSCP();
});


app.post('/api/scp', (req, res) => {
    async function createSCP() {
        try {
            let scp = req.body;
            let item = scp.item_number;
            let name = scp.name;
            let danger = scp.class;
            let series = scp.series;
            console.log(item,name,danger,series);
            let querystring = 'INSERT INTO scp (item_number,name,class,series) VALUES ($1,$2,$3,$4)';
            const result = await pool.query(querystring, [item, name, danger, series]);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack);
        }
    }
    createSCP();
});


app.patch('/api/scp/:id', (req, res) => {
    async function patchSCP() {
        try {
            let scp = req.body;
            let item = scp.item_number;
            let name = scp.name;
            let danger = scp.class;
            let series = scp.series;
            let id = req.params.id;
            let querystring = 'UPDATE scp SET item_number = $1, name = $2, class = $3, series = $4 WHERE id =$5';
            let value = [item, name, danger, series,id];
            const result = await pool.query(querystring, value);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack);
        }
    }
    patchSCP();
});


app.delete('/api/scp/:id', (req, res) => {
    async function deleteSCP() {
        try {
            let id = req.params.id;
            let querystring = 'DELETE FROM scp WHERE id =$1';
            let value = [id];
            const result = await pool.query(querystring, value);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack);
        }
    }
    deleteSCP();
});


app.listen(port, () => {
    console.log(`Example app on port ${port}`);
}); 