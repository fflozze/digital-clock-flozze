/**
 * @fileoverview Module gérant l'affichage et la mise à jour de l'heure
 * @module time
 * @requires {HTMLElement} time - L'élément HTML avec l'ID "time" pour afficher l'heure
 * @version 1.0.0
 * @author Flozze
 */

/**
 * Met à jour l'affichage de l'heure actuelle.
 * Cette fonction récupère l'heure actuelle et la formate en utilisant le format local français.
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
  // Crée un nouvel objet Date pour obtenir l'heure actuelle.
  let time = new Date();

  // Formate l'heure en utilisant le format local français.
  let heureMinuteSeconde = time.toLocaleTimeString("fr-FR");

  // Met à jour le contenu de l'élément HTML avec l'ID "time".
  document.getElementById("time").innerHTML = heureMinuteSeconde;
} 