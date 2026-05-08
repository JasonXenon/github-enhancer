document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">

    <header>
      <span class="logo">🐙</span>
      <h1>GitHub Enhancer</h1>
      <span class="version">v1.0</span>
    </header>

    <section class="features">
      <h2>✨ Fonctionnalités actives</h2>

      <div class="feature-card">
        <div class="feature-icon">📖</div>
        <div class="feature-info">
          <strong>Temps de lecture</strong>
          <p>Affiché automatiquement sur chaque page de fichier GitHub.</p>
        </div>
        <div class="badge active">ON</div>
      </div>
    </section>

    <section class="shortcuts">
      <h2>⌨️ Raccourcis clavier</h2>

      <div class="shortcut-row">
      <span class="key">Alt</span> + <span class="key">Shift</span> + <span class="key">C</span>
      <span class="shortcut-desc">Copier le chemin du fichier</span>
    </div>
    
    <div class="shortcut-row">
      <span class="key">Alt</span> + <span class="key">Shift</span> + <span class="key">R</span>
      <span class="shortcut-desc">Afficher le temps de lecture</span>
    </div>
    </section>

    <footer>
      <a href="https://github.com" target="_blank">GitHub</a>
      · Made with ❤️
    </footer>

  </div>
`;