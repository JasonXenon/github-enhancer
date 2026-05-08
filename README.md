# 🐙 GitHub Enhancer

Une extension de navigateur qui améliore l'expérience de navigation sur GitHub avec des fonctionnalités pratiques pour les développeurs.

---

## ✨ Fonctionnalités

### 📖 Temps de lecture
Affiche automatiquement une estimation du temps de lecture sur chaque page de fichier GitHub, basée sur le nombre de mots du fichier (200 mots/min).

### 📋 Copie rapide du chemin
Copie instantanément le chemin relatif du fichier courant dans le presse-papiers.

---

## ⌨️ Raccourcis clavier

| Raccourci | Action |
|---|---|
| `Alt + Shift + C` | Copier le chemin du fichier |
| `Alt + Shift + R` | Afficher / Masquer le temps de lecture |

---

## 🚀 Installation (développement)

### Prérequis
- [Node.js](https://nodejs.org/) v18+
- Google Chrome ou tout navigateur Chromium

### Étapes

```bash
# 1. Cloner le projet
git clone https://github.com/ton-user/github-enhancer.git
cd github-enhancer

# 2. Installer les dépendances
npm install

# 3. Lancer en mode développement
npm run dev
```

WXT ouvrira automatiquement une instance de Chrome avec l'extension chargée.

---

## 🏗️ Build production

```bash
npm run build
```

Le dossier `.output/chrome-mv3/` contiendra l'extension prête à être publiée sur le Chrome Web Store.

---

## 🗂️ Structure du projet

```
github-enhancer/
├── entrypoints/
│   ├── content.ts          ← Content script (injection dans GitHub)
│   └── popup/
│       ├── index.html      ← Structure de la popup
│       ├── main.ts         ← Logique de la popup
│       └── style.css       ← Styles de la popup
├── wxt.config.ts           ← Configuration WXT
└── package.json
```

---

## 🛠️ Stack technique

- **[WXT](https://wxt.dev/)** — Framework d'extensions de navigateur basé sur Vite
- **TypeScript** — Typage statique
- **Manifest V3** — Standard moderne pour les extensions Chrome

---

## 🔮 Roadmap

- [ ] Nombre de lignes dans l'arborescence de fichiers
- [ ] Page d'options avec vitesse de lecture personnalisable
- [ ] Support Firefox
- [ ] Thème clair / sombre pour le badge

---

## 📄 Licence

MIT