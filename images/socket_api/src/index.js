import knex  from 'knex';
import { WebSocketServer } from 'ws';
import knexfile  from './db/knexfile.cjs';
import {generateUUID} from './helpers.js'
import {script} from './script.js'
import {queue_prompt} from './comfyHelper.js'

const db = knex(knexfile);
const wss = new WebSocketServer({ port: 3000 });
let ws = null;

let timer = null;
const pipeline = []

const conversations = {}
const STEPS = [
  "ENVIRONMENT",
  "PANEL",
  "PROTAGONIST", 
  "PROTAGONIST_LOOK",
  "GOAL",
  "ANTAGONIST",
  "ANTAGONIST_LOOK",
  "HENCHMEN",
  "WEAPON",
  "STORY_ELEMENTS",
  "NPC",
  "NPC_QUOTE",
  "TITLE",
  "END"
];

import express from 'express'
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/games', function (req, res) {
  db.select("*").table("games").then((data) => {
    res.send(data)
  }).catch((e) => {
    res.status(404).send()
  })
})
app.get('/games_by_cartridge/:cartridge_id', function (req, res) {
  db.select("*").table("games").where({ cartridge_id: req.params.cartridge_id}).limit(5).orderBy("id", "DESC").then((data) => {
    res.send(data)
  }).catch((e) => {
    res.status(404).send()
  })
})
app.get('/games/:uuid', function (req, res) {
  db.select("*").table("games").where({ cartridge_id: req.params.uuid}).then((data) => {
    res.send(data)
  }).catch((e) => {
    res.status(404).send()
  })
})



app.listen(3001)

function messageHandler(data) { 
  const spl = data.toString().split("/");
  if(spl.length > 1) {
    const cmd = spl[0]
    const payload = spl[2]
    const uuid = spl[1]

    switch(cmd) {
      case "NEW_GAME":
        console.log("new game")
        createNewGame(payload);
        break;
      case "INITIALISE_CONVERSATION":
        initialise_conversation(payload);
        break;

      case "SELECT_ANSWER":
        initialise_conversation(payload);
        break;

      case "SELECTED_OPTION":
        console.log(payload)
        const step =  payload.split(":")[0];
        const selected =  payload.split(":")[1];
        handle_selection(uuid, step, selected)
        console.log("selected", step, selected)
        break;

      case "LANGUAGE":
        conversations[uuid].language = payload.toLowerCase()
        conversation_step(uuid)
        break;

      case "CNF":
        console.log("confirm", payload)
        break;

      default:
        console.log(spl)
        break;
    } 
  } else {
    console.error(spl)
  }
}

