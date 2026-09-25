// Génération du rapport narratif et du guide d'entretien à partir des scores TOPI (données fictives).
const FEMMES = ["c3", "c5", "c7", "c9", "c11"];
const pr = c => FEMMES.includes(c.id) ? { il: "elle", cand: "la candidate", de: "d'elle-même", f: true } : { il: "il", cand: "le candidat", de: "de lui-même", f: false };
const gend = (t, p) => p.f ? t.replace(/\bIl\b/g, "Elle").replace(/\bil\b/g, "elle").replace(/ttiré/g, "ttirée") : t;

const FORCE = {
  "Coopératif": "Travaille naturellement en équipe et favorise la synergie",
  "Indépendant": "Autonome, peut mener ses tâches sans supervision rapprochée",
  "Intellectuel": "À l'aise avec la théorie et les concepts abstraits, prend du recul",
  "Technique": "Apprend par la pratique, peut devenir un expert pointu reconnu par ses pairs",
  "Meneur": "À l'aise pour gérer et motiver les autres",
  "Exécuteur": "Exécute avec rigueur les tâches confiées et donne l'exemple",
  "Audacieux": "Ose les projets novateurs et accepte de prendre des risques",
  "Prudent": "Fiable dans ses décisions, pèse le pour et le contre",
  "Flexible": "S'adapte aux imprévus et au changement",
  "Rigide": "Stable, respecte scrupuleusement les demandes",
  "Réfléchi": "Anticipe les problématiques avant de démarrer",
  "Intuitif": "Passe vite à l'action sans se perdre dans la réflexion",
  "Disruptif": "Envisage des solutions innovantes, hors du cadre du projet",
  "Académique": "Mobilise efficacement son expérience et les ressources disponibles",
  "Constant": "Soutient un bon niveau de productivité sur le long terme",
  "Impulsif": "Réactif, à l'aise dans un fonctionnement agile",
  "Pragmatique": "Aborde tout sujet avec rationalité, même sans passion particulière",
  "Passionné": "Peut s'investir intensément dans un projet qui le passionne",
  "Minutieux": "Très attentif aux détails, cherche l'excellence",
  "Global": "Garde la vue d'ensemble d'un projet ou d'une situation",
  "Expansif": "Sait expliquer et défendre son point de vue",
  "Réservé": "Écoute avant de parler, discret dans ses prises de parole"
};

const VIGILANCE = {
  "Coopératif": "Peut chercher le consensus au détriment de la décision rapide",
  "Indépendant": "Peut privilégier son autonomie au détriment de l'interaction avec l'équipe",
  "Intellectuel": "Moins efficace sur des sujets très pratiques ou opérationnels",
  "Technique": "Moins à l'aise avec les concepts abstraits et les grands périmètres",
  "Meneur": "Peut avoir du mal à suivre les directives et tendre à imposer sa propre volonté",
  "Exécuteur": "Peut attendre les instructions plutôt que de prendre l'initiative",
  "Audacieux": "Parfois trop rapide dans la prise de décision, au risque de manquer de rationalité",
  "Prudent": "Peut tarder à décider et se montrer sensible au stress",
  "Flexible": "Peut faire évoluer le cadre du projet au fil des difficultés",
  "Rigide": "Peut persévérer, voire s'obstiner, face au changement",
  "Réfléchi": "Peut prendre beaucoup de temps de réflexion avant de commencer",
  "Intuitif": "Peut se lancer sans avoir anticipé les problèmes",
  "Disruptif": "Peut sortir du cadre imposé par le projet",
  "Académique": "Peut éprouver des difficultés face à des problématiques nouvelles",
  "Constant": "Moins à l'aise avec des changements fréquents de mission",
  "Impulsif": "Préfère changer de mission, voire d'entreprise : risque de rotation",
  "Pragmatique": "Sa motivation pour un sujet est moins visible, à vérifier",
  "Passionné": "Aura du mal à être productif sur un sujet qui ne l'intéresse pas",
  "Minutieux": "Risque de s'imposer des standards d'excellence difficiles à atteindre",
  "Global": "Porte peu d'attention aux détails",
  "Expansif": "Risque de noyer l'essentiel dans un discours détaillé",
  "Réservé": "Attend parfois qu'on lui demande son avis, parle peu"
};

const QUESTIONS_AXES = [
  "Racontez une situation où vous avez dû choisir entre travailler seul et en équipe pour tenir un délai. Qu'avez-vous préféré, et pourquoi ?",
  "Quand vous devez maîtriser un nouveau sujet, commencez-vous par la théorie ou par la pratique ? Donnez un exemple récent.",
  "Décrivez une situation où vous avez dû diriger une équipe, puis une autre où vous avez suivi les directives de quelqu'un d'autre.",
  "Quelle est la décision la plus risquée que vous ayez prise au travail ? Comment l'avez-vous sécurisée ?",
  "Comment réagissez-vous quand le plan d'un projet change en cours de route ? Donnez un exemple concret.",
  "Vous lancez-vous rapidement sur un sujet ou anticipez-vous tout avant de commencer ? Illustrez avec un projet.",
  "Racontez un problème inédit que vous avez résolu. Sur quelles ressources vous êtes-vous appuyé ?",
  "Préférez-vous un rythme de sprint ou de marathon ? Décrivez la période où vous avez été le plus efficace.",
  "Comment gardez-vous votre productivité sur un sujet qui ne vous passionne pas ?",
  "Comment arbitrez-vous entre perfection et délai ? Donnez un exemple où le compromis était difficile.",
  "Comment adaptez-vous votre niveau de détail selon votre interlocuteur ? Racontez une présentation qui a bien ou mal fonctionné."
];

