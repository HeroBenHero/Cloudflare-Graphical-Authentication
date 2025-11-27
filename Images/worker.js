// ========================= CONFIG =========================
const IMAGE_BASES = {
  "colour-easy": "https://herobenhero.github.io/Cloudflare-Graphical-Authentication/Images/Colour/",
  "bw-medium": "https://herobenhero.github.io/Cloudflare-Graphical-Authentication/Images/Black%20&%20White/",
  "inverted-hard": "https://herobenhero.github.io/Cloudflare-Graphical-Authentication/Images/Inverted/",
};
// Default if something is missing
const DEFAULT_LEVEL = "colour-easy";

const ALL_DOMAINS = [
  "Aeroplane","Apple","Bicycle","Bike","Bus","Car","Crab","Dolphin",
  "Grapes","JCB","Mango","Octopus","Orange","Penguin","Pineapple",
  "Seahorse","Seal","Shark","Ship","Star Fish","Strawberry","Tiger",
  "Trucks","Turtle","Watermelon"
];

// ========================= PAGES (HTML/CSS) =========================
const STYLE_CSS = `
:root{
  --bg:#0f1020; --panel:#151733; --card:#1b1f47; --ink:#eaf2ff;
  --accent:#7cf7ff; --accent2:#ffa3fd; --accent3:#ffd36b; --ok:#58e089; --bad:#ff6d6d;
}
*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Arial, "Helvetica Neue";
  background: radial-gradient(1200px 800px at 10% 10%, #1b1e3f 0%, #0f1020 40%, #0b0b16 100%);
  color:var(--ink);
}
header,footer{ text-align:center; }
header{ padding:24px 12px; }
header h1{
  margin:0 0 6px; font-weight:800; letter-spacing:.3px;
  background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3));
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
nav a{ color: var(--accent); text-decoration:none; margin:0 .5rem; }
nav a:hover{ color:var(--accent2) }

main{ max-width:1100px; margin:0 auto 40px; padding:0 16px; }

.panel{
  background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
  border:1px solid rgba(255,255,255,.08);
  border-radius:18px; padding:18px; box-shadow:0 10px 30px rgba(0,0,0,.35);
}

.form-row{ display:flex; gap:12px; flex-wrap:wrap; align-items:center; margin:8px 0 14px; }
label{ display:flex; gap:8px; align-items:center; font-weight:600; }
input, select{
  background:#0e1027; color:var(--ink); border:1px solid #343866; border-radius:10px;
  padding:10px 12px; min-width:220px; outline:none; transition:.2s border,.2s box-shadow;
}
input:focus, select:focus{ border-color:var(--accent); box-shadow:0 0 0 3px rgba(124,247,255,.2); }
button{
  appearance:none; border:none; cursor:pointer; border-radius:12px; padding:10px 14px; font-weight:800;
  letter-spacing:.2px; color:#0b0b16; background:linear-gradient(90deg, var(--accent), var(--accent2));
  box-shadow:0 10px 20px rgba(0,0,0,.25); transition: transform .06s ease, filter .2s ease;
}
button:hover{ filter:brightness(1.05) }
button:active{ transform:translateY(1px) }

.grid{ display:grid; gap:14px; margin-top:10px }
.grid.login{ grid-template-columns:repeat(4, minmax(180px,1fr)); }
.grid.register{ grid-template-columns:repeat(5, minmax(160px,1fr)); }
@media (max-width: 900px){ .grid.login{ grid-template-columns:repeat(2, 1fr); } .grid.register{ grid-template-columns:repeat(3, 1fr); } }

.card{
  background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));
  border:1px solid rgba(255,255,255,.08);
  border-radius:16px; overflow:hidden; position:relative; isolation:isolate;
  transform:translateZ(0);
}
.card::after{
  content:""; position:absolute; inset:0;
  background:radial-gradient(300px 160px at -10% -10%, rgba(124,247,255,.22), transparent 50%),
             radial-gradient(300px 160px at 110% 110%, rgba(255,163,253,.16), transparent 50%);
  z-index:0; pointer-events:none;
}
.card .badge{
  position:absolute; top:10px; left:10px; z-index:2;
  padding:6px 10px; border-radius:999px; font:700 14px/1.1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas;
  background:linear-gradient(90deg, var(--accent3), var(--accent2)); color:#121220; box-shadow:0 4px 12px rgba(0,0,0,.3);
}
.card img{
  width:100%; height:140px; object-fit:cover; display:block; filter:saturate(1.15) contrast(1.05);
}
.helper{ opacity:.9; font-size:13px; margin-top:4px; color:#c9d6ff; }
.success{ color:var(--ok) } .error{ color:var(--bad) }

footer{ color:#aab4ff; opacity:.8; padding:12px 0 24px; font-size:13px }
`;

