# Horloge Digitale Flozze 🕒

Une horloge digitale moderne et élégante, développée avec HTML, CSS et JavaScript. ⚡

## Description 📋

Ce projet est une horloge digitale qui affiche l'heure et la date en temps réel. L'application utilise le format local français et offre une interface utilisateur moderne avec des effets visuels élégants. 🎨

## Fonctionnalités ✨

- Affichage de l'heure en temps réel. ⏰
- Affichage de la date complète en français. 📅
- Interface utilisateur moderne et responsive. 🎨
- Effets de lueur (text-shadow) sur les éléments. ✨
- Design adaptatif pour tous les appareils. 📱
- Mise à jour automatique de l'heure et de la date. 🔄

## Structure du Projet 📂

digital-clock-flozze/ \
│ \
├── css/ \
│ ├── style.css : Fichier CSS principal pour les styles de l'application. 🎨 \
│ ├── root/ \
│ │ ├── color.css : Variables et constantes de couleurs. 🎨 \
│ │ └── font.css : Configuration des polices d'écriture. 🖌️ \
│ └── font/ \
│   └── Orbitron-VariableFont_wght.ttf : Police personnalisée Orbitron. 🖌️ \
│ \
├── js/ \
│ ├── index.js : Point d'entrée principal de l'application. 📜 \
│ ├── time.js : Gestion de l'affichage de l'heure. ⏰ \
│ └── date.js : Gestion de l'affichage de la date. 📅 \
│ \
├── index.html : Structure HTML principale de l'application. 📄 \
└── README.md : Documentation du projet. 📖

## Installation 🛠️

Pour exécuter ce projet localement, suivez ces étapes :

1. Clonez le dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/votre-utilisateur/digital-clock-flozze.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd digital-clock-flozze
   ```

3. Ouvrez le fichier index.html dans votre navigateur web préféré. 🌐

## Utilisation 💻

L'horloge s'actualise automatiquement :
- L'heure est mise à jour chaque seconde
- La date est mise à jour une fois par jour

## Design 🎨

L'application utilise plusieurs éléments de design pour une expérience visuelle optimale :

- **Police** : Orbitron pour un style moderne et digital
- **Effets visuels** :
  - Text-shadow pour un effet de lueur sur l'heure et la date
  - Design épuré et minimaliste
  - Couleurs personnalisables via les variables CSS

## Fonctionnalités Techniques 🔧

- Utilisation des modules ES6 pour une meilleure organisation du code
- Manipulation du DOM pour l'affichage dynamique
- Styles CSS modernes avec variables
- Organisation modulaire des fichiers CSS
- Utilisation de la police Orbitron pour un style digital
- Format local français pour l'heure et la date

## Documentation 📖

La documentation du code est générée avec JSDoc. Pour générer la documentation, suivez ces étapes :

1. Installez JSDoc globalement si ce n'est pas déjà fait :

   ```bash
   npm install -g jsdoc
   ```

2. Générez la documentation en exécutant la commande suivante dans le répertoire du projet :

   ```bash
   jsdoc js/index.js js/time.js js/date.js
   ```

3. Ouvrez le fichier index.html dans le dossier out pour visualiser la documentation.

## Auteur 👨‍💻

**Flozze**
