/**
 * @fileoverview Configuration i18next pour les traductions multilingues
 * @module i18n
 * @version 1.0.0
 * @author Flozze
 */

// Ressources de traduction
const resources = {
  fr: {
    translation: {
      "back": "Retour",
      "selectLanguage": "Sélectionner la langue",
      "selectTimezone": "Sélectionner le fuseau horaire",
      "timezone": "Fuseau horaire",
      "language": "Langue"
    }
  },
  de: {
    translation: {
      "back": "Zurück",
      "selectLanguage": "Sprache auswählen",
      "selectTimezone": "Zeitzone auswählen",
      "timezone": "Zeitzone",
      "language": "Sprache"
    }
  },
  es: {
    translation: {
      "back": "Volver",
      "selectLanguage": "Seleccionar idioma",
      "selectTimezone": "Seleccionar zona horaria",
      "timezone": "Zona horaria",
      "language": "Idioma"
    }
  },
  en: {
    translation: {
      "back": "Back",
      "selectLanguage": "Select language",
      "selectTimezone": "Select timezone",
      "timezone": "Timezone",
      "language": "Language"
    }
  }
};

// Variable pour stocker la fonction de callback de mise à jour de date
let dateUpdateCallback = null;

/**
 * Initialise i18next
 * @function initI18n
 * @returns {Promise<void>}
 */
export function initI18n() {
  return new Promise((resolve, reject) => {
    if (typeof i18next === 'undefined') {
      reject(new Error('i18next n\'est pas chargé'));
      return;
    }

    i18next.init({
      lng: localStorage.getItem('language') || 'fr',
      fallbackLng: 'fr',
      resources: resources,
      interpolation: {
        escapeValue: false
      }
    }, (err, t) => {
      if (err) {
        console.error('Erreur lors de l\'initialisation de i18next:', err);
        reject(err);
        return;
      }
      // Mettre à jour les éléments traduits
      updateTranslations();
      resolve();
    });
  });
}

/**
 * Définit le callback pour mettre à jour la date
 * @function setDateUpdateCallback
 * @param {Function} callback - Fonction de mise à jour de la date
 * @returns {void}
 */
export function setDateUpdateCallback(callback) {
  dateUpdateCallback = callback;
}

/**
 * Met à jour tous les éléments traduits dans la page
 * @function updateTranslations
 * @returns {void}
 */
export function updateTranslations() {
  if (typeof i18next === 'undefined') return;
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18next.t(key);
  });
  
  // Mettre à jour les attributs aria-label
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    element.setAttribute('aria-label', i18next.t(key));
  });
}

/**
 * Change la langue de l'application
 * @function changeLanguage
 * @param {string} lang - Code de la langue (fr, de, es, en)
 * @returns {void}
 */
export function changeLanguage(lang) {
  if (typeof i18next === 'undefined') return;
  
  i18next.changeLanguage(lang, (err, t) => {
    if (err) {
      console.error('Erreur lors du changement de langue:', err);
      return;
    }
    localStorage.setItem('language', lang);
    updateTranslations();
    // Mettre à jour l'affichage de la date avec la nouvelle langue
    if (dateUpdateCallback) {
      dateUpdateCallback();
    }
  });
}

/**
 * Obtient la langue actuelle
 * @function getCurrentLanguage
 * @returns {string} Code de la langue actuelle
 */
export function getCurrentLanguage() {
  if (typeof i18next === 'undefined') {
    return localStorage.getItem('language') || 'fr';
  }
  return i18next.language || 'fr';
}

