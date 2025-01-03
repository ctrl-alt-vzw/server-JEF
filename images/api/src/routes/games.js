import { generateUUID } from './../helpers.js';

export default function gameAPI(app, pg) {

  app.get("/games", async (req, res) => {
    try {
      // Fetch all games from the "games" table
      const games = await pg.select("*").table("games").orderBy("created_at", "DESC");
      
      res.send(games);
    } catch (error) {
      console.error("Error fetching games:", error);
      res.status(500).send({ message: "Error fetching games", error });
    }
  });

  app.get("/game/:uuid", async (req, res) => {
    try {
      const { uuid } = req.params;

      // Fetch a specific game by UUID
      const game = await pg.select("*").table("games").where("UUID", uuid).first();

      if (!game) {
        return res.status(404).send({ message: "Game not found" });
      }

      res.send(game);
    } catch (error) {
      console.error("Error fetching game:", error);
      res.status(500).send({ message: "Error fetching game", error });
    }
  });

  app.post("/game", async (req, res) => {
    try {
      const gameUUID = generateUUID();
      console.log(req.body)
      const {
        cartridge_id
      } = req.body;

      const newGame = {
        UUID: gameUUID,
        cartridge_id: cartridge_id,
        environment: {
          text: null,
          image_uri: null
        },
        protagonist: {
          text: null,
          image_uri: null
        },
        antagonist: {
          text: null,
          image_uri: null
        },
        henchemen: {
          text: null,
          image_uri: null
        },
        story_elements: {
          text: null,
          image_uri: null
        },
        npc: {
          text: null,
          image_uri: null
        },
        goal: {
          text: null,
          image_uri: null
        },
        weapon: {
          text: null,
          image_uri: null
        }
      };

      // Insert the new game into the "games" table
      await pg.insert(newGame).table("games");

      res.send({ message: "Game created successfully", uuid: gameUUID });
    } catch (error) {
      console.error("Error creating game:", error);
      res.status(500).send({ message: "Error creating game", error });
    }
  });


  app.put("/game/:uuid", async (req, res) => {
    try {
      const { uuid } = req.params;
      const updates = req.body;

      // Update the game in the "games" table by UUID
      const updatedGame = await pg("games").where("UUID", uuid).update(updates).returning("*");

      if (updatedGame.length === 0) {
        return res.status(404).send({ message: "Game not found" });
      }

      res.send({ message: "Game updated successfully", game: updatedGame[0] });
    } catch (error) {
      console.error("Error updating game:", error);
      res.status(500).send({ message: "Error updating game", error });
    }
  });

  app.delete("/game/:uuid", async (req, res) => {
    try {
      const { uuid } = req.params;

      // Delete the game from the "games" table by UUID
      const deletedGame = await pg.delete().from("games").where("UUID", uuid).returning("*");

      if (deletedGame.length === 0) {
        return res.status(404).send({ message: "Game not found" });
      }

      res.send({ message: "Game deleted successfully", uuid });
    } catch (error) {
      console.error("Error deleting game:", error);
      res.status(500).send({ message: "Error deleting game", error });
    }
  });

}
