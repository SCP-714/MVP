const config=require('./config')[process.env.NODE_ENV||'dev'];

const express = require('express');
const cors = require('cors');
const app = express();
//const { Pool } = require('pg');
const { Client } = require('pg');
app.use(express.json());
app.use(cors());
//const PORT = 2016;        //local
const PORT = config.port;   //render
// const pool= new Pool({
//     connectionString: config.connectionString
// });
// pool.connect();

const client = new Client({
    connectionString: config.connectionString,
});
client.connect();

app.get('/', (req, res) => {
    res.send('HelloWorld!');
});


app.get('/api/scp', (req, res) => {
    async function allSCP() {
        try {
            let querystring = 'SELECT * FROM scp';
            const result = await client.query(querystring);
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
            let value = [req.params.id];
            const result = await client.query(querystring, value);
            if (result.rows.length == 0){
                res.sendStatus(404);
            }else{
                res.send(result.rows);
            }
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
            let querystring = 'INSERT INTO scp (item_number,name,class,series) VALUES ($1,$2,$3,$4)';
            const result = await client.query(querystring, [item, name, danger, series]);
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
            const result = await client.query(querystring, value);
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
            const result = await client.query(querystring, value);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack);
        }
    }
    deleteSCP();
});


app.listen(PORT, () => {
    console.log(`Back end running on ${PORT}`);
}); 