/**
 * @fileoverview Module gérant l'affichage et la mise à jour de la date
 * @module date
 * @requires {HTMLElement} date - L'élément HTML avec l'ID "date" pour afficher la date
 * @requires {module} timezone - Module de gestion des fuseaux horaires
 * @version 1.0.0
 * @author Flozze
 */

import { getTimezone } from './timezone.js';

/**
 * Obtient le code de langue actuel
 * @function getCurrentLanguage
 * @returns {string} Code de langue (fr, de, es, en)
 */
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'fr';
}

/**
 * Met à jour l'affichage de la date actuelle.
 * Cette fonction récupère la date actuelle dans le fuseau horaire sélectionné
 * et la formate selon la langue choisie.
 * Elle met ensuite à jour le contenu de l'élément HTML avec l'ID "date".
 * 
 * @function date
 * @returns {void}
 * @throws {Error} Si l'élément HTML avec l'ID "date" n'existe pas
 * @example
 * // Appel de la fonction
 * date();
 * // Mise à jour une fois par jour
 * setInterval(date, 86400000);
 * 
 * @since 1.0.0
 */
export function date() {
  const dateElement = document.getElementById("date");
  if (!dateElement) return;

  const timezone = getTimezone();
  const language = getCurrentLanguage();
  
  // Crée un nouvel objet Date pour obtenir la date actuelle.
  const now = new Date();

  // Détermine la locale selon la langue
  const locale = language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : 'en-US';

  // Formate la date en utilisant le format local selon la langue avec des options pour afficher le jour de la semaine, le jour du mois, le mois et l'année.
  const jourMoisAns = now.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: timezone
  });

  // Met à jour le contenu de l'élément HTML avec l'ID "date".
  dateElement.innerHTML = jourMoisAns;
} 