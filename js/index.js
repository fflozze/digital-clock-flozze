/**
 * @fileoverview Point d'entrée principal de l'application horloge digitale
 * @module index
 * @requires {module} time - Module de gestion de l'heure
 * @requires {module} date - Module de gestion de la date
 * @requires {module} i18n - Module de gestion des traductions
 * @requires {module} timezone - Module de gestion des fuseaux horaires
 * @version 1.0.0
 * @author Flozze
 */

// Importation des fonctions depuis les modules
import { time } from './time.js';
import { date } from './date.js';
import { changeLanguage, updateTranslations, initI18n, setDateUpdateCallback } from './i18n.js';
import { timezones, getTimezone, setTimezone, getCurrentTimezoneInfo, getBrowserTimezone } from './timezone.js';

/**
 * Initialise l'affichage de l'heure et sa mise à jour
 * @function initTime
 * @returns {void}
 * @throws {Error} Si l'initialisation de l'heure échoue
 * @example
 * // Initialisation de l'heure
 * initTime();
 * 
 * @since 1.0.0
 */
function initTime() {
  time();
  setInterval(time, 1000);
}

/**
 * Initialise l'affichage de la date et sa mise à jour
 * @function initDate
 * @returns {void}
 * @throws {Error} Si l'initialisation de la date échoue
 * @example
 * // Initialisation de la date
 * initDate();
 * 
 * @since 1.0.0
 */
function initDate() {
  date();
  setInterval(date, 86400000);
}

/**
 * Initialise l'application complète
 * @function initApp
 * @returns {void}
 * @throws {Error} Si l'initialisation de l'application échoue
 * @example
 * // Initialisation de l'application
 * initApp();
 * 
 * @since 1.0.0
 */
function initApp() {
  initTime();
  initDate();
}

/**
 * Crée des particules animées en arrière-plan
 * @function createParticles
 * @returns {void}
 * @since 1.0.0
 */
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 10 + 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    particlesContainer.appendChild(particle);
  }
}

/**
 * Initialise les contrôles de langue et fuseau horaire
 * @function initControls
 * @returns {void}
 */
