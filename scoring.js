// Profils cibles prédéfinis par poste. Chaque valeur va de 0 à 100. Une clé absente = "indifférent".
const RIA_ORDER = ["R", "I", "A", "S", "E", "C"];
const DIMENSIONS_TITRES = ["Travail en équipe", "Méthode de travail", "Style de leadership", "Prise de risque", "Adaptabilité", "Style de réflexion", "Approche des problématiques", "Régularité du travail", "Passion dans le travail", "Précision dans le travail", "Style de communication"];

const CIBLES_DEFAUT = {
  "NGE-ING-014": {
    riasec: { R: 80, I: 45, A: 20, S: 45, E: 70, C: 50 },
    axes: { 1: 70, 2: 20, 3: 45, 4: 35, 7: 30, 8: 30, 9: 40, 10: 25 },
    crit: { "Terrain": 85, "Responsabilités": 75, "Aspect collectif": 70, "Équilibre de vie": 40, "Emploi urbain": 30, "Activité technique": 60, "Communication": 55, "Impact stratégique": 55, "Stress": 65, "Flexibilité": 30 }
  },
  "NGE-ING-021": {
    riasec: { R: 65, I: 75, A: 35, S: 30, E: 30, C: 75 },
    axes: { 1: 45, 2: 55, 3: 65, 4: 55, 5: 25, 6: 60, 7: 30, 8: 35, 9: 20, 10: 55 },
    crit: { "Activité technique": 80, "Recherche": 65, "Équilibre de vie": 65, "Terrain": 45, "Responsabilités": 45, "Aspect collectif": 50, "Communication": 35, "Impact stratégique": 35, "Flexibilité": 55, "Stress": 40 }
  },
  "NGE-ING-027": {
    riasec: { R: 40, I: 60, A: 50, S: 75, E: 55, C: 55 },
    axes: { 0: 25, 2: 40, 3: 55, 4: 30, 5: 50, 8: 55, 9: 50, 10: 30 },
    crit: { "Apport à la société": 80, "Aspect collectif": 75, "Éthique": 75, "Communication": 70, "Responsabilités": 55, "Impact stratégique": 55, "Terrain": 55, "Équilibre de vie": 55, "Stress": 45, "Flexibilité": 55 }
  },
  "NGE-ING-033": {
    riasec: { R: 70, I: 80, A: 35, S: 30, E: 30, C: 60 },
    axes: { 0: 55, 1: 55, 2: 60, 3: 55, 4: 50, 5: 25, 6: 50, 9: 25, 10: 60 },
    crit: { "Activité technique": 85, "Recherche": 70, "Équilibre de vie": 60, "Terrain": 40, "Responsabilités": 45, "Communication": 35, "Dynamique marché": 60, "International": 45 }
  },
  "NGE-ING-036": {
    riasec: { R: 50, I: 60, A: 30, S: 60, E: 80, C: 55 },
    axes: { 0: 35, 2: 20, 3: 50, 4: 35, 5: 35, 7: 30, 9: 45, 10: 25 },
    crit: { "Responsabilités": 80, "Impact stratégique": 75, "Communication": 75, "Aspect collectif": 65, "Terrain": 50, "International": 50, "Salaire": 60, "Stress": 65, "Activité technique": 55 }
  }
};

const CIBLE_STORE = "topi-nge-cibles-v1";
const POIDS_DEFAUT = { riasec: 40, axes: 30, crit: 30 };
const SEVERITE = 5, TOLERANCE = 2.5;

const clone = o => JSON.parse(JSON.stringify(o));
function overrides() { try { return JSON.parse(localStorage.getItem(CIBLE_STORE) || "{}"); } catch (e) { return {}; } }
function normCible(c) {
  c.poids = Object.assign({}, POIDS_DEFAUT, c.poids || {});
  c.actifs = Object.assign({ riasec: true, axes: true, crit: true }, c.actifs || {});
  return c;
}
function getCible(ref) { const o = overrides(); return normCible(clone(o[ref] || CIBLES_DEFAUT[ref])); }
function poidsEffectifs(cible) {
  const act = ["riasec", "axes", "crit"].filter(k => cible.actifs[k]);
  const tot = act.reduce((s, k) => s + cible.poids[k], 0) || 1;
  const out = { riasec: 0, axes: 0, crit: 0 };
  act.forEach(k => out[k] = Math.round(cible.poids[k] / tot * 100));
  return out;
}
function saveCible(ref, cible) { const o = overrides(); o[ref] = cible; try { localStorage.setItem(CIBLE_STORE, JSON.stringify(o)); } catch (e) {} }
function resetCible(ref) { const o = overrides(); delete o[ref]; try { localStorage.setItem(CIBLE_STORE, JSON.stringify(o)); } catch (e) {} }
function isModified(ref) { return !!overrides()[ref]; }

function poleWord(i, v) { return v < 50 ? AXES[i][0] : AXES[i][1]; }

function adequation(c, cible) {
  const items = { riasec: [], axes: [], crit: [] };
  RIA_ORDER.forEach(k => { if (cible.riasec[k] != null) items.riasec.push({ label: RIASEC_LABELS[k], cand: c.riasec[k], target: cible.riasec[k], kind: "riasec" }); });
  Object.entries(cible.axes || {}).forEach(([i, t]) => items.axes.push({ label: DIMENSIONS_TITRES[i], cand: c.axes[i], target: t, kind: "axes", idx: +i, cw: poleWord(+i, c.axes[i]), tw: poleWord(+i, t) }));
  Object.entries(cible.crit || {}).forEach(([k, t]) => { const i = CRITERES.indexOf(k); if (i >= 0) items.crit.push({ label: k, cand: c.attentes[i], target: t, kind: "crit" }); });
  const bloc = arr => arr.length ? Math.max(0, Math.round(100 - SEVERITE * Math.max(0, arr.reduce((s, p) => s + Math.abs(p.cand - p.target), 0) / arr.length - TOLERANCE))) : null;
  const cb = normCible(cible);
  const scores = {};
  ["riasec", "axes", "crit"].forEach(k => scores[k] = cb.actifs[k] ? bloc(items[k]) : null);
  let num = 0, den = 0;
  Object.keys(scores).forEach(k => { if (scores[k] != null) { num += cb.poids[k] * scores[k]; den += cb.poids[k]; } });
  const poids = {};
  Object.keys(scores).forEach(k => poids[k] = scores[k] == null || !den ? 0 : Math.round(cb.poids[k] / den * 100));
  const all = [...(scores.riasec != null ? items.riasec : []), ...(scores.axes != null ? items.axes : []), ...(scores.crit != null ? items.crit : [])].map(p => ({ ...p, diff: Math.abs(p.cand - p.target) }));
  const sorted = all.slice().sort((a, b) => a.diff - b.diff);
  return { global: den ? Math.round(num / den) : 0, scores, poids, items, convergences: sorted.slice(0, 3), ecarts: sorted.slice(-3).reverse() };
}

function niveauAdq(p) { return p >= 75 ? "high" : p >= 60 ? "mid" : "low"; }
function libelleAdq(p) { return p >= 75 ? "Forte" : p >= 60 ? "Moyenne" : "Faible"; }
function adqCandidat(c) { return adequation(c, getCible(c.ref)); }
