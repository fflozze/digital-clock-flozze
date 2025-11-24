/**
 * @fileoverview Module gérant l'affichage et la mise à jour de l'heure
 * @module time
 * @requires {HTMLElement} time - L'élément HTML avec l'ID "time" pour afficher l'heure
 * @requires {module} timezone - Module de gestion des fuseaux horaires
 * @version 1.0.0
 * @author Flozze
 */

import { getTimezone, getDateInTimezone } from './timezone.js';

/**
 * Obtient le code de langue actuel
 * @function getCurrentLanguage
 * @returns {string} Code de langue (fr, de, es, en)
 */
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'fr';
}

/**
 * Met à jour l'affichage de l'heure actuelle.
 * Cette fonction récupère l'heure actuelle dans le fuseau horaire sélectionné
 * et la formate selon la langue choisie.
 * Elle met ensuite à jour le contenu de l'élément HTML avec l'ID "time".
 * 
 * @function time
 * @returns {void}
 * @throws {Error} Si l'élément HTML avec l'ID "time" n'existe pas
 * @example
 * // Appel de la fonction
 * time();
 * // Mise à jour toutes les secondes
 * setInterval(time, 1000);
 * 
 * @since 1.0.0
 */
export function time() {
  const timeElement = document.getElementById("time");
  if (!timeElement) return;

  const timezone = getTimezone();
  const language = getCurrentLanguage();
  
  // Obtenir la date dans le fuseau horaire sélectionné
  const now = new Date();
  
  // Détermine la locale selon la langue
  const locale = language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : 'en-US';
  
  // Formater l'heure selon la langue et le fuseau horaire
  const heureMinuteSeconde = now.toLocaleTimeString(locale, {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // Met à jour le contenu de l'élément HTML avec l'ID "time".
  timeElement.innerHTML = heureMinuteSeconde;
} 