async function translate(text, lang, cb) {
  if(lang == "en") { cb(text); }
  await fetch(`http://${process.env.TRANSLATE_HOST}:7500/translate`, {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: "en",
      target: lang,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((r) => r.json() )
  .then((d) => {
    console.log(d, text, lang);
    cb(d.translatedText)
  })
}

async function handle_selection(uuid, step_id, selected) {
  conversations[uuid].info[STEPS[step_id]]["selected"] = selected

  const field = STEPS[step_id].toLowerCase();
  const option = conversations[uuid].info[STEPS[step_id]]["generated"][selected]
  db.table("games").update(field, JSON.stringify({ ...option, full: conversations[uuid].info[STEPS[step_id]]["generated"]})).where({UUID: uuid}).returning("*").then((d) => {
    const visual_prompt = script(STEPS[step_id]).visual;
        
    conversations[uuid].step += 1;
    callback("SET_STEP/"+conversations[uuid].step)

    if(visual_prompt !== null) {
      const context = build_context(uuid)
      execute_prompt_visual(visual_prompt, context, uuid, STEPS[step_id], conversations[uuid].style_ref)
    }

    conversation_step(uuid)
  })
}

async function conversation_step(uuid) {
  const step_id = conversations[uuid].step
  const step_handle = STEPS[step_id];
  const selected_language = conversations[uuid].language;
  const context = build_context(uuid)

  if(script(STEPS[step_id]).ask) {
    callback(`CHAT_QUESTION/${script(step_handle).chat[selected_language]}`)
    execute_prompt(uuid, step_handle, context)
  } else {
    const visual_prompt = script(STEPS[step_id]).visual;
    execute_prompt_visual(visual_prompt, context, uuid, STEPS[step_id], "")
    console.log(conversations[uuid].info,  STEPS[step_id] )
    conversations[uuid].info[ STEPS[step_id] ].selected = null
    conversations[uuid].info[ STEPS[step_id] ].generated = []

    conversations[uuid].step += 1;
    callback("SET_STEP/"+conversations[uuid].step)
    conversation_step(uuid)
  }
}

//send to client
async function callback(message) {
  ws.send(message)
}

// prompt stuff
function build_context(uuid) {
  const items = conversations[uuid].info
  let str = '';
  for(let i = 0; i < Object.keys(items).length; i++) {
    const c = items[Object.keys(items)[i]];
    if(c.generated && STEPS[i].toLowerCase().indexOf("_look") == -1 && c.selected) {
      console.log(c.generated[c.selected])
      const field = c.generated[c.selected].text;
      const full = STEPS[i].toLowerCase() + ": " + field
      str += str.length > 0 ? ", " + full : full;
    }
  }
  console.log(str)
  return str;
}

async function execute_prompt(id, step_handle, context) {
  const selected_script = script(step_handle);
  if(selected_script.prompt !== null) {
    const replaced_prompt = selected_script.prompt.replace("[[CONTEXT]]", context)
    fetch(`http://${process.env.OLLAMA_HOST}:11434/api/generate`, {
      method: "POST",
      body: JSON.stringify({
        model: "llama3.2",
        prompt: `${replaced_prompt}`,
        stream: false
      })
    })
      .then(r => r.json())
      .then(d => {

        const response = d.response;
        translate(response, conversations[id].language, (translated_response) => {
          try {
            const split_response = translated_response.split(/[\t|\n]+/g).filter(e=> e.length > 0).map((e) => cleanup_response(e))
            if(split_response.length > 2) {

              const enriched = split_response.slice(0, 3).map((e, i) => {
                return {
                  text: e,
                  option: i
                }
              })
              conversations[id].info[step_handle]["generated"] = enriched
              callback(`GENERATED_OPTIONS/${JSON.stringify(enriched)}`)
            } else {
              console.log("redo")
              execute_prompt(id, step_handle, context)
            }
          } catch(e) {
            console.log(e)
          }
        })
      }) 
  }
}

async function execute_prompt_visual(prompt, context, uuid, handle, style_ref) {
  const el = conversations[uuid].info[handle];
  const ctx = conversations[uuid].info.ENVIRONMENT.generated[ conversations[uuid].info.ENVIRONMENT.selected ].text
  const promptpiece = el && el["generated"] && el["generated"][el["selected"]] ? el["generated"][el["selected"]].text : ""
  const tmp_prompt = prompt.replace("[[STEP_VALUE]]", promptpiece)
  const replacedPrompt = tmp_prompt.replace("[[CONTEXT]]", ctx)
  console.log("STYLE_REF: ", conversations[uuid].style_ref)
  console.log("PROMPT: ", replacedPrompt)
  queue_prompt(replacedPrompt, uuid, handle, style_ref)
  pipeline.push(uuid +"_"+handle+".png")
}

function cleanup_response(response) {
  return response.replace(/^\d+\.\s*/g, '')
}


// new game stuff
async function initialise_conversation(uuid) {
  console.log("conversation initialised on ", uuid)
  callback("SET_STEP/0")
  conversation_step(uuid)
}
async function createNewGame(id) {
  // insert new game into DB
  const styles = ["style1.webp", "style2.webp", "style3.webp", "style4.webp", "style5.webp", "style6.webp", "style7.webp", "style8.webp", "style9.webp", "style10.webp", "style11.webp" ]
  // style10.webp

  db.insert({
    UUID: generateUUID(),
    cartridge_id: id
  }).table("games").returning("*").then((d) => {
    conversations[d[0].UUID] = {
      style_ref: styles[Math.floor(Math.random()*styles.length)],
      step: 0,
      cartridge_id: id,
      language: "en",
      current_options: [],
      info: {
        ENVIRONMENT: {},
        PANEL: {},
        PROTAGONIST: {},
        PROTAGONIST_LOOK: {},
        GOAL: {},
        ANTAGONIST: {},
        ANTAGONIST_LOOK: {},
        HENCHMEN: {},
        WEAPON: {},
        STORY_ELEMENTS: {},
        NPC: {},
        NPC_QUOTE: {},
        TITLE: {},
        END: {}
      }
    }
    callback(`GAME_UUID/${d[0].UUID}`)
  })
}


wss.on('connection', function connection(_ws) {
  console.log("connection")
  ws = _ws;
  ws.on('error', console.error);
  ws.on('message', function message(data) {
    messageHandler(data)
  });
});
async function initialise() {
  console.log("connect")
  fetch(`http://${process.env.OLLAMA_HOST}:11434/api/pull`, { method: "POST", body: JSON.stringify({ model: "llama3.2"})})
  fetch(`http://${process.env.OLLAMA_HOST}:11434/api/pull`, { method: "POST", body: JSON.stringify({ model: "tinyllama"})})
  
  timer = setInterval(() => {
    let toRemove = -1;
    pipeline.forEach((e, i) => {
      if(toRemove == -1) {
        fetch(`http://${process.env.FILESTORE_HOST}:3030/generations/` + e, { method: "HEAD"})
          .then(res => {
            if (res.ok) {
              console.log("done generating", e)
              toRemove = i;
              pipeline.splice(toRemove, 1);
              setTimeout(()=> {
                callback("IMAGE/"+e.split("_")[0]+"/"+e)
              }, 500)
            } 
          }).catch(err => {
            // no image to be found
            console.log(err)
          });
      }

    })
  }, 1000)


}


initialise()



