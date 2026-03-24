// ═══════════════════════════════════════════════════════════
//  GAME STATE
// ═══════════════════════════════════════════════════════════
const SAVE_KEY = "pyforge_save";
let state = {
  currentLevel: 0,
  currentChallenge: 0,
  completed: [],
  xp: 0,
  unlockedAchievements: [],
  hintFreeCount: 0,
  errorFixCount: 0,
  hintsUsed: {},
  errorsSeen: 0,
};

function saveState() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch(e) {}
}
function loadState() {
  try {
    const s = localStorage.getItem(SAVE_KEY);
    if (s) { state = {...state, ...JSON.parse(s)}; return true; }
  } catch(e) {}
  return false;
}
function resetState() {
  state = { currentLevel:0, currentChallenge:0, completed:[], xp:0, unlockedAchievements:[], hintFreeCount:0, errorFixCount:0, hintsUsed:{}, errorsSeen:0 };
  saveState();
}

// ═══════════════════════════════════════════════════════════
//  UI RENDERING
// ═══════════════════════════════════════════════════════════
const $ = id => document.getElementById(id);

function getCurrentChallenge() {
  return LEVELS[state.currentLevel]?.challenges[state.currentChallenge];
}

function renderAll() {
  renderHeader();
  renderLesson();
  renderProgress();
  if (teacherMode) renderTeacherPanel();
}

function renderHeader() {
  const level = LEVELS[state.currentLevel];
  $("levelPill").textContent = `${t("level")} ${level.id}: ${tLevel(level)}`;
  const totalXp = state.xp;
  const levelXp = level.id * 100;
  const prevLevelXp = (level.id - 1) * 100;
  const progress = Math.min(100, ((totalXp - prevLevelXp) / (levelXp - prevLevelXp)) * 100);
  $("xpBar").style.width = Math.max(0, progress) + "%";
  $("xpLabel").textContent = `XP: ${totalXp}`;

  // Update static UI labels
  $("hdrLesson").textContent = t("lesson");
  $("hdrEditor").innerHTML = `\u{1f4bb} ${t("pythonEditor")}`;
  $("hdrProgress").textContent = t("progress");
  $("hdrLevels").textContent = t("levels");
  $("hdrAchievements").textContent = t("achievements");
  $("btnRun").innerHTML = t("btnRun");
  $("btnCheck").innerHTML = t("btnCheck");
  $("btnDownload").innerHTML = t("btnDownload");
  $("btnResetCode").innerHTML = t("btnResetCode");
  $("btnPrev").innerHTML = t("btnPrev");
  $("btnNext").innerHTML = t("btnNext");
  $("refToggle").innerHTML = t("quickRef");
  $("footerText").innerHTML = t("footer");

  // Welcome modal
  $("welcomeTitle").textContent = t("welcomeTitle");
  $("welcomeText").textContent = t("welcomeText");
  $("welcomeSubtext").textContent = t("welcomeSubtext");
  $("btnStart").textContent = t("btnStart");
  $("btnContinue").textContent = t("btnContinue");
  $("btnReset2").textContent = t("btnResetProgress");

  // Teacher panel static labels
  $("teacherPwTitle").textContent = t("teacherMode");
  $("teacherPwPrompt").textContent = t("teacherPwPrompt");
  $("hdrTeacher").innerHTML = `\u{1f9d1}\u200d\u{1f3eb} ${t("teacherMode")}`;
  $("tBtnSolution").textContent = t("solution");
  $("tBtnOverview").textContent = t("overview");
  $("tBtnDidactics").textContent = t("didactics");
  $("tBtnNotes").textContent = t("notes");
  $("tBtnExit").innerHTML = `\u2716 ${t("exit")}`;
  $("tAllHintsTitle").textContent = t("allHints");
  $("tValidationTitle").textContent = t("validationLogic");
  $("tLoadSolution").innerHTML = t("loadSolution");
  $("tRunSolution").innerHTML = t("runSolution");
  $("tOverviewTitle").textContent = t("allChallengesOverview");
  $("tThChallenge").textContent = t("challengeCol");
  $("tThStatus").textContent = t("status");
  $("tStatsTitle").textContent = t("statistics");
  $("tDidacticTitle").textContent = t("didacticNotes");
  $("tCommonErrorsTitle").textContent = t("commonMistakes");
  $("tDiffTitle").textContent = t("differentiationIdeas");
  $("tNotesTitle").textContent = t("yourNotes");
  $("tNotesArea").placeholder = t("notesPlaceholder");
}