// Generic page wrapper
const TEMPLATE_HTML = (body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Graphical Password Authentication</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<style>${STYLE_CSS}</style>
</head>
<body>
<header>
  <h1>Graphical Password Authentication</h1>
  <nav><a href="/">Home</a> · <a href="/login">Login</a> · <a href="/register">Register</a></nav>
</header>
<main>${body}</main>
<footer>© Graphical Password Auth</footer>
</body>
</html>`;

const HOME_HTML = `
<section class="panel">
  <div style="text-align:center; margin:0 0 32px">
    <div style="font-size:48px; margin:0 0 16px">🔐</div>
    <h2 style="margin:0 0 12px; font-size:28px">Graphical Password Authentication</h2>
    <p class="helper" style="font-size:15px; max-width:600px; margin:0 auto 24px; line-height:1.6">
      Experience a revolutionary approach to security. Instead of typing passwords, 
      authenticate using <strong>visual recognition and image selection</strong>. 
      More intuitive. More secure. More memorable.
    </p>
  </div>

  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px; margin:32px 0">
    <div class="card" style="cursor:pointer; transition:transform .3s ease; padding:24px; text-align:center">
      <div style="font-size:40px; margin:0 0 12px">🖼️</div>
      <h3 style="margin:0 0 8px; font-weight:700">Visual Recognition</h3>
      <p class="helper" style="margin:0; font-size:13px">
        Choose images you recognize. Your brain remembers pictures better than passwords.
      </p>
    </div>

    <div class="card" style="cursor:pointer; transition:transform .3s ease; padding:24px; text-align:center">
      <div style="font-size:40px; margin:0 0 12px">🛡️</div>
      <h3 style="margin:0 0 8px; font-weight:700">Enhanced Security</h3>
      <p class="helper" style="margin:0; font-size:13px">
        Three difficulty levels: Easy, Medium, and Hard. Choose your security preference.
      </p>
    </div>

    <div class="card" style="cursor:pointer; transition:transform .3s ease; padding:24px; text-align:center">
      <div style="font-size:40px; margin:0 0 12px">✨</div>
      <h3 style="margin:0 0 8px; font-weight:700">Innovative UX</h3>
      <p class="helper" style="margin:0; font-size:13px">
        Beautiful, intuitive interface with cryptographic verification. Security meets design.
      </p>
    </div>
  </div>

  <div style="background:linear-gradient(135deg, rgba(124,247,255,.1), rgba(255,163,253,.1)); border:1px solid rgba(124,247,255,.2); border-radius:16px; padding:24px; margin:32px 0; text-align:center">
    <h3 style="margin:0 0 12px; color:var(--accent)">How It Works</h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:16px; text-align:center">
      <div>
        <div style="font-weight:700; color:var(--accent3); margin:0 0 6px">1. Register</div>
        <p class="helper" style="margin:0; font-size:13px">Select images from a visual grid</p>
      </div>
      <div>
        <div style="font-weight:700; color:var(--accent2); margin:0 0 6px">2. Remember</div>
        <p class="helper" style="margin:0; font-size:13px">Your visual password is encoded</p>
      </div>
      <div>
        <div style="font-weight:700; color:var(--accent); margin:0 0 6px">3. Authenticate</div>
        <p class="helper" style="margin:0; font-size:13px">Identify your images to log in</p>
      </div>
    </div>
  </div>

  <div class="form-row" style="justify-content:center; gap:16px; margin:32px 0 0">
    <button onclick="location.href='/login'" style="min-width:180px">
      🔓 Login
    </button>
    <button onclick="location.href='/register'" style="min-width:180px; background:linear-gradient(90deg, var(--accent3), var(--accent2))">
      ✨ Create Account
    </button>
  </div>

  <p class="helper" style="text-align:center; margin:24px 0 0; font-size:12px; opacity:.7">
    Secured with HMAC-SHA256 cryptography · Session expires after 24 hours
  </p>
</section>
`;


// Login page
const LOGIN_HTML = ` 
<section class="panel">
  <h2 style="margin:0 0 6px">Login</h2>
  <div class="helper">
    Enter your username, press <b>Get Grid</b>, then type the <b>sum</b> of the numbers on your previously chosen images.
  </div>
  <form id="loginForm" class="form-row" onsubmit="return false;">
    <label>Username <input id="u" required /></label>
    <button id="btnLoad">Get Grid</button>
  </form>
  <div id="grid" class="grid login"></div>
  <form id="verifyForm" class="form-row" style="display:none" onsubmit="return false;">
    <label>Enter Sum <input id="sum" type="password" required inputmode="numeric" pattern="\\d*" /></label>
    <button id="btnVerify">Verify</button>
    <span id="msg" class="helper"></span>
  </form>
</section>
<script>
(() => {
  const $ = (s) => document.querySelector(s);
  let sig=null, cellsMinimal=null;

  $("#btnLoad").addEventListener("click", async () => {
    const username = $("#u").value.trim();
    if(!username){ alert("Enter username"); return; }
    const r = await fetch("/api/login/grid?username=" + encodeURIComponent(username));
    const j = await r.json();
    if(!j.ok){ alert(j.error || "Failed"); return; }
    sig = j.sig;
    cellsMinimal = j.cells.map(c => ({label:c.label, domain:c.domain}));

    const g = $("#grid"); g.innerHTML = "";
    j.cells.forEach(c => {
      const d = document.createElement("div");
      d.className = "card";
      d.innerHTML = \`
        <span class="badge">#\${c.label}</span>
        <img src="\${c.img}" alt="grid image">
      \`;
      g.appendChild(d);
    });

    $("#verifyForm").style.display = "flex";
    $("#msg").textContent = "Now enter the sum of #numbers on your secret images.";
    $("#msg").className = "helper";
  });

  $("#btnVerify").addEventListener("click", async () => {
    const username = $("#u").value.trim();
    const sum = Number($("#sum").value);
    if(!username || !sum){ $("#msg").textContent = "Please enter a valid sum."; $("#msg").className="helper error"; return; }
    const r = await fetch("/api/login/verify", {
      method:"POST", headers:{"content-type":"application/json"},
      body: JSON.stringify({ username, sum, cells: cellsMinimal, sig })
    });
    const j = await r.json();
    if(j.ok){
      $("#msg").textContent = "Authenticated ✓ Redirecting...";
      $("#msg").className="helper success";
      setTimeout(()=>location.href="/welcome", 700);
    }
    else{
      $("#msg").textContent = "Try Again ✗";
      $("#msg").className="helper error";
    }
  });
})();
</script>`;

// Register page with security level
const REGISTER_HTML = `
<section class="panel">
  <h2 style="margin:0 0 6px">Register</h2>
  <div class="helper">
    Choose a <b>security level</b>, press <b>Show Grid</b>, pick any images you like,
    and type their <b>2-character codes</b> sequentially into the password box
    (e.g. <code>aFQ7</code> means two images).
  </div>
  <form class="form-row" onsubmit="return false;">
    <label>Username <input id="ru" required /></label>
    <label>
      Security Level
      <select id="secLevel">
        <option value="colour-easy">Colour – Easy</option>
        <option value="bw-medium">Black & White – Medium</option>
        <option value="inverted-hard">Inverted – Hard</option>
      </select>
    </label>
    <button id="btnShow">Show Grid</button>
  </form>
  <div id="rgrid" class="grid register"></div>
  <form id="saveForm" class="form-row" style="display:none" onsubmit="return false;">
    <label>Password <input id="pwd" type="password" required autocomplete="new-password" /></label>
    <button id="btnSave">Register</button>
    <span id="rmsg" class="helper"></span>
  </form>
</section>
<script>
(() => {
  const $ = (s) => document.querySelector(s);
  let regGrid = [];
  let currentLevel = "colour-easy";

  $("#btnShow").addEventListener("click", async () => {
    currentLevel = $("#secLevel").value || "colour-easy";
    const r = await fetch("/api/register/grid?level=" + encodeURIComponent(currentLevel));
    const j = await r.json();
    if(!j.ok){ alert(j.error || "Failed"); return; }
    regGrid = j.grid;

    const g = $("#rgrid"); g.innerHTML = "";
    j.grid.forEach(c => {
      const d = document.createElement("div");
      d.className = "card";
      d.innerHTML = \`
        <span class="badge">\${c.code}</span>
        <img src="\${c.img}" alt="grid image">
      \`;
      g.appendChild(d);
    });
    $("#saveForm").style.display = "flex";
    $("#rmsg").textContent = "Type the codes of your chosen images (2 chars per image).";
    $("#rmsg").className="helper";
  });

  $("#btnSave").addEventListener("click", async () => {
    const username = $("#ru").value.trim();
    const password = $("#pwd").value.trim();
    const level = $("#secLevel").value || "colour-easy";
    if(!username || !password){
      $("#rmsg").textContent="Please enter username & password codes.";
      $("#rmsg").className="helper error";
      return;
    }
    const r = await fetch("/api/register", {
      method:"POST", headers:{"content-type":"application/json"},
      body: JSON.stringify({ username, password, grid: regGrid, level })
    });
    const j = await r.json();
    if(j.ok){
      $("#rmsg").textContent = "Saved ✓ Redirecting to login...";
      $("#rmsg").className="helper success";
      setTimeout(()=>location.href="/login", 700);
    } else {
      $("#rmsg").textContent = "Failed: " + (j.error || "");
      $("#rmsg").className="helper error";
    }
  });
})();
</script>`;

const WELCOME_HTML = `
<section class="panel">
  <div style="text-align:center; margin:0 0 32px">
    <div style="font-size:56px; margin:0 0 16px; animation:bounce 1s ease-in-out">✓</div>
    <h2 style="margin:0 0 12px; font-size:32px; background: linear-gradient(90deg, var(--ok), var(--accent)); -webkit-background-clip:text; background-clip:text; color:transparent">
      Authentication Successful
    </h2>
    <p class="helper" style="font-size:15px; max-width:600px; margin:0 auto; line-height:1.6; color:var(--ok)">
      Your graphical password was verified successfully. You are now securely authenticated.
    </p>
  </div>

  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin:32px 0">
    <div class="card" style="padding:20px; text-align:center; border:1px solid rgba(88,224,137,.3); background:linear-gradient(180deg, rgba(88,224,137,.08), rgba(88,224,137,.02))">
      <div style="font-size:36px; margin:0 0 10px">🔐</div>
      <h3 style="margin:0 0 6px; font-weight:700; color:var(--ok)">Session Active</h3>
      <p class="helper" style="margin:0; font-size:13px">Your session is secure and encrypted</p>
    </div>

    <div class="card" style="padding:20px; text-align:center; border:1px solid rgba(124,247,255,.3); background:linear-gradient(180deg, rgba(124,247,255,.08), rgba(124,247,255,.02))">
      <div style="font-size:36px; margin:0 0 10px">🎯</div>
      <h3 style="margin:0 0 6px; font-weight:700; color:var(--accent)">Verified Identity</h3>
      <p class="helper" style="margin:0; font-size:13px">Your visual password matched perfectly</p>
    </div>

    <div class="card" style="padding:20px; text-align:center; border:1px solid rgba(255,163,253,.3); background:linear-gradient(180deg, rgba(255,163,253,.08), rgba(255,163,253,.02))">
      <div style="font-size:36px; margin:0 0 10px">⚡</div>
      <h3 style="margin:0 0 6px; font-weight:700; color:var(--accent2)">Next Generation</h3>
      <p class="helper" style="margin:0; font-size:13px">Using modern cryptographic verification</p>
    </div>
  </div>

  <div style="background:linear-gradient(135deg, rgba(88,224,137,.08), rgba(88,224,137,.04)); border:1px solid rgba(88,224,137,.2); border-radius:16px; padding:24px; margin:32px 0; text-align:center">
    <h3 style="margin:0 0 12px; color:var(--ok); font-size:18px">🎉 Welcome Back!</h3>
    <p class="helper" style="margin:0; line-height:1.6">
      You've successfully demonstrated knowledge of your visual password.<br>
      <strong>Your authentication is secure, unique, and memorable.</strong>
    </p>
  </div>

  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin:32px 0 0">
    <button onclick="location.href='/'" style="background:linear-gradient(90deg, var(--accent), var(--accent2)); padding:12px 20px">
      ← Back to Home
    </button>
    <button onclick="alert('Session: Authenticated\\nMethod: Graphical Password\\nSecurity: HMAC-SHA256')" style="background:linear-gradient(90deg, var(--accent3), var(--accent2)); padding:12px 20px">
      📊 Session Details
    </button>
  </div>

  <p class="helper" style="text-align:center; margin:24px 0 0; font-size:12px; opacity:.7">
    Session expires in 24 hours · Your visual password remains securely stored
  </p>
</section>

<style>
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
</style>
`;


// ========================= WORKER =========================
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Root dummy homepage
    if (path === "/") return html(TEMPLATE_HTML(HOME_HTML));

    // Pages
    if (path === "/login")    return html(TEMPLATE_HTML(LOGIN_HTML));
    if (path === "/register") return html(TEMPLATE_HTML(REGISTER_HTML));
    if (path === "/welcome")  return html(TEMPLATE_HTML(WELCOME_HTML));

    // API
    if (path.startsWith("/api/")) return handleAPI(request, env, path);

    return new Response("Not found", { status: 404 });
  }
};

// ========================= API HANDLERS =========================

async function handleAPI(request, env, path) {
  const url = new URL(request.url);

  // Register: 5×5 with 2-char codes, choose level
  if (path === "/api/register/grid" && request.method === "GET") {
    const level = url.searchParams.get("level") || DEFAULT_LEVEL;
    const imgBase = IMAGE_BASES[level] || IMAGE_BASES[DEFAULT_LEVEL];

    const picked = pickN(ALL_DOMAINS, 25);
    const codes  = randomCodes(picked.length);
    const grid = picked.map((d, i) => ({
      domain: d,
      code: codes[i],
      img: `${imgBase}${encodeURIComponent(d)}/download.jpg`,
    }));
    return json({ ok: true, grid, level });
  }

  if (path === "/api/register" && request.method === "POST") {
    const { username, password, grid, level } = await request.json();
    if (!username || !password || !Array.isArray(grid))
      return json({ ok:false, error:"username, password, grid required" }, 400);

    const chosenLevel = IMAGE_BASES[level] ? level : DEFAULT_LEVEL;
    const codeMap = Object.fromEntries(grid.map(x => [x.code, x.domain]));
    const chosen = [];
    for (let i=0; i<password.length; i+=2) {
      const code = password.slice(i, i+2);
      if (codeMap[code]) chosen.push(codeMap[code]);
    }
    if (!chosen.length) return json({ ok:false, error:"no matching domains" }, 400);

    const userData = {
      level: chosenLevel,
      domains: chosen,  // array of domain names for the password
    };
    await env.SRM.put(username, JSON.stringify(userData), { expirationTtl: 86400 }); // 1 day
    return json({ ok:true });
  }

  // Login grid: 4×4 with numbers, signed (stateless)
  if (path === "/api/login/grid" && request.method === "GET") {
    const username = url.searchParams.get("username") || "";
    if (!username) return json({ ok:false, error:"username required" }, 400);
    const saved = await env.SRM.get(username);
    if (!saved) return json({ ok:false, error:"user not registered" }, 404);

    const { level: userLevel } = parseUserData(saved);
    const effectiveLevel = IMAGE_BASES[userLevel] ? userLevel : DEFAULT_LEVEL;
    const imgBase = IMAGE_BASES[effectiveLevel];

    const picked = pickN(ALL_DOMAINS, 16);
    const labels = Array.from({length:16}, (_,i)=>i+1);
    shuffle(labels);
    const cells = picked.map((d,i)=>({
      label: labels[i], domain: d,
      img: `${imgBase}${encodeURIComponent(d)}/download.jpg`
    }));

    const payload = JSON.stringify(cells.map(c => ({label:c.label, domain:c.domain})));
    const sig = await hmacSign((globalThis.APP_SECRET ?? false) || (env.APP_SECRET || "dev-secret"), payload);
    return json({ ok:true, sig, cells });
  }

  if (path === "/api/login/verify" && request.method === "POST") {
    const { username, sum, cells, sig } = await request.json();
    if (!username || typeof sum !== "number" || !Array.isArray(cells) || !sig)
      return json({ ok:false, error:"username, sum, cells, sig required" }, 400);

    const payload = JSON.stringify(cells.map(c => ({label:c.label, domain:c.domain})));
    const goodSig = await hmacSign((globalThis.APP_SECRET ?? false) || (env.APP_SECRET || "dev-secret"), payload);
    if (goodSig !== sig) return json({ ok:false, error:"bad grid signature" }, 400);

    const saved = await env.SRM.get(username);
    if (!saved) return json({ ok:false, error:"user not registered or expired" }, 404);

    const { domains } = parseUserData(saved);
    const keySet = new Set(domains.map(s => s.toLowerCase()));
    const expected = cells
      .filter(c => keySet.has(c.domain.toLowerCase()))
      .reduce((a,c)=> a + Number(c.label||0), 0);

    return json({ ok: Number(sum) === Number(expected) });
  }

  return new Response("Not found", { status:404 });
}

// Helper to support both new JSON format and old "space-separated" format
function parseUserData(saved) {
  try {
    const parsed = JSON.parse(saved);
    if (parsed && Array.isArray(parsed.domains)) {
      return {
        level: parsed.level || DEFAULT_LEVEL,
        domains: parsed.domains,
      };
    }
  } catch (_) {
    // not JSON, fallback to old format
  }
  const domains = saved.split(/\s+/).filter(Boolean);
  return { level: DEFAULT_LEVEL, domains };
}

// ========================= UTIL =========================
function json(obj, status=200){
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
function html(body){
  return new Response(body, {
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]]; } return a; }
function pickN(all,n){ const arr=[...all]; shuffle(arr); return arr.slice(0,n); }
function randomCodes(n){
  const alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codes=[]; for(let i=0;i<n;i++){ codes.push(alpha[(Math.random()*alpha.length)|0] + alpha[(Math.random()*alpha.length)|0]); }
  return codes;
}
async function hmacSign(secret, data){
  const enc=new TextEncoder();
  const key=await crypto.subtle.importKey("raw", enc.encode(String(secret)), {name:"HMAC", hash:"SHA-256"}, false, ["sign"]);
  const sigBuf=await crypto.subtle.sign("HMAC", key, enc.encode(String(data)));
  let bin=""; const bytes=new Uint8Array(sigBuf); for(let i=0;i<bytes.byteLength;i++) bin+=String.fromCharCode(bytes[i]);
  return btoa(bin);
}
