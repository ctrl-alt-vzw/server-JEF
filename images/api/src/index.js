import express  from 'express';
import knex  from 'knex';
import bodyParser  from 'body-parser';


// require and manage database connection
import knexfile  from './db/knexfile.cjs'; // Import your Knex configuration

const db = knex(knexfile);

import cors  from 'cors';

import games from './routes/games.js';
import scripts from './routes/scripts.js';


async function initialise() {
  // fetch necessary models
  // fetch("http://ollama:11434/api/pull", { method: "POST", body: JSON.stringify({ model: "llama3.2"})})
  // fetch("http://ollama:11434/api/pull", { method: "POST", body: JSON.stringify({ model: "tinyllama"})})

  console.log("connect")
}

// API endpoints
const port = 3000;

const app = express();

app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
  res.send({
    "version": "0.1"
  })
})

games(app, db);
scripts(app, db);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

initialise();