const QUESTIONS_RIASEC = {
  R: "Quelle part de technique et de terrain souhaitez-vous dans votre quotidien ? Pour quelles raisons ?",
  I: "Quel type de problème analytique vous a le plus stimulé récemment ?",
  A: "Où avez-vous pu exprimer votre créativité dans votre travail ? Quel cadre vous est nécessaire pour cela ?",
  S: "Comment avez-vous accompagné, formé ou soutenu un collègue ? Qu'en avez-vous retiré ?",
  E: "Racontez une situation où vous avez convaincu d'autres personnes ou pris le lead sans y être obligé.",
  C: "Comment organisez-vous vos priorités ? Quelle place donnez-vous aux procédures et aux règles ?"
};

function axesSorted(c) { return AXES.map((p, i) => ({ i, v: c.axes[i], pole: poleWord(i, c.axes[i]), inten: Math.abs(c.axes[i] - 50) })).sort((a, b) => b.inten - a.inten); }
const niv2 = c => ["Excellent", "Bon"].includes(c.validite.niveau);

function rapport(c) {
  const cible = getCible(c.ref), adq = adequation(c, cible), p = pr(c);
  const ax = axesSorted(c);
  const top3 = Object.entries(c.riasec).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const aligned = i => cible.axes[i] == null || Math.abs(cible.axes[i] - c.axes[i]) <= 20;

  const forces = [];
  forces.push("Intérêts dominants : " + top3.map(e => RIASEC_LABELS[e[0]]).join(", ") + ". " + gend(DEF_RIASEC[top3[0][0]], p));
  ax.filter(a => a.inten >= 15 && aligned(a.i)).slice(0, 3).forEach(a => forces.push(FORCE[a.pole] + " (" + a.pole + ", " + DIMENSIONS_TITRES[a.i].toLowerCase() + ")."));
  adq.convergences.filter(it => it.kind === "crit").slice(0, 1).forEach(it => forces.push("Attentes alignées avec le poste sur « " + it.label + " » (candidat " + it.cand + ", poste " + it.target + ")."));

  const vig = [];
  adq.ecarts.filter(it => it.kind === "axes" && it.diff > 15 && it.cw !== it.tw).slice(0, 2).forEach(it => vig.push(VIGILANCE[it.cw] + " (" + it.cw + " ; le poste attend plutôt " + it.tw + ")."));
  adq.ecarts.filter(it => it.kind === "riasec" && it.diff > 15).slice(0, 1).forEach(it => vig.push("Intérêt « " + it.label + " » éloigné du profil cible (candidat " + it.cand + ", poste " + it.target + ")."));
  adq.ecarts.filter(it => it.kind === "crit" && it.diff > 15).slice(0, 1).forEach(it => vig.push("Attente « " + it.label + " » différente de ce que propose le poste (candidat " + it.cand + ", poste " + it.target + ")."));
  ax.filter(a => a.inten >= 25 && !vig.some(v => v.startsWith(VIGILANCE[a.pole]))).slice(0, 2 - Math.min(2, vig.length) + 1).forEach(a => vig.push(VIGILANCE[a.pole] + " (" + a.pole + " marqué)."));
  if (!niv2(c)) vig.unshift("Fiabilité des réponses : " + c.validite.niveau.toLowerCase() + " (indice d'incohérence " + c.validite.incoherence + "). Confirmer le profil à l'oral avant de s'y appuyer.");

  const A = i => c.axes[i], mng = [];
  mng.push(A(2) < 40 ? "Lui confier des responsabilités d'encadrement, tout en cadrant les limites de sa décision : " + p.il + " peut imposer sa volonté." : A(2) > 60 ? "Fixer des objectifs clairs et attendre une exécution rigoureuse ; l'encourager à prendre des initiatives." : "Style de leadership équilibré : " + p.il + " adapte son rôle selon les situations.");
  mng.push(A(0) < 40 ? "L'intégrer à une équipe et valoriser la synergie : " + p.il + " donne le meilleur " + p.de + " en collectif." : A(0) > 60 ? "Confier des périmètres autonomes et répartir les rôles à l'avance : " + p.il + " préfère l'indépendance." : "À l'aise seul comme en équipe, selon le besoin du projet.");
  mng.push(A(7) < 40 ? "Lui proposer des projets longs, étalés sur plusieurs années : " + p.il + " est un « marathonien »." : A(7) > 60 ? "Alterner les missions et garder un rythme soutenu : " + p.il + " est un « sprinter »." : "Rythme de travail modulable, sans préférence marquée entre sprint et marathon.");
  mng.push(A(10) < 40 ? "L'encourager aux synthèses courtes pour aller à l'essentiel." : A(10) > 60 ? "Solliciter explicitement son avis en réunion : " + p.il + " parle peu spontanément." : "Communication équilibrée, ni trop en retrait ni trop détaillée.");
  mng.push(A(4) < 40 ? "Prévenir des changements de cadrage : " + p.il + " s'y adapte bien." : A(4) > 60 ? "Annoncer les changements tôt et les expliquer : " + p.il + " a besoin de stabilité." : "Capacité d'adaptation moyenne : donner de la visibilité sans rigidité.");

  const mot = CRITERES.map((k, i) => ({ k, v: c.attentes[i] })).sort((a, b) => b.v - a.v).slice(0, 4);
  const motif = [];
  motif.push("Ses attentes les plus fortes : " + mot.map(m => m.k + " (" + m.v + ")").join(", ") + ".");
  mot.slice(0, 2).forEach(m => motif.push("« " + m.k + " » : " + DEF_CRITERES[m.k].replace(/\.$/, "").toLowerCase() + ". À valoriser dans la proposition de poste."));
  const gapMot = adq.items.crit.filter(it => Math.abs(it.cand - it.target) > 20).sort((a, b) => Math.abs(b.cand - b.target) - Math.abs(a.cand - a.target))[0];
  if (gapMot) motif.push("Point à vérifier : « " + gapMot.label + " » (candidat " + gapMot.cand + ", poste " + gapMot.target + "). Comprendre comment " + p.il + " l'envisage.");

  const resume = c.prenom + " " + c.nom + " présente un profil " + top3.map(e => RIASEC_LABELS[e[0]].toLowerCase()).join(", ") + " (" + top3.map(e => e[0]).join("") + "), avec une adéquation " + libelleAdq(adq.global).toLowerCase() + " au poste (" + adq.global + " %). " +
    (adq.convergences[0] ? "Point de convergence principal : " + adq.convergences[0].label.toLowerCase() + ". " : "") +
    (adq.ecarts[0] ? "Écart principal à explorer : " + adq.ecarts[0].label.toLowerCase() + "." : "");
  return { resume, forces, vig, mng, motif, adq, cible };
}

