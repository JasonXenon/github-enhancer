export default defineContentScript({
  matches: ["*://github.com/*/*/blob/*"],

  main() {
    let lastUrl = location.href;

    const observer = new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        waitAndInject();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    injectStyles();
    waitAndInject();
    setupShortcuts();
  },
});

function waitAndInject() {
  document.getElementById("gh-reading-time")?.remove();

  const maxAttempts = 20;
  let attempts = 0;

  const interval = setInterval(() => {
    attempts++;

    const codeLines = document.querySelectorAll(".react-file-line");

    if (codeLines.length > 0) {
      clearInterval(interval);
      injectReadingTime();
    }

    if (attempts >= maxAttempts) {
      clearInterval(interval);
    }
  }, 100);
}

function injectReadingTime() {
  if (document.getElementById("gh-reading-time")) return;

  const codeLines = document.querySelectorAll(".react-file-line");
  if (codeLines.length === 0) return;

  const text = Array.from(codeLines).map(l => l.textContent).join(" ");
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);

  const badge = document.createElement("div");
  badge.id = "gh-reading-time";
  badge.style.cssText = `
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: #ddf4ff;
    border: 1px solid #54aeff;
    border-radius: 20px;
    font-size: 12px;
    color: #0969da;
    font-family: -apple-system, sans-serif;
    margin-left: 8px;
    white-space: nowrap;
  `;
  badge.innerHTML = `📖 ${minutes} min de lecture`;

  const toolbar =
      document.querySelector(".react-blob-header-edit-and-raw-actions") ??
      document.querySelector(".file-info") ??
      document.querySelector(".Box-header");

  if (toolbar) toolbar.prepend(badge);
}

function setupShortcuts() {
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
    ) return;

    // Alt + Shift + C → Copier le chemin du fichier
    if (e.altKey && e.shiftKey && e.key === "C") {
      e.preventDefault();
      copyFilePath();
    }

    // Alt + Shift + R → Toggle le temps de lecture
    if (e.altKey && e.shiftKey && e.key === "R") {
      e.preventDefault();

      const badge = document.getElementById("gh-reading-time");

      if (badge) {
        const isHidden = badge.style.display === "none";

        if (isHidden) {
          // Afficher avec animation
          badge.style.display = "inline-flex";
          badge.classList.remove("hiding");
          showToast("📖 Temps de lecture affiché");
        } else {
          // Masquer avec animation puis cacher
          badge.classList.add("hiding");
          setTimeout(() => {
            badge.style.display = "none";
            badge.classList.remove("hiding");
          }, 250);
          showToast("🙈 Temps de lecture masqué");
        }
      } else {
        // Badge absent → on le crée
        injectReadingTime();
        showToast("📖 Temps de lecture affiché !");
      }
    }
  });
}

function copyFilePath() {
  const path = location.pathname; // ex: /user/repo/blob/master/src/App.vue

  const match = path.match(/\/blob\/[^/]+\/(.+)/);
  const filePath = match ? match[1] : path;

  navigator.clipboard.writeText(filePath).then(() => {
    showToast(`📋 Copié : ${filePath}`);
  });
}

function showToast(message: string) {
  document.getElementById("gh-toast")?.remove();

  const toast = document.createElement("div");
  toast.id = "gh-toast";
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #161b22;
    border: 1px solid #30363d;
    color: #e6edf3;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-family: -apple-system, sans-serif;
    z-index: 99999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    animation: fadeIn 0.2s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

function injectStyles() {
  if (document.getElementById("gh-enhancer-styles")) return;

  const style = document.createElement("style");
  style.id = "gh-enhancer-styles";
  style.textContent = `
    @keyframes gh-fade-in {
      from { opacity: 0; transform: translateY(-6px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes gh-fade-out {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to   { opacity: 0; transform: translateY(-6px) scale(0.95); }
    }

    #gh-reading-time {
      animation: gh-fade-in 0.25s ease forwards;
    }

    #gh-reading-time.hiding {
      animation: gh-fade-out 0.25s ease forwards;
    }
  `;
  document.head.appendChild(style);
}