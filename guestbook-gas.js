const ENDPOINT = "https://mariedavis-guestbook.iamthatiam206.workers.dev/";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guestForm");
  const entriesEl = document.getElementById("guestEntries");
  const statusEl = document.getElementById("guestStatus");
  if (!form || !entriesEl || !statusEl) return;

  async function loadEntries(){
    try{
      statusEl.textContent = "Loading…";
      const res = await fetch(ENDPOINT);
      const data = await res.json();
      entriesEl.innerHTML = "";
      data.forEach(e=>{
        const div = document.createElement("div");
        div.className = "guest-note";
        const when = new Date(e.timestamp).toLocaleString();
        div.innerHTML = `<div class="guest-name">💖 ${escapeHtml(e.name)}</div>
                         <div class="guest-text">${linkify(escapeHtml(e.msg))}</div>
                         <div class="text-xs text-slate-400 mt-1">${when}</div>`;
        entriesEl.appendChild(div);
      });
      statusEl.textContent = data.length ? "" : "No entries yet.";
    }catch(err){
      console.error(err);
      statusEl.textContent = "Load failed. Check console.";
    }
  }

  form.addEventListener("submit", async (ev)=>{
    ev.preventDefault();
    const name = document.getElementById("guestName").value.trim();
    const msg  = document.getElementById("guestMessage").value.trim();
    if (!name || !msg) return;
    try{
      statusEl.textContent = "Sending…";
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ name, msg })
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.reset();
      statusEl.textContent = "Sent!";
      loadEntries();
    }catch(err){
      console.error(err);
      statusEl.textContent = "Save failed. Check console.";
    }
  });

  function escapeHtml(s){
    return s.replace(/[&<>\"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
    }[c]));
  }
  function linkify(t){
    return t.replace(/(https?:\/\/[\w.-][\w\-._~:\/?#[\]@!$&'()*+,;=%]*)/g,
      '<a class="text-pink-600 underline" target="_blank" rel="noopener">$1</a>');
  }

  loadEntries();
});
