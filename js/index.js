/**
 * @fileoverview Point d'entrée principal de l'application horloge digitale
 * @module index
 * @requires {module} time - Module de gestion de l'heure
 * @requires {module} date - Module de gestion de la date
 * @version 1.0.0
 * @author Flozze
 */

// Importation des fonctions depuis les modules
import { time } from './time.js';
import { date } from './date.js';

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

// Initialisation de l'application
initApp();
