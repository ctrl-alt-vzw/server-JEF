import express  from 'express';
import bodyParser  from 'body-parser';
import scenarios from "./presets/scenarios.js"



import cors  from 'cors';



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




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})



const scripts = {
  "time": {
    "action": "SELECT",
    "prompt": ""
  }
}