(function(){
  const cfg = Object.assign({
    backendURL: "http://localhost:8000",
    title: "Ask our site 🤖",
    welcome: "Hi! I can answer using info from this website.",
  }, window.SiteChat || {});

  // UI Elements
  const btn = document.createElement("button");
  btn.className = "sc-chat-button";
  btn.innerHTML = "💬";

  const wrap = document.createElement("div");
  wrap.className = "sc-chat-container";

  const header = document.createElement("div");
  header.className = "sc-header";
  header.innerHTML = `<div class="sc-title">${cfg.title}</div>`;

  const close = document.createElement("button");
  close.className = "sc-close";
  close.innerHTML = "✕";
  header.appendChild(close);

  const messages = document.createElement("div");
  messages.className = "sc-messages";

  const inputWrap = document.createElement("div");
  inputWrap.className = "sc-input";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type your question and press Enter...";

  const send = document.createElement("button");
  send.textContent = "Send";

  inputWrap.appendChild(input);
  inputWrap.appendChild(send);

  wrap.appendChild(header);
  wrap.appendChild(messages);
  wrap.appendChild(inputWrap);

  document.body.appendChild(btn);
  document.body.appendChild(wrap);

  // helpers
  function addMsg(text, who='bot', sources=[]) {
    const msg = document.createElement("div");
    msg.className = "sc-msg " + who;
    const bubble = document.createElement("div");
    bubble.className = "sc-bubble";
    bubble.textContent = text;
    msg.appendChild(bubble);
    if (who === 'bot' && sources && sources.length) {
      const src = document.createElement("div");
      src.className = "sc-source";
      const names = sources.map((s, i)=>`[${i+1}] ${s.source.split(/[\\/]/).pop()}`).join("  ");
      src.textContent = "Sources: " + names;
      bubble.appendChild(src);
    }
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function toggle() {
    wrap.style.display = wrap.style.display === "flex" ? "none" : "flex";
  }

  async function sendMsg() {
    const q = input.value.trim();
    if (!q) return;
    addMsg(q, "user");
    input.value = "";
    addMsg("Thinking...", "bot");
    try {
      const res = await fetch(cfg.backendURL + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      // Replace last "Thinking..." bubble
      messages.removeChild(messages.lastChild);
      addMsg(data.answer || "No answer returned.", "bot", data.sources || []);
    } catch (e) {
      messages.removeChild(messages.lastChild);
      addMsg("Error contacting the server. Check backendURL in SiteChat config.", "bot");
      console.error(e);
    }
  }

  // events
  btn.addEventListener("click", toggle);
  close.addEventListener("click", toggle);
  send.addEventListener("click", sendMsg);
  input.addEventListener("keydown", (e)=>{
    if (e.key === "Enter") sendMsg();
  });

  // initial message
  addMsg(cfg.welcome, "bot");
})();