function renderLesson() {
  const ch = getCurrentChallenge();
  if (!ch) return;
  $("chTitle").textContent = `${t("challenge")} ${ch.id}: ${tChTitle(ch)}`;
  $("chSubtitle").textContent = `${tLevel(LEVELS[state.currentLevel])} \u2022 ${ch.xp} XP`;
  $("chInstructions").innerHTML = tChInstructions(ch);

  // Hints
  const hintArea = $("hintArea");
  const usedHints = state.hintsUsed[ch.id] || 0;
  const hints = tChHints(ch);
  let hintHTML = "";
  if (hints && hints.length > 0) {
    for (let i = 0; i < Math.min(usedHints, hints.length); i++) {
      hintHTML += `<div class="hint-item">\u{1f4a1} ${hints[i]}</div>`;
    }
    if (usedHints < hints.length) {
      hintHTML += `<button class="hint-btn" onclick="revealHint()">\u{1f4a1} ${t("hint")} ${usedHints + 1}/${hints.length}</button>`;
    }
  }
  if (state.completed.includes(ch.id)) {
    hintHTML += `<div class="complete-banner">\u2705 ${t("challengeComplete")}</div>`;
  }
  hintArea.innerHTML = hintHTML;

  // Code
  if (!$("codeArea").dataset.loaded || $("codeArea").dataset.loaded !== ch.id) {
    $("codeArea").value = tChStarter(ch);
    $("codeArea").dataset.loaded = ch.id;
  }

  // Nav
  const isFirst = state.currentLevel === 0 && state.currentChallenge === 0;
  const isLast = state.currentLevel === LEVELS.length - 1 && state.currentChallenge === LEVELS[LEVELS.length-1].challenges.length - 1;
  $("btnPrev").disabled = isFirst;
  $("btnNext").disabled = isLast;

  // Reference
  renderReference();
}

function renderReference() {
  const lvl = state.currentLevel;
  const refs = [
    `<h4>print()</h4><code>print("text")</code> — ${t("refPrint")}<br><code>print(f"Value: {x}")</code> — ${t("refFstringFmt")}`,
    `<h4>${t("refConditionals")}</h4><code>if x &gt; 0:</code> / <code>elif:</code> / <code>else:</code><br>Operators: <code>== != &lt; &gt; &lt;= &gt;= and or not</code>`,
    `<h4>${t("refLoops")}</h4><code>for i in range(n):</code><br><code>while condition:</code><br><code>break</code> / <code>continue</code>`,
    `<h4>${t("refFunctions")}</h4><code>def name(param=default):</code><br><code>return value</code>`,
    `<h4>${t("refLists")}</h4><code>lst = [1, 2, 3]</code><br><code>.append() .remove() .sort()</code><br><code>lst[0:3]</code> — ${t("refSlicing")}`,
    `<h4>${t("refDicts")}</h4><code>d = {"key": "val"}</code><br><code>d["key"]</code> ${t("refAccess")}<br><code>for k, v in d.items():</code>`,
    `<h4>${t("refStrings")}</h4><code>.split() .strip() .lower() .upper()</code><br><code>.startswith() .replace()</code><br><code>ord() chr()</code>`,
    `<h4>${t("refClasses")}</h4><code>class Name:</code><br><code>def __init__(self):</code><br><code>def __str__(self):</code>`,
    `<h4>${t("refInheritance")}</h4><code>class Child(Parent):</code><br><code>super().__init__()</code><br>${t("refOverrideMethods")}`,
    `<h4>${t("ref2DLists")}</h4><code>grid[row][col]</code><br><code>[[val]*cols for _ in range(rows)]</code>`,
    `<h4>${t("refAdvanced")}</h4><code>[x for x in lst if cond]</code><br><code>try: except:</code><br><code>lambda x: x*2</code>`,
    `<h4>${t("refEverything")}</h4>${t("refKnowItAll")}`,
  ];
  $("refContent").innerHTML = refs.slice(0, lvl + 1).join("<br>");
}

