import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

async function loadConfig() {
  const r = await fetch("/api/config");
  return r.ok ? r.json() : {};
}

function styleAuth() {
  const css = `
  #aimsAuthGate{position:fixed;inset:0;background:rgba(8,15,40,.94);z-index:99999;display:flex;align-items:center;justify-content:center;color:white;font-family:Arial,sans-serif}
  #aimsAuthCard{width:min(520px,92vw);background:#111c3e;border:1px solid rgba(255,255,255,.18);border-radius:18px;padding:24px;box-shadow:0 18px 60px rgba(0,0,0,.35)}
  #aimsAuthCard h2{margin:0 0 10px}
  #aimsAuthCard input{width:100%;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.2);background:#0a1332;color:white;margin:12px 0}
  #aimsAuthCard button{padding:11px 16px;border-radius:10px;border:0;background:#800000;color:white;font-weight:700;cursor:pointer}
  #aimsAuthCard .muted{color:#c8d4f0;font-size:.92rem;line-height:1.5}
  #aimsUserBadge{position:fixed;right:12px;bottom:12px;background:#0a1332;color:white;border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:8px 12px;z-index:9999;font-size:12px}
  `;
  const tag = document.createElement("style");
  tag.textContent = css;
  document.head.appendChild(tag);
}

function showGate(supabase, config) {
  styleAuth();
  const div = document.createElement("div");
  div.id = "aimsAuthGate";
  div.innerHTML = `
    <div id="aimsAuthCard">
      <h2>AIMS Agentic Research LMS</h2>
      <p class="muted">Invite-only course access. Enter the email used by your instructor. Supabase will send a magic link.</p>
      <input id="aimsLoginEmail" type="email" placeholder="student@example.com">
      <button id="aimsLoginBtn">Send magic link</button>
      <p id="aimsLoginMsg" class="muted"></p>
      <p class="muted">Local development note: if Supabase variables are missing, this gate is skipped.</p>
    </div>`;
  document.body.appendChild(div);
  document.getElementById("aimsLoginBtn").onclick = async () => {
    const email = document.getElementById("aimsLoginEmail").value.trim();
    const msg = document.getElementById("aimsLoginMsg");
    msg.textContent = "Sending magic link...";
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: config.appUrl || window.location.origin }
    });
    msg.textContent = error ? error.message : "Check your email for the login link.";
  };
}

function showBadge(user) {
  const div = document.createElement("div");
  div.id = "aimsUserBadge";
  div.textContent = `Signed in: ${user.email}`;
  document.body.appendChild(div);
}

(async function initAimsAuth() {
  const config = await loadConfig();
  if (!config.supabaseUrl || !config.supabaseAnonKey) {
    console.warn("Supabase config missing. Auth gate skipped for local preview.");
    return;
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
  window.aimsSupabase = supabase;

  const { data } = await supabase.auth.getSession();
  if (data.session?.user) {
    showBadge(data.session.user);
    return;
  }
  showGate(supabase, config);
})();