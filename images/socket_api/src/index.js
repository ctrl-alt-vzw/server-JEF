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
  "END"
];

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

async function handle_selection(uuid, step_id, selected) {
  conversations[uuid].info[STEPS[step_id]]["selected"] = selected

  const field = STEPS[step_id].toLowerCase();
  const option = conversations[uuid].info[STEPS[step_id]]["generated"][selected]
  db.table("games").update(field, JSON.stringify(option)).where({UUID: uuid}).returning("*").then((d) => {
    const visual_prompt = script(STEPS[step_id]).visual;
        
    conversations[uuid].step += 1;
    callback("SET_STEP/"+conversations[uuid].step)

    if(visual_prompt !== null) {
      const context = build_context(uuid)
      execute_prompt_visual(visual_prompt, context, uuid, STEPS[step_id])
    }

    conversation_step(uuid)
  })
}

async function conversation_step(uuid) {
  const step_id = conversations[uuid].step
  const step_handle = STEPS[step_id];
  const selected_language = conversations[uuid].language;
  const context = build_context(uuid)
  callback(`CHAT_QUESTION/${script(step_handle).chat[selected_language]}`)
  execute_prompt(uuid, step_handle, context)
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
    if(c.generated && STEPS[i].toLowerCase().indexOf("_look") == -1) {
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
        try {
          const split_response = response.split(/[\t|\n]+/g).filter(e=> e.length > 0).map((e) => cleanup_response(e))
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
  }
}

async function execute_prompt_visual(prompt, context, uuid, handle) {
  const replacedPrompt = prompt.replace("[[CONTEXT]]", context)
  console.log("SD PROMPT", replacedPrompt)
  fetch(`http://${process.env.OLLAMA_HOST}:11434/api/generate`, {
    method: "POST",
    body: JSON.stringify({
      model: "llama3.2",
      prompt: `${replacedPrompt}`,
      stream: false
    })
  })
    .then(r => r.json())
    .then(d => {
      const response = d.response;
      console.log(response)
      queue_prompt(response, uuid, handle)
      pipeline.push(uuid +"_"+handle+".png")
    })  
    .catch((e) => {
      console.error(e)
    })
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
  db.insert({
    UUID: generateUUID(),
    cartridge_id: id
  }).table("games").returning("*").then((d) => {
    conversations[d[0].UUID] = {
      step: 0,
      cartridge_id: id,
      language: "nl",
      current_options: [],
      info: {
        ENVIRONMENT: {},
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

  // callback("IMAGE/.../f88155b3-62fe-4e5f-b36a-8e22c565c583_PROTAGONIST_LOOK.png")
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
              callback("IMAGE/"+e.split("_")[0]+"/"+e)
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



