// ═══════════════════════════════════════════════════════════
//  INTERNATIONALIZATION (i18n) – English / Deutsch
// ═══════════════════════════════════════════════════════════
let currentLang = localStorage.getItem("pyforge_lang") || "en";

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("pyforge_lang", lang);
  document.documentElement.lang = lang;
  updateStaticUI();
  if (typeof renderAll === "function") renderAll();
}

function t(key) {
  return (UI_STRINGS[key] && UI_STRINGS[key][currentLang]) || UI_STRINGS[key]?.en || key;
}

function tLevel(level) {
  if (currentLang === "de" && level.title_de) return level.title_de;
  return level.title;
}

function tLevelDesc(level) {
  if (currentLang === "de" && level.desc_de) return level.desc_de;
  return level.desc;
}

function tChTitle(ch) {
  if (currentLang === "de" && ch.title_de) return ch.title_de;
  return ch.title;
}

function tChInstructions(ch) {
  if (currentLang === "de" && ch.instructions_de) return ch.instructions_de;
  return ch.instructions;
}

function tChHints(ch) {
  if (currentLang === "de" && ch.hints_de) return ch.hints_de;
  return ch.hints;
}

function tChStarter(ch) {
  if (currentLang === "de" && ch.starter_de) return ch.starter_de;
  return ch.starter;
}

// Update static HTML elements that don't go through renderAll
function updateStaticUI() {
  const langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.textContent = currentLang === "de" ? "DE | en" : "en | DE";
  document.title = currentLang === "de" ? "PyWinkelix - Python lernen" : "PyWinkelix - Learn Python";
}