function renderProgress() {
  // Level list
  let html = "";
  LEVELS.forEach((level, li) => {
    const challenges = level.challenges;
    const doneCount = challenges.filter(c => state.completed.includes(c.id)).length;
    const allDone = doneCount === challenges.length;
    const isCurrent = li === state.currentLevel;
    const dotClass = allDone ? "done" : isCurrent ? "current" : "";
    const itemClass = isCurrent ? "active" : "";

    html += `<li class="level-item ${itemClass}" onclick="goToLevel(${li})">
      <span class="level-dot ${dotClass}"></span>
      <span style="flex:1">${level.id}. ${tLevel(level)}</span>
      <span style="font-size:11px;color:var(--muted)">${doneCount}/${challenges.length}</span>
    </li>`;

    if (isCurrent) {
      html += '<ul class="challenge-list">';
      challenges.forEach((ch, ci) => {
        const done = state.completed.includes(ch.id);
        const active = ci === state.currentChallenge;
        html += `<li class="ch-item ${done ? 'done' : ''} ${active ? 'active-ch' : ''}" onclick="goToChallenge(${li},${ci})">
          <span class="ch-icon">${done ? '\u2713' : active ? '\u25cf' : '\u25cb'}</span>
          ${ch.id} ${tChTitle(ch)}
        </li>`;
      });
      html += '</ul>';
    }
  });
  $("levelList").innerHTML = html;

  // Achievements
  let achHTML = "";
  ACHIEVEMENTS.forEach(ach => {
    const unlocked = state.unlockedAchievements.includes(ach.id);
    const achDE = (currentLang === "de" && typeof ACHIEVEMENTS_DE !== "undefined") ? ACHIEVEMENTS_DE[ach.id] : null;
    const achName = achDE ? achDE.name : ach.name;
    const achDesc = achDE ? achDE.desc : ach.desc;
    achHTML += `<div class="achievement ${unlocked ? 'unlocked' : ''}">
      <span class="ach-icon">${unlocked ? ach.icon : '\u{1f512}'}</span>
      <div class="ach-info">
        <div class="ach-name">${achName}</div>
        <div class="ach-desc">${achDesc}</div>
      </div>
    </div>`;
  });
  $("achievementList").innerHTML = achHTML;
}

// ═══════════════════════════════════════════════════════════
//  PYTHON EXECUTION
// ═══════════════════════════════════════════════════════════
let skulptReady = typeof Sk !== "undefined";
let inputQueue = [];

function runPython(code, isCheck) {
  return new Promise((resolve, reject) => {
    if (!skulptReady) {
      reject(new Error("Python interpreter is still loading. Please wait a moment and try again."));
      return;
    }
    let output = "";
    inputQueue = [];

    Sk.configure({
      output: function(text) { output += text; },
      read: function(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
          throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
      },
      inputfun: function(prompt) {
        if (inputQueue.length > 0) return inputQueue.shift();
        const val = window.prompt(prompt || "Input:");
        return val === null ? "" : val;
      },
      inputfunTakesPrompt: true,
      __future__: Sk.python3,
      execLimit: 10000,
    });

    Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, code, true);
    }).then(function() {
      resolve(output);
    }).catch(function(err) {
      reject(err);
    });
  });
}

// ═══════════════════════════════════════════════════════════
//  ACTIONS
// ═══════════════════════════════════════════════════════════
async function handleRun() {
  const code = $("codeArea").value;
  const outEl = $("outputArea");
  outEl.innerHTML = `<span class="info">${t("running")}</span>`;
  try {
    const output = await runPython(code, false);
    outEl.innerHTML = escapeHTML(output) || `<span class="info">${t("noOutput")}</span>`;
  } catch(err) {
    outEl.innerHTML = `<span class="err">${escapeHTML(String(err))}</span>`;
    state.errorsSeen++;
  }
}

