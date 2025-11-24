/**
 * @fileoverview Module gérant l'affichage et la mise à jour de la date
 * @module date
 * @requires {HTMLElement} date - L'élément HTML avec l'ID "date" pour afficher la date
 * @version 1.0.0
 * @author Flozze
 */

/**
 * Met à jour l'affichage de la date actuelle.
 * Cette fonction récupère la date actuelle et la formate en utilisant le format local français.
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
  // Crée un nouvel objet Date pour obtenir la date actuelle.
  let date = new Date();

  // Formate la date en utilisant le format local français avec des options pour afficher le jour de la semaine, le jour du mois, le mois et l'année.
  let jourMoisAns = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Met à jour le contenu de l'élément HTML avec l'ID "date".
  document.getElementById("date").innerHTML = jourMoisAns;
} 