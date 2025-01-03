
const scenarios = {
  time_and_place: { 
    method: "select", 
    translate: true,
    chat: {
      en: "Welcome! You are about to create your own game. Through a number of questions I will try to build a story together with you about which the game can be about. After this you can play your own game on the other computer. We start with the first question; In which time period does your game take place?",
      nl: "Welkom! je staat op het punt je eigen spel te maken. Via een aantal vragen zal ik proberen samen met jou een verhaal op te bouwen waarover het spel kan gaan. Hierna kan je je eigen spel spelen op de andere computer. We beginnen eraan met de eerste vraag; In welke tijdsperiode zou je graag willen dat je spel zich afspeelt?",
      fr: "Bienvenue! vous êtes sur le point de créer votre propre jeu. À travers un certain nombre de questions, je vais essayer de construire avec vous une histoire sur ce que peut être le jeu. Après cela, vous pouvez jouer à votre propre jeu sur l'autre ordinateur. Nous commencerons par la première question ; À quelle période se déroule votre jeu ?",
    },
    prompt: `reset, start over, forget everything from the previous generations. Give me a list of 3 creative and weird timeperiods and locations a computer game for children can take place in` 
  },
  main_character: { 
    method: "generate", 
    translate: false,
    chat: {
      en: "Who is your main character?",
      nl: "Wie is je hoofdpersonage?",
      fr: "Qui est votre personnage principal ?",
    },
    prompt:"Give me 3 creative  examples of a main character with a name, and a last name" 
  }, 
  goal: { 
    method: "generate", 
    translate: true,
    chat: {
      en: "What is the goal of your main character?",
      nl: "Wat is het doel van je hoofdpersonage?",
      fr: "Quel est le but de votre personnage principal ?",
    },
    prompt:  "Give me 3 creative  examples of a goal we can achieve, what could drive the story,?" 
  }, 
  antagonist: { 
    method: "generate", 
    translate: true,
    chat: {
      en: "Who is the villain of the story?",
      nl: "Wie is de slechterik van het verhaal?",
      fr: "Qui est le scélérat de l'histoire ?",
    },
    prompt: "What are three creative  examples of antagonists that could prevent the mission to be a succes, give a name and nickname" 
  }, 
  small_enemies: { 
    method: "generate",
    translate: true, 
    chat: {
      en: "And who are the villain's henchmen?",
      nl: "En wie zijn de assistenten van de slechterik?",
      fr: "Et qui sont les assistants de la scélérat ?",
    },
    prompt: "what creative  enemies could we encounter that the antagonist puts in our path" 
  },
  weapon: { 
    method: "generate", 
    translate: true,
    chat: {
      en: "What can your main character use to defend themselves?",
      nl: "Waarmee kan je hoofdpersonage zich verdedigen?",
      fr: "Que peut utiliser votre personnage principal pour se défendre ?",
    },
    prompt: "Give me 3 creative  examples of weapons the player can use?" 
  }, 
  opening_sentence: { 
    method: "generate", 
    translate: true,
    chat: {
      en: "How would you like to open your story, what text will your player see to draw them into the story?",
      nl: "Hoe wil je je verhaal graag openen, welke tekst krijgt je speler te zien om ze het verhaal in te trekken?",
      fr: "Comment souhaiteriez-vous ouvrir votre histoire, quel texte votre joueur verra-t-il pour l'entraîner dans l'histoire ?",
    },
    prompt: "give me 3 options of a small textual opening sequence to set the story" 
  },
  NPC: { 
    method: "generate", 
    translate: false,
    chat: {
      en: "Perfect! Your world will be inhabited by others, we define a few to encounter in the game. What is the name of the first person we encounter?",
      nl: "Perfect! Je wereld zal bewoond worden door andere mensen. Doorheen je spel kunnen deze mensen je speler een tip geven om het spel te spelen. Wat is de naam van de eerste persoon die we ontmoeten?",
      fr: "Parfait! Votre monde sera habité par d'autres, nous en définissons quelques-uns à rencontrer dans le jeu. Quel est le nom de la première personne que nous rencontrons ?",
    },
    prompt: "give me an inhabitant of the world that the player encounters in the game, give a name and profession" 
  },
  NPC_line: { 
    method: "generate", 
    translate: true,
    chat: {
      en: "What can this person tell your player to help the main character progress?",
      nl: "Wat kan deze persoon tegen je speler vertellen om het hoofdpersonage vooruit te helpen?",
      fr: "Que peut dire cette personne à votre joueur pour aider le personnage principal à avancer ?",
    },
    prompt: "Give me one sentence per NPC that can be used in the game's dialogue, that gives the player a hint in how to achieve the goal." 
  },
  NPC2: { 
    method: "generate", 
    translate: false,
    chat: {
      en: "Who else might your player encounter?",
      nl: "Wie kan je speler nog tegenkomen?",
      fr: "Qui d'autre votre joueur peut-il rencontrer?",
    },
    prompt: "give me a second inhabitant of the world that the player encounters in the game, give a name and profession" 
  },
  NPC_line2: { 
    method: "generate", 
    translate: true,
    chat: {
      en: "What tip can this person give your player?",
      nl: "Welke tip kan deze persoon je speler meegeven?",
      fr: "Quel conseil cette personne peut-elle donner à votre joueur?",
    },
    prompt: "Give me one sentence that can be used in the game's dialogue, that gives the player a hint in how to achieve the goal." 
  },
  NPC3: { 
    method: "generate", 
    translate: false,
    chat: {
      en: "Who is the last person your player can encounter?",
      nl: "Wie is de laatste persoon die je speler tegen kan komen?",
      fr: "Quelle est la dernière personne que votre joueur peut rencontrer?",
    },
    prompt: "give me a final inhabitant of the world that the player encounters in the game, give a name and profession" 
  },
  NPC_line3: { 
    method: "generate", 
    translate: true,
    chat: {
      en: "What advice does this person give your main character?",
      nl: "Welke tip geeft deze persoon je hoofdpersonage mee?",
      fr: "Quel conseil cette personne donne-t-elle à votre personnage principal ?",
    },
    prompt: "Give me one sentence that can be used in the game's dialogue, that gives the player a hint in how to achieve the goal." 
  }
}

export default scenarios;