async function handleCheck() {
  const ch = getCurrentChallenge();
  if (!ch) return;
  const code = $("codeArea").value;
  const outEl = $("outputArea");
  outEl.innerHTML = `<span class="info">${t("checking")}</span>`;

  try {
    const output = await runPython(code, true);
    const result = ch.check(output);

    if (result.pass) {
      outEl.innerHTML = escapeHTML(output) + `\n\n<span class="ok">\u2705 ${escapeHTML(result.msg)}</span>`;
      completeChallenge(ch);
    } else {
      outEl.innerHTML = escapeHTML(output) + `\n\n<span class="err">\u274c ${escapeHTML(result.msg)}</span>`;
      if (state.errorsSeen > 0) state.errorFixCount++;
      state.errorsSeen++;
    }
  } catch(err) {
    outEl.innerHTML = `<span class="err">${escapeHTML(String(err))}</span>`;
    state.errorsSeen++;
  }
  saveState();
}

function completeChallenge(ch) {
  if (state.completed.includes(ch.id)) return;
  state.completed.push(ch.id);
  state.xp += ch.xp;

  // Check if hints were used
  if (!state.hintsUsed[ch.id] || state.hintsUsed[ch.id] === 0) {
    state.hintFreeCount = (state.hintFreeCount || 0) + 1;
  }

  // XP animation
  showXPFloat(ch.xp);

  // Check achievements
  checkAchievements();

  saveState();
  renderAll();
}

