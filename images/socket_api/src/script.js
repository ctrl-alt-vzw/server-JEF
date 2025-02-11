

const rogueliteSettings = [
  "Neon Cyber City", // A glowing, futuristic metropolis with flying cars and holographic billboards.
  "Spooky Funfair", // A colorful carnival with haunted attractions, living toys, and mischievous ghosts.
  "Crystal Coral Kingdom", // A dazzling underwater world with glowing sea creatures and ancient mermaid ruins.
  "Enchanted Library Maze", // A vast, magical library where books create living stories and wandering wizards roam.
  "Whimsical Casino", // A magical gambling house where luck is a game and playful spirits control the odds.
  "Clockwork Toyland", // A world of giant wind-up toys, ticking gears, and friendly mechanical beings.
  "Starship Playground", // A spaceship filled with bouncing zero-gravity rooms and quirky malfunctioning robots.
  "Overgrown Ruinscape", // A peaceful post-apocalyptic world where nature has reclaimed lost cities.
  "Sugar Kingdom", // A land of towering candy canes, jellybean roads, and mischievous chocolate monsters.
  "Glowshroom Caverns", // A giant underground world full of glowing mushrooms and bioluminescent creatures.
  "Infinite Sky Tower", // A floating castle that grows endlessly into the sky, filled with strange portals.
  "Sky Island Archipelago", // A world of floating islands connected by ziplines and flying creatures.
  "Rainbow Reef", // A vibrant deep-sea adventure with rainbow-colored fish and treasure-filled shipwrecks.
  "Mystic Cowboy Town", // A magical Wild West where cowboy wizards ride spirit horses.
  "Dreamland Nexus", // A pastel-colored realm shifting between fluffy dreamscapes and floating cloud castles.
  "Frosty Wonderland", // A land of talking snowmen, enchanted ice palaces, and friendly winter spirits.
  "Giant’s Garden", // A lush, oversized world where everyday objects tower like mountains.
  "Jurassic Jungle", // A prehistoric land where friendly dinosaurs and ancient secrets wait to be discovered.
  "Shadow Lantern Realm", // A mystical land of floating lanterns and light spirits playing in the darkness.
  "Bazaar of Wonders", // A traveling market where everything—from flying carpets to pet dragons—is for sale.
  "Storybook Kingdom", // A fairy tale world where enchanted forests, magical castles, and talking animals thrive.
  "Lush Neon Jungle", // A vibrant forest where plants glow in neon hues and the trees hum with energy.
  "Mystic Detective City", // A foggy city of magical detectives solving supernatural mysteries.
  "Pixel Dreamscape", // A digital world where everything is made of pixels and glitches create new pathways.
  "Time-Travel Battlefields", // A place where dinosaurs, knights, and robots collide in friendly time-mix battles.
  "Puzzle Pyramid", // A giant golden pyramid full of shifting walls, ancient riddles, and treasure guardians.
  "Friendly Alien Planet", // A bouncy, colorful world where adorable aliens and strange landscapes await.
  "Toybox Kingdom", // A playful world where action figures, teddy bears, and dolls come to life.
  "Floating Festival City", // A city built on floating airships, where a never-ending festival takes place.
];

