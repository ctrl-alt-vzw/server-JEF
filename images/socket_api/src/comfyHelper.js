
// #This is the ComfyUI api prompt format.

// #If you want it for a specific workflow you can "enable dev mode options"
// #in the settings of the UI (gear beside the "Queue Size: ") this will enable
// #a button on the UI to save workflows in api format.

// #keep in mind ComfyUI is pre alpha software so this format will change a bit.

// #this is the one for the default workflow
import env_flow from "./workflows/environment_flow.json" with { type: "json" };
import character_flow from "./workflows/character_flow.json" with { type: "json" };
import base_flow from "./workflows/base_flow.json" with { type: "json" };


const flows = {
  "ENVIRONMENT": env_flow,
  "PROTAGONIST_LOOK": character_flow,
  "ANTAGONIST_LOOK": character_flow,
  "HENCHMEN": character_flow,
  "NPC": character_flow
}

export const queue_prompt = (prompt_in, uuid, type) => {
  let flow = base_flow;
  if(flows[type]) {
    flow = flows[type]
  }

  flow["10"]["inputs"]["positive"] = prompt_in + ", 2d, drawing (white background:1.4)"
  flow["64"]["inputs"]["seed"] = Math.random() * 10000
  // flow["9"]["inputs"]["filename_prefix"] = uuid+"/"+type
  flow["110"]["inputs"]["path"] = "/home/jan/Documents/server-JEF/_volumes/images/" + uuid +"_"+type+".png"
  console.log(flow["12"]["inputs"]["path"])

  const p = {"prompt": flow}
  const url = 'http://192.168.0.148:8188/prompt'; 
  fetch(url, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(p)
  })
    .then(r => r.json())
    .then((d) => {
        console.log(d)
    })

}