function showXPFloat(xp) {
  const el = document.createElement("div");
  el.className = "xp-float";
  el.textContent = `+${xp} XP`;
  el.style.left = "50%";
  el.style.top = "40%";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function checkAchievements() {
  let newUnlock = false;
  ACHIEVEMENTS.forEach(ach => {
    if (!state.unlockedAchievements.includes(ach.id) && ach.check(state)) {
      state.unlockedAchievements.push(ach.id);
      newUnlock = true;
      showXPFloat(`\u{1f3c6} ${ach.name}`);
    }
  });
}

function revealHint() {
  const ch = getCurrentChallenge();
  if (!ch) return;
  state.hintsUsed[ch.id] = (state.hintsUsed[ch.id] || 0) + 1;
  saveState();
  renderLesson();
}

function handleDownload() {
  const ch = getCurrentChallenge();
  if (!ch) return;
  const code = $("codeArea").value;
  const slug = ch.title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/(^_|_$)/g, "");
  const filename = `challenge_${ch.id}_${slug}.py`;
  const blob = new Blob([code], { type: "text/x-python" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handleResetCode() {
  const ch = getCurrentChallenge();
  if (!ch) return;
  $("codeArea").value = ch.starter;
  $("codeArea").dataset.loaded = ch.id;
}

function goToLevel(li) {
  state.currentLevel = li;
  state.currentChallenge = 0;
  $("codeArea").dataset.loaded = "";
  saveState();
  renderAll();
}

function goToChallenge(li, ci) {
  state.currentLevel = li;
  state.currentChallenge = ci;
  $("codeArea").dataset.loaded = "";
  saveState();
  renderAll();
}

function goNext() {
  const level = LEVELS[state.currentLevel];
  if (state.currentChallenge < level.challenges.length - 1) {
    state.currentChallenge++;
  } else if (state.currentLevel < LEVELS.length - 1) {
    state.currentLevel++;
    state.currentChallenge = 0;
  }
  $("codeArea").dataset.loaded = "";
  saveState();
  renderAll();
}

function goPrev() {
  if (state.currentChallenge > 0) {
    state.currentChallenge--;
  } else if (state.currentLevel > 0) {
    state.currentLevel--;
    state.currentChallenge = LEVELS[state.currentLevel].challenges.length - 1;
  }
  $("codeArea").dataset.loaded = "";
  saveState();
  renderAll();
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ═══════════════════════════════════════════════════════════
//  TEACHER MODE
// ═══════════════════════════════════════════════════════════
const T_HASH = "5db1fee4b5703808c48078a76768b155b421b210c0761cd6a5d223f4d99f1eaa";
let teacherMode = false;
let teacherTab = "solution";

async function hashSHA256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
}

async function attemptTeacherLogin() {
  const input = $("teacherPwInput").value;
  const hashed = await hashSHA256(input);
  if (hashed === T_HASH) {
    teacherMode = true;
    $("teacherPwModal").hidden = true;
    $("teacherPwInput").value = "";
    $("teacherPwError").textContent = "";
    $("teacherBtn").classList.add("active-teacher");
    $("teacherBtn").innerHTML = currentLang === "de" ? "\u{1f513} Lehrer" : "\u{1f513} Teacher";
    activateTeacherUI();
  } else {
    $("teacherPwError").textContent = t("teacherPwError");
    $("teacherPwInput").value = "";
    $("teacherPwInput").focus();
  }
}

function exitTeacherMode() {
  teacherMode = false;
  $("teacherPanel").hidden = true;
  $("teacherBtn").classList.remove("active-teacher");
  $("teacherBtn").innerHTML = "\u{1f512}";
  document.querySelector(".progress-card").hidden = false;
}

function activateTeacherUI() {
  $("teacherPanel").hidden = false;
  document.querySelector(".progress-card").hidden = true;
  // Insert teacher panel into the grid (right column)
  const main = document.querySelector("main");
  const tp = $("teacherPanel");
  if (!tp.parentElement || tp.parentElement !== main) {
    main.appendChild(tp);
  }
  tp.style.gridColumn = "3";
  tp.style.gridRow = "1 / span 2";
  setTeacherTab("solution");
  renderTeacherPanel();
}

function setTeacherTab(tab) {
  teacherTab = tab;
  ["solution","overview","didactics","notes"].forEach(t => {
    const el = $("tTab" + t.charAt(0).toUpperCase() + t.slice(1));
    if (el) el.hidden = (t !== tab);
  });
  // Update active button
  document.querySelectorAll(".teacher-panel .t-btn").forEach(btn => {
    btn.classList.remove("active-t-btn");
    if (btn.textContent.toLowerCase().includes(tab.substring(0,4))) btn.classList.add("active-t-btn");
  });
  renderTeacherPanel();
}


function renderTeacherPanel() {
  if (!teacherMode) return;
  const ch = getCurrentChallenge();
  const level = LEVELS[state.currentLevel];
  if (!ch) return;

  // Solution tab
  $("tSolutionTitle").textContent = `${t("solutionFor")} ${ch.id} \u2014 ${tChTitle(ch)}`;
  $("tSolutionCode").textContent = SOLUTIONS[ch.id] || t("noSolution");
  const hints = tChHints(ch);
  $("tAllHints").innerHTML = hints ? "<ol>" + hints.map(h => `<li>${h}</li>`).join("") + "</ol>" : t("noHints");
  $("tValidation").textContent = ch.check.toString();

  // Overview tab
  let tbody = "";
  let totalXP = 0, doneXP = 0, totalCh = 0, doneCh = 0;
  LEVELS.forEach(lv => {
    lv.challenges.forEach(c => {
      const done = state.completed.includes(c.id);
      totalXP += c.xp;
      totalCh++;
      if (done) { doneXP += c.xp; doneCh++; }
      const statusIcon = done ? "\u2705" : "\u2b1c";
      tbody += `<tr onclick="goToChallenge(${LEVELS.indexOf(lv)},${lv.challenges.indexOf(c)});renderTeacherPanel()">
        <td>${c.id}</td>
        <td>${c.title}</td>
        <td><span class="t-xp-badge">${c.xp} XP</span></td>
        <td>${statusIcon}</td>
      </tr>`;
    });
  });
  $("tOverviewBody").innerHTML = tbody;
  $("tStats").innerHTML = `
    ${t("challengesCompleted")}: <b>${doneCh}/${totalCh}</b><br>
    ${t("xpEarned")}: <b>${doneXP}/${totalXP}</b><br>
    ${t("hintsUsed")}: <b>${Object.values(state.hintsUsed).reduce((a,b)=>a+b,0)}</b><br>
    ${t("errorsEncountered")}: <b>${state.errorsSeen || 0}</b><br>
    ${t("hintFreeCompletions")}: <b>${state.hintFreeCount || 0}</b><br>
    ${t("achievements")}: <b>${state.unlockedAchievements.length}/${ACHIEVEMENTS.length}</b>
  `;

  // Didactics tab
  const didSrc = (currentLang === "de" && typeof DIDACTICS_DE !== "undefined") ? DIDACTICS_DE : DIDACTICS;
  const did = didSrc[level.id] || DIDACTICS[level.id] || {};
  $("tDidacticNotes").innerHTML = did.notes || t("noNotes");
  $("tCommonErrors").innerHTML = did.errors || t("noErrors");
  $("tDifferentiation").innerHTML = did.differentiation || t("noDifferentiation");

  // Notes tab
  const noteKey = "pyforge_teacher_notes";
  const savedNotes = localStorage.getItem(noteKey) || "";
  $("tNotesArea").value = savedNotes;
}

function loadSolutionInEditor() {
  const ch = getCurrentChallenge();
  if (!ch || !SOLUTIONS[ch.id]) return;
  $("codeArea").value = SOLUTIONS[ch.id];
  $("codeArea").dataset.loaded = ch.id;
}

async function runSolutionInEditor() {
  const ch = getCurrentChallenge();
  if (!ch || !SOLUTIONS[ch.id]) return;
  $("codeArea").value = SOLUTIONS[ch.id];
  $("codeArea").dataset.loaded = ch.id;
  await handleRun();
}

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", function() {
  // Check Skulpt loaded
  if (typeof Sk === "undefined") {
    setTimeout(() => { skulptReady = typeof Sk !== "undefined"; }, 3000);
  }

  // Welcome modal
  const hasSave = loadState();
  if (hasSave && state.completed.length > 0) {
    $("btnContinue").hidden = false;
  }
  $("btnStart").addEventListener("click", () => {
    resetState();
    $("welcomeModal").hidden = true;
    renderAll();
  });
  $("btnContinue").addEventListener("click", () => {
    $("welcomeModal").hidden = true;
    renderAll();
  });
  $("btnReset2").addEventListener("click", () => {
    if (confirm(t("confirmReset"))) {
      resetState();
      $("welcomeModal").hidden = true;
      renderAll();
    }
  });

  // Editor buttons
  $("btnRun").addEventListener("click", handleRun);
  $("btnCheck").addEventListener("click", handleCheck);
  $("btnDownload").addEventListener("click", handleDownload);
  $("btnResetCode").addEventListener("click", handleResetCode);
  $("btnPrev").addEventListener("click", goPrev);
  $("btnNext").addEventListener("click", goNext);

  // Tab key in editor
  $("codeArea").addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;
      this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 4;
    }
    // Ctrl+Enter to run
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleRun();
    }
  });

  // Reference toggle
  $("refToggle").addEventListener("click", () => {
    const el = $("refContent");
    el.hidden = !el.hidden;
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", function(e) {
    if (e.altKey && e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    if (e.altKey && e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
  });

  // Teacher mode event listeners
  $("teacherBtn").addEventListener("click", () => {
    if (teacherMode) {
      exitTeacherMode();
    } else {
      $("teacherPwModal").hidden = false;
      $("teacherPwInput").value = "";
      $("teacherPwInput").focus();
    }
  });
  $("teacherPwSubmit").addEventListener("click", () => attemptTeacherLogin());
  $("teacherPwCancel").addEventListener("click", () => {
    $("teacherPwModal").hidden = true;
    $("teacherPwInput").value = "";
  });
  $("teacherPwInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); attemptTeacherLogin(); }
  });
  $("tNotesArea").addEventListener("input", () => {
    const key = `pyforge_teacher_notes_L${state.currentLevel}_C${state.currentChallenge}`;
    localStorage.setItem(key, $("tNotesArea").value);
  });

  // Set initial language
  document.documentElement.lang = currentLang;
  updateStaticUI();
  $("outputArea").textContent = t("outputPlaceholder");

  renderAll();
});