function initControls() {
  // Initialiser le menu de sélection de langue
  const languageButton = document.getElementById('languageButton');
  const languageDropdown = document.getElementById('languageDropdown');
  const languageText = document.getElementById('languageText');
  const currentLanguageFlag = document.getElementById('currentLanguageFlag');
  const languageItems = languageDropdown.querySelectorAll('.dropdown-item');

  // Mapping des langues avec les codes flag-icons
  const languageMap = {
    'fr': { name: 'Français', flag: 'fi-fr' },
    'de': { name: 'Deutsch', flag: 'fi-de' },
    'es': { name: 'Español', flag: 'fi-es' },
    'en': { name: 'English', flag: 'fi-gb' }
  };

  // Fonction pour mettre à jour l'affichage de la langue
  function updateLanguageDisplay(lang) {
    const langInfo = languageMap[lang] || languageMap['fr'];
    languageText.textContent = langInfo.name;
    currentLanguageFlag.className = 'fi ' + langInfo.flag;
  }

  // Afficher la langue actuelle
  const currentLang = localStorage.getItem('language') || 'fr';
  updateLanguageDisplay(currentLang);

  // Gérer l'ouverture/fermeture du menu de langue
  languageButton.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('active');
    const timezoneDropdown = document.getElementById('timezoneDropdown');
    timezoneDropdown.classList.remove('active');
  });

  // Gérer la sélection de langue
  languageItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = item.getAttribute('data-lang');
      changeLanguage(lang);
      updateLanguageDisplay(lang);
      languageDropdown.classList.remove('active');
      time(); // Mettre à jour l'heure immédiatement
      date(); // Mettre à jour la date immédiatement
    });
  });

  // Initialiser le menu de sélection de fuseau horaire
  const timezoneButton = document.getElementById('timezoneButton');
  const timezoneDropdown = document.getElementById('timezoneDropdown');
  const timezoneText = document.getElementById('timezoneText');

  // Remplir le menu avec les fuseaux horaires
  timezones.forEach(tz => {
    const item = document.createElement('button');
    item.className = 'dropdown-item';
    item.setAttribute('data-timezone', tz.value);
    item.textContent = `${tz.label} - ${tz.utc}`;
    timezoneDropdown.appendChild(item);
  });
  
  // Ajouter le fuseau horaire du navigateur s'il n'est pas dans la liste
  const browserTimezone = getBrowserTimezone();
  const browserTzInList = timezones.find(tz => tz.value === browserTimezone);
  if (!browserTzInList) {
    const browserTzInfo = getCurrentTimezoneInfo();
    if (browserTzInfo && browserTzInfo.value === browserTimezone) {
      const item = document.createElement('button');
      item.className = 'dropdown-item';
      item.setAttribute('data-timezone', browserTzInfo.value);
      item.textContent = `${browserTzInfo.label} - ${browserTzInfo.utc}`;
      // Insérer en haut de la liste
      timezoneDropdown.insertBefore(item, timezoneDropdown.firstChild);
    }
  }

  // Afficher le fuseau horaire actuel
  const savedTimezone = localStorage.getItem('timezone');
  
  // Si aucun fuseau horaire n'est sauvegardé, utiliser celui du navigateur
  if (!savedTimezone) {
    const browserTimezone = getBrowserTimezone();
    setTimezone(browserTimezone);
  }
  
  // Obtenir les informations du fuseau horaire actuel
  const currentTzObj = getCurrentTimezoneInfo();
  
  // Si aucune information n'est trouvée, utiliser le premier de la liste
  if (!currentTzObj) {
    const firstTz = timezones[0];
    setTimezone(firstTz.value);
    updateTimezoneDisplay(firstTz);
  } else {
    updateTimezoneDisplay(currentTzObj);
  }

  // Gérer l'ouverture/fermeture du menu de fuseau horaire
  timezoneButton.addEventListener('click', (e) => {
    e.stopPropagation();
    timezoneDropdown.classList.toggle('active');
    languageDropdown.classList.remove('active');
  });

  // Gérer la sélection de fuseau horaire
  timezoneDropdown.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-item')) {
      e.stopPropagation();
      const timezone = e.target.getAttribute('data-timezone');
      setTimezone(timezone);
      const selectedTzInfo = getCurrentTimezoneInfo();
      if (selectedTzInfo) {
        updateTimezoneDisplay(selectedTzInfo);
      }
      timezoneDropdown.classList.remove('active');
      time(); // Mettre à jour l'heure immédiatement
      date(); // Mettre à jour la date immédiatement
    }
  });

  // Fermer les menus en cliquant ailleurs
  document.addEventListener('click', () => {
    languageDropdown.classList.remove('active');
    timezoneDropdown.classList.remove('active');
  });
}

/**
 * Met à jour l'affichage du fuseau horaire
 * @function updateTimezoneDisplay
 * @param {Object} tzObj - Objet fuseau horaire avec value, label et utc
 * @returns {void}
 */
function updateTimezoneDisplay(tzObj) {
  const timezoneText = document.getElementById('timezoneText');
  if (!timezoneText) return;
  
  // Afficher le nom de la capitale avec l'UTC
  timezoneText.textContent = `${tzObj.label} - ${tzObj.utc}`;
}

/**
 * Initialise l'effet de parallaxe au mouvement de la souris
 * @function initParallax
 * @returns {void}
 * @since 1.0.0
 */
function initParallax() {
  document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('.clock-container');
    if (!container) return;
    
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    container.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Initialiser i18next puis l'application
initI18n().then(() => {
  // Définir le callback pour mettre à jour la date lors du changement de langue
  setDateUpdateCallback(date);
  
  // Initialisation de l'application
  initApp();
  
  // Initialiser les particules et les contrôles au chargement
  window.addEventListener('load', () => {
    createParticles();
    initControls();
    initParallax();
    // Mettre à jour les traductions après le chargement
    setTimeout(() => {
      updateTranslations();
    }, 100);
  });
}).catch(err => {
  console.error('Erreur lors de l\'initialisation de i18next:', err);
  // Continuer quand même avec l'application
  initApp();
  window.addEventListener('load', () => {
    createParticles();
    initControls();
    initParallax();
  });
});
