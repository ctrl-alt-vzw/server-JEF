
// #This is the ComfyUI api prompt format.

// #If you want it for a specific workflow you can "enable dev mode options"
// #in the settings of the UI (gear beside the "Queue Size: ") this will enable
// #a button on the UI to save workflows in api format.

// #keep in mind ComfyUI is pre alpha software so this format will change a bit.

// #this is the one for the default workflow
import env_flow from "./workflows/environment_flow.json" with { type: "json" };
import character_flow from "./workflows/character_flow.json" with { type: "json" };
import henchmen_flow from "./workflows/henchmen_flow.json" with { type: "json" };
import base_flow from "./workflows/base_flow.json" with { type: "json" };
import style_flow from "./workflows/style_flow.json" with { type: "json" };
import rect_flow from "./workflows/rect_flow.json" with { type: "json" };
import weapon_flow from "./workflows/weapon_flow.json" with { type: "json" };
import sphere_flow from "./workflows/sphere_flow.json" with { type: "json" };


const flows = {
  "ENVIRONMENT": env_flow,
  "PROTAGONIST_LOOK": character_flow,
  "ANTAGONIST_LOOK": character_flow,
  "HENCHMEN": henchmen_flow,
  "NPC": character_flow,
  "WEAPON": weapon_flow
}

export const queue_prompt = (prompt_in, uuid, type, style_ref) => {
  let flow = {...base_flow};
  if(flows[type]) {
    flow = flows[type]
  }

  flow["6"]["inputs"]["text"] = prompt_in
  flow["3"]["inputs"]["seed"] = Math.random() * 10000
  // flow["9"]["inputs"]["filename_prefix"] = uuid+"/"+type
  flow["12"]["inputs"]["path"] = "/home/jan/Documents/server-JEF/_volumes/images/" + uuid +"_"+type+".png"

  const p = {"prompt": flow}
  const url = 'http://0.0.0.0:8188/prompt'; 
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