export const script = (handle) => { 

	const prepend = `Respond with the exact answer only. Do not include any extra text before or after the main response. Provide only the answer in plain text. If you answer with multiple items, make a list (1., 2., 3.) separated by newlines (enter). Make the answer as short as possible. Here is the context: [[CONTEXT]]. `
	const vprepend = `Respond with the exact answer only. Do not include any extra text before or after the main response. Provide only the answer in plain text. include the following words: "High definition, 4k, high detail". Here is the context: [[CONTEXT]]. `
	switch(handle) {
	  case "ENVIRONMENT": 
	  	return { 
		    method: "select", 
		    translate: true,
		    ask: true, 
		    chat: {
		      en: "In which time period does your game take place?",
		      nl: "Welkom! je staat op het punt je eigen spel te maken. Via een aantal vragen zal ik proberen samen met jou een verhaal op te bouwen waarover het spel kan gaan. Hierna kan je je eigen spel spelen op de andere computer. We beginnen eraan met de eerste vraag; In welke tijdsperiode zou je graag willen dat je spel zich afspeelt?",
		      fr: "Bienvenue! vous êtes sur le point de créer votre propre jeu. À travers un certain nombre de questions, je vais essayer de construire avec vous une histoire sur ce que peut être le jeu. Après cela, vous pouvez jouer à votre propre jeu sur l'autre ordinateur. Nous commencerons par la première question; À quelle période se déroule votre jeu ?",
		    },
		    visual: "A grid of 4x4 isometric elements for a  game set in [[STEP_VALUE]]. \n the first two rows of tiles, top of the image contains only empty tiles, as reference, no objects on these tiles. \n the elements bellow th first half are environment elements, and other  objects which can block the path of the player. \n white background \n make the artwork bright, colorful, and playful in an illustrative, comic book style.",
		    prompt: prepend + `reset, start over, forget everything from the previous generations. Give me a list of 3 combinations of creative and weird timeperiods and locations a computer game for children can take place in, pick from this list: ${rogueliteSettings.map((e) => e + ", ")}` 
		  }
	  	break;
	  case "PROTAGONIST": 
	  	return { 
		    method: "generate", 
		    ask: true,
		    translate: false,
		    chat: {
		      en: "Who is your main character?",
		      nl: "Wie is je hoofdpersonage?",
		      fr: "Qui est votre personnage principal ?",
		    },
		    visual: null,
		    prompt: prepend +"Give me 3 creative examples of a main character. consider a name, and a last name, and a job" 
		  }
	  	break;
	  case "PANEL": 
	  	return { 
		    method: "generate", 
		    ask: false,
		    translate: false,
		    chat: {
		      en: null,
		      nl: null,
		      fr: null,
		    },
		    visual: "Create a floating, isolated text panel designed for use in a game engine. The panel should have a bright, detailed, and colorful aesthetic, fitting the theme of [[CONTEXT]]. Use a comic book-style, illustrative, and cel-shaded look to add depth. \n\n Background & Integration: The panel should be isolated against a flat, evenly colored background, making it easy to integrate into a game engine.\n\n Text Area: Leave a clearly defined space in the center for displaying in-game text, ensuring readability while maintaining stylistic details around the borders.make the spacing to the borders big enough",
		    prompt: null 
		  }
	  	break;
	  case "PROTAGONIST_LOOK": 
	  	return { 
		    method: "generate", 
		    ask: true,
		    translate: false,
		    chat: {
		      en: "What does your main character look like?",
		      nl: "Hoe ziet je hoofdpersonage eruit?",
		      fr: "A quoi ressemble votre personnage principal?",
		    },
		    visual: "Design an isolated isometric game asset pack for a , [[CONTEXT]] character named [[STEP_VALUE]]. \n The asset pack should be arranged as follows: \n Top left: Two arms, fingers pointing downward—one outer left hand and one inner right hand. \n Bottom left: Two legs, feet pointing downward—left and right. \n Right side: The torso and head, facing forward to the right. \n The artwork should be bright, detailed, and colorful, with a comic book-style, illustrative aesthetic that adds depth while maintaining a playful and immersive feel. \n Ensure the artwork is presented in an isometric perspective, isolated from any distracting background elements, making it easy to integrate into a game engine.",
		    prompt: prepend +"Give me 3 different descriptions of how the main character looks. Include the name of the character and a basic description of clothes" 
		  }
	  	break;
	  case "GOAL": 
	  	return { 
		    method: "generate", 
		    translate: true,
		    ask: true, 
		    chat: {
		      en: "What is the goal of your main character?",
		      nl: "Wat is het doel van je hoofdpersonage?",
		      fr: "Quel est le but de votre personnage principal ?",
		    },
		    visual: null,
		    prompt: prepend +  "Give me 3 creative  examples of a goal we can achieve, what could drive the story,?" 
		  }
	  	break;
	  case "ANTAGONIST": 
	  	return { 
		    method: "generate", 
		    translate: true,
		    ask: true, 
		    chat: {
		      en: "Who is the villain of the story?",
		      nl: "Wie is de slechterik van het verhaal?",
		      fr: "Qui est le scélérat de l'histoire ?",
		    },
		    visual: null,
		    prompt: prepend + "What are 3 creative examples of antagonists that could prevent the mission to be a succes, give a name and nickname" 
		  }
	  	break;
	  case "ANTAGONIST_LOOK": 
	  	return { 
		    method: "generate", 
		    translate: true,
		    ask: true, 
		    chat: {
		      en: "How would you describe the villain?",
		      nl: "Hoe zou je de slechterik beschrijven?",
		      fr: "Comment décririez-vous le méchant?",
		    },
		    visual: "Design an isolated isometric game asset pack for a villain, [[CONTEXT]] character named [[STEP_VALUE]]. \n The asset pack should be arranged as follows: \n Top left: Two arms, fingers pointing downward—one outer left hand and one inner right hand. \n Bottom left: Two legs, feet pointing downward—left and right. \n Right side: The torso and head, facing forward to the right. \n The artwork should be bright, detailed, and colorful, with a comic book-style, illustrative aesthetic that adds depth while maintaining a playful and immersive feel. \n Ensure the artwork is presented in an isometric perspective, isolated from any distracting background elements, making it easy to integrate into a game engine.",
		    prompt: prepend + "Give me 3 creative descriptions of the villain character.  Include the name of the character and a basic description of clothes" 
		  }
	  	break;
	  case "HENCHMEN": 
	  	return { 
		    method: "generate",
		    translate: true,
		    ask: true,  
		    chat: {
		      en: "And who are the villain's henchmen?",
		      nl: "En wie zijn de assistenten van de slechterik?",
		      fr: "Et qui sont les assistants de la scélérat ?",
		    },
		    visual: "Design an isolated isometric game asset of an angry, floating, underwater coral warrior. \n The warrior should be a sentient creature from [[CONTEXT]]It should have glowing eyes and an aggressive expression, emphasizing its battle-ready stance. The warrior is called a [[STEP_VALUE]] \n It should be floating  with no ground below it. \n The style should be bright, colorful, and playful, suited for a 9-year-old, with a comic book-style, illustrative, and cel-shaded aesthetic to add depth and character. \n it should be looking to the left \n Ensure the artwork is presented in an isometric perspective, isolated from any distracting background elements, making it easy to integrate into a game engine.",
		    prompt: prepend + "what creative  enemies could we encounter that the antagonist puts in our path" 
		  }
	  	break;
	  case "WEAPON": 
	  	return { 
		    method: "generate", 
		    translate: true,
		    ask: true, 
		    chat: {
		      en: "What can your main character use to defend themselves?",
		      nl: "Waarmee kan je hoofdpersonage zich verdedigen?",
		      fr: "Que peut utiliser votre personnage principal pour se défendre ?",
		    },
		    visual: " \n Design an isolated isometric game asset of a themed weapon set, from [[CONTEXT]], arranged from top to bottom in a left-to-right perspective. \n A handgun (top) and A melee weapon (bottom), being [[STEP_VALUE]] \n All weapons should be floating in an empty, evenly colored background, making them easy to integrate into a game engine. \n The artwork should be bright, detailed, and colorful, with a comic book-style, illustrative, and cel-shaded aesthetic that adds depth . \n Ensure the artwork is presented in an isometric perspective, isolated from any distracting background elements.",
		    prompt: prepend + "Give me 3 creative  examples of weapons the player can use?" 
		  }
	  	break;
	  case "STORY_ELEMENTS": 
	  	return { 
		    method: "generate", 
		    translate: true,
		    ask: true, 
		    chat: {
		      en: "How would you like to open your story, what text will your player see to draw them into the story?",
		      nl: "Hoe wil je je verhaal graag openen, welke tekst krijgt je speler te zien om ze het verhaal in te trekken?",
		      fr: "Comment souhaiteriez-vous ouvrir votre histoire, quel texte votre joueur verra-t-il pour l'entraîner dans l'histoire?",
		    },
		    visual: null,
		    prompt: prepend + "give me 3 options of a small textual opening sequence to set the story" 
		  }
	  	break;
	  case "NPC": 
	  	return { 
		    method: "generate", 
		    ask: true,
		    translate: false,
		    chat: {
		      en: "Perfect! Your world will be inhabited by others, we define a few to encounter in the game. What is the name of the  person we encounter?",
		      nl: "Perfect! Je wereld zal bewoond worden door andere mensen. Doorheen je spel kunnen deze mensen je speler een tip geven om het spel te spelen. Wat is de naam van de persoon die we ontmoeten?",
		      fr: "Parfait! Votre monde sera habité par d'autres, nous en définissons quelques-uns à rencontrer dans le jeu. Quel est le nom de la personne que nous rencontrons ?",
		    },
		    visual: "2Design an isolated isometric game asset pack for a NPC, [[CONTEXT]] character named [[STEP_VALUE]]. \n The asset pack should be arranged as follows: \n Top left: Two arms, fingers pointing downward—one outer left hand and one inner right hand. \n Bottom left: Two legs, feet pointing downward—left and right. \n Right side: The torso and head, facing forward to the right. \n The artwork should be bright, detailed, and colorful, with a comic book-style, illustrative aesthetic that adds depth while maintaining a playful and immersive feel. \n Ensure the artwork is presented in an isometric perspective, isolated from any distracting background elements, making it easy to integrate into a game engine.",
		    prompt: prepend + "give me three inhabitants of the world that the player encounters in the game, give a name and profession" 
		  }
			break;
	  case "NPC_QUOTE": 
	  	return { 
		    method: "generate", 
		    ask: true,
		    translate: false,
		    chat: {
		      en: "What tip can this character give your protagonist to make the game more fun?",
		      nl: "Welke tip kan dit personage je protagonist meegeven om het spel leuker te maken?",
		      fr: "Quel conseil ce personnage peut-il donner à votre protagoniste pour rendre le jeu plus amusant?",
		    },
		    visual: null,
		    prompt: prepend + "What might the inhabitant of the world say to the main character, give me 3 quotes?" 
		  }
			break;

	  case "TITLE": 
	  	return { 
		    method: "generate", 
		    ask: true,
		    translate: true,
		    chat: {
		      en: "What do you want to call your game?",
		      nl: "Hoe wil je je spel noemen?",
		      fr: "Comment veux-tu appeler ton jeu ?",
		    },
		    visual: null,
		    prompt: prepend + "What might the name of the game be, give me 3 options?"  
		  }
			break;
		case "END": 
	  	return { 
		    method: "generate", 
		    ask: true,
		    translate: false,
		    chat: {
		      en: "Ready! Take your cassette from the holder and go to the play booth to try out your game.",
		      nl: "Klaar! Neem je casette uit de houder en ga naar de play booth om je spel uit te proberen.",
		      fr: "Fini! Sortez votre cassette du support et rendez-vous au stand de jeu pour tester votre jeu.",
		    },
		    visual: null,
		    prompt: null 
		  }
			break;

		}
}
