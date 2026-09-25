const CRITERES = ["Salaire", "Équilibre de vie", "Emploi urbain", "Terrain", "Responsabilités", "Aspect collectif", "International", "Flexibilité", "Activité technique", "Stress", "Rémunération/h", "Apport à la société", "Communication", "Impact stratégique", "Liberté géographique", "Taille d'entreprise", "Recherche", "Éthique", "Dynamique marché", "Présence de cadres"];

const AXES = [
  ["Coopératif", "Indépendant"], ["Intellectuel", "Technique"], ["Meneur", "Exécuteur"],
  ["Audacieux", "Prudent"], ["Flexible", "Rigide"], ["Réfléchi", "Intuitif"],
  ["Disruptif", "Académique"], ["Constant", "Impulsif"], ["Pragmatique", "Passionné"],
  ["Minutieux", "Global"], ["Expansif", "Réservé"]
];

const RIASEC_LABELS = { R: "Réaliste", I: "Investigateur", A: "Artistique", S: "Social", E: "Entreprenant", C: "Conventionnel" };

const CANDIDATS = [
  {
    id: "c1", ref: "NGE-ING-014", poste: "Ingénieur travaux", nom: "Renaud", prenom: "Camille",
    email: "camille.renaud@example.com", cv: "cv/CV_Camille_Renaud.pdf",
    parcours: "Arts et Métiers, promo 2021", age: 27, date_passage: "2026-09-09", candidature: "2026-09-10",
    validite: { niveau: "Bon", incoherence: 4 },
    riasec: { R: 88, I: 55, A: 22, S: 48, E: 72, C: 50 },
    axes: [35, 72, 18, 30, 40, 45, 50, 30, 25, 42, 22],
    attentes: [58, 42, 30, 88, 82, 76, 34, 38, 55, 48, 46, 52, 50, 61, 40, 64, 28, 45, 66, 44]
  },
  {
    id: "c2", ref: "NGE-ING-021", poste: "Ingénieur méthodes", nom: "Benali", prenom: "Yanis",
    email: "yanis.benali@example.com", cv: "cv/CV_Yanis_Benali.pdf",
    parcours: "École Centrale de Lille, promo 2025", age: 24, date_passage: "2026-09-11", candidature: "2026-09-12",
    validite: { niveau: "Convenable", incoherence: 7 },
    riasec: { R: 62, I: 84, A: 40, S: 30, E: 35, C: 74 },
    axes: [45, 38, 62, 68, 58, 22, 64, 25, 40, 20, 66],
    attentes: [52, 68, 60, 41, 40, 45, 55, 49, 86, 38, 55, 58, 27, 35, 50, 60, 71, 60, 62, 56]
  },
  {
    id: "c3", ref: "NGE-ING-027", poste: "Ingénieur QSE et environnement", nom: "Fontaine", prenom: "Léa",
    email: "lea.fontaine@example.com", cv: "cv/CV_Lea_Fontaine.pdf",
    parcours: "ENTPE, promo 2018", age: 31, date_passage: "2026-09-14", candidature: "2026-09-15",
    validite: { niveau: "Bon", incoherence: 3 },
    riasec: { R: 45, I: 58, A: 66, S: 80, E: 62, C: 30 },
    axes: [20, 44, 30, 42, 20, 62, 28, 55, 66, 70, 25],
    attentes: [44, 62, 48, 55, 58, 84, 46, 66, 40, 39, 42, 90, 72, 58, 52, 50, 45, 79, 54, 60]
  },
  {"id": "c4", "ref": "NGE-ING-033", "poste": "Ingénieur études électriques", "nom": "Moreau", "prenom": "Hugo", "email": "hugo.moreau@example.com", "cv": "cv/CV_Hugo_Moreau.pdf", "parcours": "CentraleSupélec, promo 2022", "age": 26, "date_passage": "2026-09-15", "candidature": "2026-09-16", "validite": {"niveau": "Convenable", "incoherence": 5}, "riasec": {"R": 70, "I": 82, "A": 30, "S": 28, "E": 38, "C": 64}, "axes": [78, 41, 45, 55, 66, 31, 51, 40, 36, 13, 31], "attentes": [50, 41, 36, 77, 58, 49, 46, 51, 90, 52, 48, 47, 37, 35, 46, 47, 78, 42, 50, 50]},
  {"id": "c5", "ref": "NGE-ING-036", "poste": "Chef de projet ferroviaire", "nom": "Diallo", "prenom": "Aminata", "email": "aminata.diallo@example.com", "cv": "cv/CV_Aminata_Diallo.pdf", "parcours": "INSA Lyon, promo 2019", "age": 29, "date_passage": "2026-09-07", "candidature": "2026-09-08", "validite": {"niveau": "Bon", "incoherence": 2}, "riasec": {"R": 50, "I": 58, "A": 35, "S": 66, "E": 80, "C": 48}, "axes": [43, 38, 14, 56, 56, 42, 48, 25, 50, 39, 14], "attentes": [76, 35, 50, 58, 77, 67, 42, 46, 62, 59, 50, 54, 89, 83, 62, 44, 61, 55, 64, 48]},
  {"id": "c6", "ref": "NGE-ING-021", "poste": "Ingénieur méthodes", "nom": "Lambert", "prenom": "Thomas", "email": "thomas.lambert@example.com", "cv": "cv/CV_Thomas_Lambert.pdf", "parcours": "Mines Nancy, promo 2024", "age": 25, "date_passage": "2026-09-17", "candidature": "2026-09-18", "validite": {"niveau": "Bon", "incoherence": 6}, "riasec": {"R": 66, "I": 72, "A": 25, "S": 34, "E": 30, "C": 86}, "axes": [68, 38, 60, 62, 59, 25, 45, 45, 52, 6, 30], "attentes": [67, 54, 41, 70, 47, 50, 52, 40, 77, 50, 37, 39, 35, 32, 38, 57, 65, 43, 45, 50]},
  {"id": "c7", "ref": "NGE-ING-027", "poste": "Ingénieur QSE et environnement", "nom": "Nguyen", "prenom": "Clara", "email": "clara.nguyen@example.com", "cv": "cv/CV_Clara_Nguyen.pdf", "parcours": "UTC Compiègne, promo 2020", "age": 28, "date_passage": "2026-09-10", "candidature": "2026-09-11", "validite": {"niveau": "Convenable", "incoherence": 6}, "riasec": {"R": 40, "I": 68, "A": 32, "S": 76, "E": 44, "C": 70}, "axes": [43, 38, 54, 51, 49, 33, 36, 14, 65, 35, 35], "attentes": [59, 44, 55, 41, 64, 79, 52, 44, 68, 42, 46, 62, 77, 62, 60, 52, 68, 57, 65, 59]},
  {"id": "c8", "ref": "NGE-ING-014", "poste": "Ingénieur travaux", "nom": "Petit", "prenom": "Maxime", "email": "maxime.petit@example.com", "cv": "cv/CV_Maxime_Petit.pdf", "parcours": "Arts et Métiers, promo 2018", "age": 30, "date_passage": "2026-09-13", "candidature": "2026-09-14", "validite": {"niveau": "Bon", "incoherence": 8}, "riasec": {"R": 84, "I": 46, "A": 20, "S": 40, "E": 74, "C": 62}, "axes": [48, 65, 31, 43, 49, 48, 57, 33, 44, 24, 32], "attentes": [55, 46, 35, 81, 71, 48, 30, 57, 74, 40, 40, 53, 77, 64, 55, 50, 41, 57, 43, 60]},
  {"id": "c9", "ref": "NGE-ING-036", "poste": "Chef de projet ferroviaire", "nom": "Haddad", "prenom": "Sofia", "email": "sofia.haddad@example.com", "cv": "cv/CV_Sofia_Haddad.pdf", "parcours": "École des Ponts, promo 2021", "age": 27, "date_passage": "2026-09-19", "candidature": "2026-09-20", "validite": {"niveau": "Convenable", "incoherence": 2}, "riasec": {"R": 42, "I": 70, "A": 38, "S": 52, "E": 78, "C": 60}, "axes": [50, 46, 20, 64, 55, 45, 40, 43, 47, 40, 18], "attentes": [64, 54, 41, 48, 82, 51, 54, 41, 63, 54, 37, 65, 75, 70, 50, 55, 76, 39, 57, 45]},
  {"id": "c10", "ref": "NGE-ING-033", "poste": "Ingénieur études électriques", "nom": "Garnier", "prenom": "Julien", "email": "julien.garnier@example.com", "cv": "cv/CV_Julien_Garnier.pdf", "parcours": "ISAE-Supméca, promo 2016", "age": 32, "date_passage": "2026-09-08", "candidature": "2026-09-09", "validite": {"niveau": "Mauvais", "incoherence": 13}, "riasec": {"R": 76, "I": 78, "A": 62, "S": 30, "E": 40, "C": 44}, "axes": [59, 64, 57, 50, 59, 54, 24, 20, 62, 39, 32], "attentes": [54, 62, 38, 83, 54, 42, 43, 62, 80, 42, 56, 46, 56, 57, 53, 61, 66, 50, 49, 60]},
  {"id": "c11", "ref": "NGE-ING-021", "poste": "Ingénieur méthodes", "nom": "Rousseau", "prenom": "Inès", "email": "ines.rousseau@example.com", "cv": "cv/CV_Ines_Rousseau.pdf", "parcours": "Grenoble INP - Phelma, promo 2025", "age": 24, "date_passage": "2026-09-18", "candidature": "2026-09-19", "validite": {"niveau": "Convenable", "incoherence": 2}, "riasec": {"R": 48, "I": 80, "A": 68, "S": 42, "E": 34, "C": 66}, "axes": [62, 38, 39, 56, 47, 39, 36, 32, 48, 27, 30], "attentes": [49, 61, 39, 57, 44, 49, 48, 47, 65, 41, 41, 59, 53, 45, 56, 61, 87, 57, 67, 43]},
  {"id": "c12", "ref": "NGE-ING-014", "poste": "Ingénieur travaux", "nom": "Blanc", "prenom": "Antoine", "email": "antoine.blanc@example.com", "cv": "cv/CV_Antoine_Blanc.pdf", "parcours": "ENTPE, promo 2013", "age": 35, "date_passage": "2026-09-14", "candidature": "2026-09-15", "validite": {"niveau": "Convenable", "incoherence": 2}, "riasec": {"R": 72, "I": 44, "A": 18, "S": 58, "E": 86, "C": 52}, "axes": [53, 62, 11, 40, 53, 41, 37, 34, 52, 26, 14], "attentes": [67, 44, 51, 60, 89, 63, 28, 45, 68, 54, 51, 70, 75, 89, 59, 58, 52, 58, 54, 53]}
];
