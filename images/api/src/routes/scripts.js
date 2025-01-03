import scripts from './../presets/scripts.js'


const system = `
  FROM llama3.2
  # sets the temperature to 1 [higher is more creative, lower is more coherent]
  PARAMETER temperature .9
  # sets the context window size to 4096, this controls how many tokens the LLM can use as context to generate the next token
  PARAMETER num_ctx 4096
  SYSTEM Please respond to all inputs with a valid JSON object. The JSON must follow this structure: { \"response\": [{ \"name\": <String>, \"explanation\": <String>, \"prompt\": <String> }, { \"name\": <String>, \"explanation\": <String>, \"prompt\": <String> }, { \"name\": <String>, \"explanation\": <String>, \"prompt\": <String> }] }. If information is missing, return an empty object instead. Keep responses simple and easy for a 9-year-old to understand. Ensure that the 'prompt' field is descriptive and suitable for Stable Diffusion to generate an accurate image of the object. Do not include extra text outside the JSON. All names, explanations, and prompts should be short, clear, and relevant.
`

export default function scriptAPI(app, pg) {

  app.get("/scripts", async (req, res) => {
    try {
      res.send(scripts);
    } catch (error) {
      console.error("Error fetching games:", error);
      res.status(500).send({ message: "Error fetching games", error });
    }
  });

  app.get("/script/:keyword", async (req, res) => {
    try {
      const { keyword } = req.params;

      const script = scripts[keyword]

      if (!script) {
        return res.status(404).send({ message: "Script not found" });
      }

      fetch("http://ollama:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({
          model: "llama3.2",
          prompt: `${script.prompt}`,
          stream: false,
          system: system
        })
      })
        .then(r => r.json())
        .then(d => {
          console.log(d.response)
          try {
            res.send({
              ...script, 
              options: JSON.parse(d.response)
            });
          }
          catch(e) {
            res.status(500).send({ message: e})
          }
        }) 



    } catch (error) {
      console.error("Error fetching script:", error);
      res.status(500).send({ message: "Error fetching script", error });
    }
  });


}
