// Ixitxachitl's Stream Tools — small helpers shared by every page.
(() => {
  // ---------- "POW! Copied!" toast ----------
  let toast, toastTimer;
  function say(text) {
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for browsers / contexts without the async clipboard API.
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    say("POW! Copied!");
  }

  // <button data-copy="https://…">  or  <button data-copy-from="#inputId">
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy], [data-copy-from]");
    if (!btn) return;
    const from = btn.dataset.copyFrom && document.querySelector(btn.dataset.copyFrom);
    copy(from ? from.value : btn.dataset.copy);
  });

  // ---------- setup-link builder for the rave overlays ----------
  // <form data-builder data-base="https://…">  with inputs named after URL parameters.
  for (const form of document.querySelectorAll("form[data-builder]")) {
    const out = form.querySelector("[data-builder-out]");
    const build = () => {
      const url = new URL(form.dataset.base);
      for (const el of form.elements) {
        if (!el.name) continue;
        if (el.type === "checkbox") {
          // data-on="true": a flag the tool only understands as name=true, written when ticked
          if (el.dataset.on) {
            if (el.checked) url.searchParams.set(el.name, el.dataset.on);
          }
          // otherwise only write switches that differ from the overlay's default
          else if (el.checked !== el.defaultChecked) url.searchParams.set(el.name, el.checked ? "1" : "0");
        } else if (el.value.trim() !== "" && el.value.trim() !== el.defaultValue) {
          url.searchParams.set(el.name, el.value.trim());
        }
      }
      out.value = url.toString();
    };
    form.addEventListener("input", build);
    form.addEventListener("change", build);
    form.addEventListener("submit", (e) => e.preventDefault());
    form.addEventListener("reset", () => setTimeout(build));
    build();
  }

  // ---------- current year in footers ----------
  for (const el of document.querySelectorAll("[data-year]")) el.textContent = new Date().getFullYear();
})();
