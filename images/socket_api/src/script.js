

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
		      en: "Yes! Let's get started! Where does your game take place?",
		      nl: "Yes! We gaan van start! Waar speelt jouw spel zich af?",
		      fr: "C'est parti ! Où se déroule ton jeu ?",
		    },
		    visual: "A grid of 4x4 isometric elements for a  game set in [[STEP_VALUE]]. \n the first two rows of tiles, top of the image contains only empty tiles, as reference, no objects on these tiles. \n the elements bellow th first half are environment elements, and other  objects which can block the path of the player. \n white background \n make the artwork bright, colorful, and playful in an illustrative",
		    prompt: prepend + `reset, start over, forget everything from the previous generations. Give me a list of 3 combinations of creative and weird timeperiods and locations for a computer game for children, pick from this list: ${rogueliteSettings.map((e) => e + ", ")}` 
		  }
	  	break;
	  case "PROTAGONIST": 
	  	return { 
		    method: "generate", 
		    ask: true,
		    translate: false,
		    chat: {
		      en: "What is the name of your main character?",
		      nl: "Wat is de naam van je hoofdpersonage?",
		      fr: "Quel est le nom de ton personnage principal ?",
		    },
		    visual: null,
		    prompt: prepend +"Give me 3 creative examples of a main character. answer with a name, and a last name, and a job" 
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
		    visual: "Design an isolated isometric game asset pack for a , [[CONTEXT]] character named [[STEP_VALUE]]. \n The asset pack should be arranged as follows: \n Top left: Two arms, fingers pointing downward—one outer left hand and one inner right hand. \n Bottom left: Two legs, feet pointing downward—left and right. \n Right side: The torso and head, facing forward to the right. no feet and arms, only the torso, facing right. \n The artwork should be bright, detailed, and colorful, with a comic book-style, illustrative aesthetic that adds depth while maintaining a playful and immersive feel. \n Ensure the artwork is presented in an isometric perspective, isolated from any distracting background elements, making it easy to integrate into a game engine.",
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
		      nl: "Wat is het grote doel van je hoofdpersonage?",
		      fr: "Quel est le but de ton personnage principal ?",
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
		      en: "Let's make your story exciting! Who is the villain in your game?",
		      nl: "Laten we je verhaal spannend maken! Wie is de slechterik in je game?",
		      fr: "Rendre ton histoire passionnante ! Qui est le méchant de ton jeu ?",
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
		      en: "Which description fits the villain the best?",
		      nl: "Welke omschrijving past het best bij de slechterik?",
		      fr: "Quelle description correspond le mieux au méchant ?",
		    },
		    visual: "Design an isolated isometric game asset pack for a villain, [[CONTEXT]] character named [[STEP_VALUE]]. \n The asset pack should be arranged as follows: \n Top left: Two arms, fingers pointing downward—one outer left hand and one inner right hand. \n Bottom left: Two legs, feet pointing downward—left and right. \n Right side: The torso and head, facing forward to the right, no arms or legs, torso and head facing right. \n The artwork should be bright, detailed, and colorful, with a comic book-style, illustrative aesthetic that adds depth while maintaining a playful and immersive feel. \n Ensure the artwork is presented in an isometric perspective, isolated from any distracting background elements, making it easy to integrate into a game engine.",
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
		    visual: "Design an isolated isometric game asset of an angry, floating, [[STEP_VALUE]]. \n The warrior should be a sentient creature from [[CONTEXT]]It should have glowing eyes and an aggressive expression, emphasizing its battle-ready stance. The warrior is called a [[STEP_VALUE]] \n It should be floating  with no ground below it. \n The style should be bright, colorful, and playful, suited for a 9-year-old, with a comic book-style, illustrative, and cel-shaded aesthetic to add depth and character. \n it should be looking to the left \n Ensure the artwork is presented in an isometric perspective, isolated from any distracting background elements, making it easy to integrate into a game engine.",
		    prompt: prepend + "what creative  enemies could we encounter that the antagonist puts in our path" 
		  }
	  	break;
	  case "WEAPON": 
	  	return { 
		    method: "generate", 
		    translate: true,
		    ask: true, 
		    chat: {
		      en: "They're going to make it tough for us! What can your main character use to defend themselves?",
		      nl: "Zij gaan het ons lastig maken! Waarmee kan het hoofdpersonage zich verdedigen?",
		      fr: "Ils vont nous rendre la tâche difficile ! Avec quoi ton personnage principal peut-il se défendre ?",
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
		      en: "We're almost done! Just a few more questions. How does the game start? What text will we use to immediately immerse the players in our world?",
		      nl: "We zijn bijna klaar! Nog maar een paar vragen. Hoe start het spel? Met welke tekst gaan we de spelers meteen onze wereld in zuigen?",
		      fr: "Nous sommes presque prêts ! Encore quelques questions. Comment commence le jeu ? Quel texte allons-nous utiliser pour plonger les joueurs dans notre monde ?",
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
		      en: "Perfect! Your world will have other inhabitants who can give you tips. What is the name of the person we meet?",
		      nl: "Perfect! Je wereld krijgt andere bewoners die je tips kunnen geven. Wat is de naam van de persoon die we ontmoeten?",
		      fr: "Parfait ! Ton monde sera peuplé d'autres personnages qui peuvent donner des conseils. Quel est le nom de la personne que l'on rencontre ?",
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
		      en: "What hint can this character give your main character to make the game even more fun?",
		      nl: "Welke tip kan dit personage je hoofdpersonage geven om het spel nog leuker te maken?",
		      fr: "Quel conseil ce personnage peut-il donner à ton personnage principal pour rendre le jeu encore plus amusant ?",
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
		      en: "Your game is all ready! It just needs a title. What do you want to call it?",
		      nl: "Je spel is helemaal klaar! Het heeft alleen nog een titel nodig. Hoe wil je het noemen?",
		      fr: "Ton jeu est prêt ! Il ne lui manque plus qu'un titre. Comment veux-tu l'appeler ?",
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
		      en: "Done! Take your puck out of the holder and head to the Play booth to try out your game!",
		      nl: "Klaar! Neem je puck uit de houder en ga naar de Play booth om je spel uit te proberen!",
		      fr: "C'est fini ! Prends ta cassette du support et rends-toi au stand de jeu pour tester ton jeu."
		    },
		    visual: null,
		    prompt: null 
		  }
			break;

		}
}