function guide(c) {
  const r = rapport(c), adq = r.adq, p = pr(c), qs = [];
  const add = (theme, q, why) => qs.push({ theme, q, why });
  if (!niv2(c)) add("Avant l'entretien", "Reprenez à l'oral 2 ou 3 réponses du test pour confirmer le profil.", "Fiabilité des réponses : " + c.validite.niveau.toLowerCase() + " (indice d'incohérence " + c.validite.incoherence + ").");
  add("Ouverture", "Racontez-moi le parcours qui vous amène au poste « " + c.poste + " ».", "Question d'ouverture, pour laisser " + p.cand + " se présenter avant d'entrer dans les détails du profil.");
  adq.ecarts.forEach(it => {
    if (it.kind === "axes") add("Écarts avec le poste", QUESTIONS_AXES[it.idx], "Style de travail (" + DIMENSIONS_TITRES[it.idx].toLowerCase() + ") : " + (it.cw === it.tw ? "candidat " + it.cand + ", poste " + it.target : "candidat plutôt " + it.cw + ", poste plutôt " + it.tw) + " (écart de " + it.diff + " points).");
    else if (it.kind === "riasec") add("Écarts avec le poste", QUESTIONS_RIASEC[RIA_ORDER.find(k => RIASEC_LABELS[k] === it.label)], "Intérêt " + it.label.toLowerCase() + " : candidat " + it.cand + ", poste " + it.target + ".");
    else add("Écarts avec le poste", "Vous accordez de l'importance à « " + it.label + " » (" + it.cand + "), alors que ce poste propose plutôt " + it.target + ". Comment voyez-vous cela ?", "Attente « " + it.label + " » : candidat " + it.cand + ", poste " + it.target + ".");
  });
  const used = new Set(adq.ecarts.filter(it => it.kind === "axes").map(it => it.idx));
  axesSorted(c).filter(a => a.inten >= 25 && !used.has(a.i)).slice(0, 2).forEach(a => add("Points de vigilance", QUESTIONS_AXES[a.i], "Trait marqué : " + a.pole + " (" + a.v + "/100). " + VIGILANCE[a.pole] + "."));
  CRITERES.map((k, i) => ({ k, v: c.attentes[i] })).sort((a, b) => b.v - a.v).slice(0, 2).forEach(m => add("Motivations", "Vous placez « " + m.k + " » parmi vos priorités. Que recouvre-t-il concrètement pour vous dans un poste ?", "Motivation forte : " + m.k + " (" + m.v + "/100). Définition TOPI : " + DEF_CRITERES[m.k].replace(/\.$/, "").toLowerCase() + "."));
  add("Clôture", "Qu'est-ce qui vous attire dans ce poste et chez NGen ? Quelles questions avez-vous pour nous ?", "Vérifier la motivation d'ensemble et laisser " + p.cand + " poser ses questions.");
  return qs;
}
