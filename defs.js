const DIMENSIONS = ["Travail en équipe", "Méthode de travail", "Style de leadership", "Prise de risque", "Adaptabilité", "Style de réflexion", "Approche des problématiques", "Régularité du travail", "Passion dans le travail", "Précision dans le travail", "Style de communication"];

const DEF_RIASEC = {
  R: "Attiré par les métiers à forte composante technique. Préfère travailler sur les objets plutôt que sur les idées.",
  I: "Privilégie l'observation, la résolution de problème et l'analyse. Recherche un environnement stimulant intellectuellement.",
  A: "Innovant et intuitif, il est attiré par les postes favorisant l'expression de sa créativité.",
  S: "Altruiste et social, il œuvre pour aider, soutenir ou former autrui. Il privilégie la discussion et le consensus.",
  E: "Aime faire prévaloir ses idées, par influence ou persuasion et cherche à occuper une place de leader.",
  C: "Organisé, il recherche les milieux stables, structurés et cadrés. Forte capacité numérique et administrative."
};

const DEF_STYLES = {
  "Indépendant": "Préfère réaliser les tâches de façon indépendante. Aime manier les données, les idées ou les objets, au détriment de l'interaction avec autrui. Apprécie que l'on attribue au préalable les rôles et tâches de chacun.",
  "Coopératif": "Préfère travailler et collaborer au cœur de grandes équipes, afin d'atteindre des objectifs communs. Aime venir en aide aux autres. Privilégie la non-distribution des rôles pour favoriser la synergie.",
  "Technique": "Préfère un style d'apprentissage et une méthode de travail axés sur la pratique. Apprend au travers d'expériences concrètes et fait évoluer son projet par les répétitions d'échecs. Préfère les formations courtes permettant d'acquérir des compétences spécifiques. Aura plus de facilité à devenir un expert pointu reconnu par ses pairs.",
  "Intellectuel": "Préfère un style d'apprentissage et une méthode de travail axés sur la théorie et les concepts abstraits. Considère la connaissance comme une fin en soi. Apprend principalement à travers les livres et les cours. Aura plus de facilité à devenir responsable d'un large périmètre.",
  "Exécuteur": "Préfère exécuter scrupuleusement les tâches attribuées. Aime être un exemple de réussite et de travail, plutôt que de donner des directives.",
  "Meneur": "Est à l'aise pour gérer et motiver les autres. Préfère diriger plutôt qu'exécuter. Peut avoir du mal à suivre les directives qu'on lui donne et a tendance à imposer sa propre volonté.",
  "Prudent": "N'aime pas la prise de risque. Plus sensible au stress, aime les activités calmes, fait preuve de prudence. A tendance à peser le pour et le contre longtemps avant de prendre une décision. Aura tendance à ne pas changer d'entreprise à cause du risque de se retrouver dans une moins bonne situation.",
  "Audacieux": "Aime la prise de risque, apprécie les idées originales, les projets novateurs, et n'aime pas la redondance dans ses activités. Parfois trop rapide dans sa prise de décision, peut manquer de rationalité. N'aura pas peur de changer de structure dès que l'opportunité semble intéressante.",
  "Flexible": "Conçoit qu'il faut adapter un projet au gré des difficultés rencontrées. N'a pas peur de l'inattendu et du changement.",
  "Rigide": "Aime la stabilité, et est enclin à respecter scrupuleusement les demandes. A tendance à persévérer voire s'obstiner.",
  "Intuitif": "Préfère se lancer directement dans le travail sans forcément prendre le temps de la réflexion.",
  "Réfléchi": "Essaye d'anticiper au maximum les problématiques qui surviendront. Peut prendre beaucoup de temps de réflexion et de prise de recul avant de commencer.",
  "Disruptif": "A une capacité à envisager des solutions innovantes et hors du cadre naturellement imposé par le projet.",
  "Académique": "Exploite les ressources à sa disposition et son expérience pour parvenir à des solutions efficaces. Peut éprouver des difficultés face à des problématiques nouvelles.",
  "Impulsif": "Est plus à l'aise dans un fonctionnement agile qui le poussera à se surpasser. C'est un sprinter. Préfère changer de mission voire d'entreprise fréquemment.",
  "Constant": "Capable de soutenir un niveau de productivité relativement élevé sur le long terme. C'est un marathonien. Préfère accomplir de grands projets étalés sur plusieurs années.",
  "Passionné": "A de grandes facilités à se plonger pendant de longues heures dans un projet qui le passionne. A l'inverse, si le sujet ne l'intéresse pas, il aura du mal à être productif.",
  "Pragmatique": "Est capable de se détacher de son a priori et aborde n'importe quel sujet avec rationalité. N'a pas besoin d'être intéressé par un sujet pour le traiter.",
  "Minutieux": "Prête une grande attention aux détails. Cherche la perfection dans ses productions au risque de s'imposer des standards d'excellence difficiles à atteindre.",
  "Global": "Porte peu d'attention aux détails pour privilégier la compréhension d'ensemble d'un projet / produit / situation.",
  "Réservé": "Attend parfois qu'on lui demande son opinion pour la donner. Ne prend pas souvent la parole. Considère qu'une parole détaillée n'est pas toujours nécessaire.",
  "Expansif": "Souhaite partager l'entièreté de sa vision au risque de noyer l'essentiel. Sait comment expliquer et défendre son point de vue avec parfois trop de précision. Considère qu'une parole détaillée est préférable quel que soit son interlocuteur."
};

const DEF_CRITERES = {
  "Salaire": "Niveau des salaires.",
  "Équilibre de vie": "Place accordée à l'équilibre vie professionnelle / vie personnelle.",
  "Emploi urbain": "Emplois présents principalement dans les grandes villes.",
  "Terrain": "Taux de présence sur le terrain.",
  "Responsabilités": "Niveau de responsabilité, y compris en début de carrière.",
  "Aspect collectif": "Fonction principalement intégrée au sein d'équipes.",
  "International": "Interaction avec des acteurs à l'international.",
  "Flexibilité": "Possibilité de télétravail et / ou d'aménagement du temps de travail.",
  "Activité technique": "Niveau de technicité.",
  "Stress": "Niveau de stress et de sollicitation.",
  "Rémunération/h": "Rapport de la rémunération sur le temps de travail.",
  "Apport à la société": "À haute valeur ajoutée et d'intérêt public.",
  "Communication": "Importance de la communication dans la fonction.",
  "Impact stratégique": "Capacité d'influence sur les décisions.",
  "Liberté géographique": "Possibilité de mobilité géographique.",
  "Taille d'entreprise": "0 = principalement des TPE, 10 = principalement des multinationales.",
  "Recherche": "À haut niveau de recherche et technologies de pointe.",
  "Éthique": "Importance des questions environnementales et sociétales apportées dans le milieu de l'emploi.",
  "Dynamique marché": "Marché de l'emploi porteur.",
  "Présence de cadres": "Taux de cadres parmi les salariés du secteur."
};
