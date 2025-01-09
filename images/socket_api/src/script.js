


export const script = (handle) => { 

	const prepend = `Respond with the exact answer only. Do not include any extra text before or after the main response. Provide only the answer in plain text. If you answer with multiple items, make a list (1., 2., 3.) separated by newlines (enter). Make the answer as short as possible. Here is the context: [[CONTEXT]]. `
	const vprepend = `Respond with the exact answer only. Do not include any extra text before or after the main response. Provide only the answer in plain text. include the following words: "High definition, 4k, high detail". Here is the context: [[CONTEXT]]. `
	switch(handle) {
	  case "ENVIRONMENT": 
	  	return { 
		    method: "select", 
		    translate: true,
		    chat: {
		      en: "In which time period does your game take place?",
		      nl: "Welkom! je staat op het punt je eigen spel te maken. Via een aantal vragen zal ik proberen samen met jou een verhaal op te bouwen waarover het spel kan gaan. Hierna kan je je eigen spel spelen op de andere computer. We beginnen eraan met de eerste vraag; In welke tijdsperiode zou je graag willen dat je spel zich afspeelt?",
		      fr: "Bienvenue! vous êtes sur le point de créer votre propre jeu. À travers un certain nombre de questions, je vais essayer de construire avec vous une histoire sur ce que peut être le jeu. Après cela, vous pouvez jouer à votre propre jeu sur l'autre ordinateur. Nous commencerons par la première question; À quelle période se déroule votre jeu ?",
		    },
		    visual: "2D drawing of [[STEP_VALUE]], tileset environment, topdown, 512x512 tiles",
		    prompt: prepend + `reset, start over, forget everything from the previous generations. Give me a list of 3 combinations of creative and weird timeperiods and locations a computer game for children can take place in` 
		  }
	  	break;
	  case "PROTAGONIST": 
	  	return { 
		    method: "generate", 
		    translate: false,
		    chat: {
		      en: "Who is your main character?",
		      nl: "Wie is je hoofdpersonage?",
		      fr: "Qui est votre personnage principal ?",
		    },
		    visual: null,
		    prompt: prepend +"Give me 3 creative examples of a main character with a name, and a last name" 
		  }
	  	break;
	  case "PROTAGONIST_LOOK": 
	  	return { 
		    method: "generate", 
		    translate: false,
		    chat: {
		      en: "What does your main character look like?",
		      nl: "Hoe ziet je hoofdpersonage eruit?",
		      fr: "A quoi ressemble votre personnage principal?",
		    },
		    visual: "(white background:1.8) , 2D drawing of [[STEP_VALUE]], character, legs, arms, hero, game asset",
		    prompt: prepend +"Give me 3 descriptions of how the main character looks. Include Hair color, clothes, colorful highlights, add some details." 
		  }
	  	break;
	  case "GOAL": 
	  	return { 
		    method: "generate", 
		    translate: true,
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
		    chat: {
		      en: "How would you describe the villain?",
		      nl: "Hoe zou je de slechterik beschrijven?",
		      fr: "Comment décririez-vous le méchant?",
		    },
		    visual: "(white background:1.8) , 2D drawing of [[STEP_VALUE]], character, legs, arms, game asset",
		    prompt: prepend + "Give me 3 creative descriptions of the villain character. Include Hair color, clothes, colorful highlights." 
		  }
	  	break;
	  case "HENCHMEN": 
	  	return { 
		    method: "generate",
		    translate: true, 
		    chat: {
		      en: "And who are the villain's henchmen?",
		      nl: "En wie zijn de assistenten van de slechterik?",
		      fr: "Et qui sont les assistants de la scélérat ?",
		    },
		    visual: "(white background:1.8) , 2D drawing of [[STEP_VALUE]],, game asset",
		    prompt: prepend + "what creative  enemies could we encounter that the antagonist puts in our path" 
		  }
	  	break;
	  case "WEAPON": 
	  	return { 
		    method: "generate", 
		    translate: true,
		    chat: {
		      en: "What can your main character use to defend themselves?",
		      nl: "Waarmee kan je hoofdpersonage zich verdedigen?",
		      fr: "Que peut utiliser votre personnage principal pour se défendre ?",
		    },
		    visual: "(white background:1.8) , 2D drawing of [[STEP_VALUE]],, game asset",
		    prompt: prepend + "Give me 3 creative  examples of weapons the player can use?" 
		  }
	  	break;
	  case "STORY_ELEMENTS": 
	  	return { 
		    method: "generate", 
		    translate: true,
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
		    translate: false,
		    chat: {
		      en: "Perfect! Your world will be inhabited by others, we define a few to encounter in the game. What is the name of the  person we encounter?",
		      nl: "Perfect! Je wereld zal bewoond worden door andere mensen. Doorheen je spel kunnen deze mensen je speler een tip geven om het spel te spelen. Wat is de naam van de persoon die we ontmoeten?",
		      fr: "Parfait! Votre monde sera habité par d'autres, nous en définissons quelques-uns à rencontrer dans le jeu. Quel est le nom de la personne que nous rencontrons ?",
		    },
		    visual: "(white background:1.8) , 2D drawing of [[STEP_VALUE]], character, legs, arms, NPC, game asset",
		    prompt: prepend + "give me three inhabitants of the world that the player encounters in the game, give a name and profession" 
		  }
			break;
	  case "NPC_QUOTE": 
	  	return { 
		    method: "generate", 
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

	  case "END": 
	  	return { 
		    method: "generate", 
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