// ─── UI Strings ───
const UI_STRINGS = {
  // Welcome modal
  welcomeTitle:        { en: "Welcome to PyWinkelix",  de: "Willkommen bei PyWinkelix" },
  welcomeText:         { en: "Learn Python step by step through 12 levels of gaming-themed challenges.",
                         de: "Lerne Python Schritt für Schritt durch 12 Level mit spielerischen Aufgaben." },
  welcomeSubtext:      { en: "Built-in Python interpreter · No setup required · Progress saves automatically",
                         de: "Eingebauter Python-Interpreter · Keine Installation nötig · Fortschritt wird automatisch gespeichert" },
  btnStart:            { en: "Start Learning",  de: "Loslegen" },
  btnContinue:         { en: "Continue",  de: "Fortsetzen" },
  btnResetProgress:    { en: "Reset Progress",  de: "Fortschritt zurücksetzen" },

  // Header
  level:               { en: "Level",  de: "Level" },

  // Card headers
  lesson:              { en: "Lesson",  de: "Lektion" },
  pythonEditor:        { en: "Python Editor",  de: "Python-Editor" },
  progress:            { en: "Progress",  de: "Fortschritt" },

  // Challenge
  challenge:           { en: "Challenge",  de: "Aufgabe" },

  // Editor
  outputPlaceholder:   { en: "Output will appear here...",  de: "Ausgabe erscheint hier..." },
  btnRun:              { en: "▶ Run",  de: "▶ Ausführen" },
  btnCheck:            { en: "✓ Check",  de: "✓ Prüfen" },
  btnDownload:         { en: "⭳ Download .py",  de: "⭳ Download .py" },
  btnResetCode:        { en: "↻ Reset Code",  de: "↻ Code zurücksetzen" },

  // Lesson nav
  btnPrev:             { en: "« Previous",  de: "« Zurück" },
  btnNext:             { en: "Next »",  de: "Weiter »" },

  // Quick Reference
  quickRef:            { en: "📖 Quick Reference",  de: "📖 Kurzreferenz" },

  // Hints
  hint:                { en: "Hint",  de: "Hinweis" },
  challengeComplete:   { en: "Challenge Complete!",  de: "Aufgabe abgeschlossen!" },

  // Status
  running:             { en: "Running...",  de: "Wird ausgeführt..." },
  checking:            { en: "Checking...",  de: "Wird geprüft..." },
  noOutput:            { en: "(No output)",  de: "(Keine Ausgabe)" },

  // Progress panel
  levels:              { en: "Levels",  de: "Level" },
  achievements:        { en: "Achievements",  de: "Erfolge" },

  // Confirm
  confirmReset:        { en: "Reset all progress?",  de: "Gesamten Fortschritt zurücksetzen?" },

  // Teacher mode
  teacherMode:         { en: "Teacher Mode",  de: "Lehrer-Modus" },
  teacherPwPrompt:     { en: "Enter password to unlock",  de: "Passwort eingeben zum Entsperren" },
  teacherPwError:      { en: "Incorrect password.",  de: "Falsches Passwort." },
  solution:            { en: "Solution",  de: "Lösung" },
  overview:            { en: "Overview",  de: "Übersicht" },
  didactics:           { en: "Didactics",  de: "Didaktik" },
  notes:               { en: "Notes",  de: "Notizen" },
  exit:                { en: "Exit",  de: "Beenden" },
  solutionFor:         { en: "Solution: Challenge",  de: "Lösung: Aufgabe" },
  allHints:            { en: "All Hints",  de: "Alle Hinweise" },
  validationLogic:     { en: "Validation Logic",  de: "Validierungslogik" },
  loadSolution:        { en: "📋 Load solution into editor",  de: "📋 Lösung in Editor laden" },
  runSolution:         { en: "▶ Run solution",  de: "▶ Lösung ausführen" },
  allChallengesOverview:{ en: "All Challenges Overview",  de: "Übersicht aller Aufgaben" },
  challengeCol:        { en: "Challenge",  de: "Aufgabe" },
  status:              { en: "Status",  de: "Status" },
  statistics:          { en: "Statistics",  de: "Statistiken" },
  challengesCompleted: { en: "Challenges completed",  de: "Aufgaben abgeschlossen" },
  xpEarned:            { en: "XP earned",  de: "XP verdient" },
  hintsUsed:           { en: "Hints used",  de: "Hinweise verwendet" },
  errorsEncountered:   { en: "Errors encountered",  de: "Fehler aufgetreten" },
  hintFreeCompletions: { en: "Hint-free completions",  de: "Ohne Hinweise gelöst" },
  didacticNotes:       { en: "Didactic Notes for Current Challenge",  de: "Didaktische Hinweise zur aktuellen Aufgabe" },
  commonMistakes:      { en: "Common Mistakes & Misconceptions",  de: "Häufige Fehler & Missverständnisse" },
  differentiationIdeas:{ en: "Differentiation Ideas",  de: "Differenzierungsideen" },
  yourNotes:           { en: "Your Notes (saved in browser)",  de: "Deine Notizen (im Browser gespeichert)" },
  notesPlaceholder:    { en: "Write your notes here... (auto-saved)",  de: "Schreibe deine Notizen hier... (automatisch gespeichert)" },
  noNotes:             { en: "No specific notes for this level.",  de: "Keine spezifischen Hinweise für dieses Level." },
  noErrors:            { en: "No common errors documented.",  de: "Keine häufigen Fehler dokumentiert." },
  noDifferentiation:   { en: "No differentiation ideas documented.",  de: "Keine Differenzierungsideen dokumentiert." },
  noSolution:          { en: "(No solution available)",  de: "(Keine Lösung verfügbar)" },
  noHints:             { en: "(No hints)",  de: "(Keine Hinweise)" },

  // Footer
  footer:              { en: "PyWinkelix · Dr. Winkelmann · Python Learning Game",
                         de: "PyWinkelix · Dr. Winkelmann · Python-Lernspiel" },

  // Reference headings (non-code parts)
  refPrint:            { en: "display output",  de: "Ausgabe anzeigen" },
  refFstringFmt:       { en: "f-string formatting",  de: "f-String-Formatierung" },
  refConditionals:     { en: "Conditionals",  de: "Bedingungen" },
  refLoops:            { en: "Loops",  de: "Schleifen" },
  refFunctions:        { en: "Functions",  de: "Funktionen" },
  refLists:            { en: "Lists",  de: "Listen" },
  refDicts:            { en: "Dicts",  de: "Dicts" },
  refStrings:          { en: "Strings",  de: "Strings" },
  refClasses:          { en: "Classes",  de: "Klassen" },
  refInheritance:      { en: "Inheritance",  de: "Vererbung" },
  ref2DLists:          { en: "2D Lists",  de: "2D-Listen" },
  refAdvanced:         { en: "Advanced",  de: "Fortgeschritten" },
  refEverything:       { en: "Everything!",  de: "Alles!" },
  refKnowItAll:        { en: "You know it all now. Check previous levels for reference.",
                         de: "Du kannst jetzt alles. Schau in vorherige Level für Referenzen." },
  refAccess:           { en: "access",  de: "Zugriff" },
  refOverrideMethods:  { en: "Override methods",  de: "Methoden überschreiben" },
  refSlicing:          { en: "slicing",  de: "Slicing" },
};
