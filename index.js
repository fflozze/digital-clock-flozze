/**
 * Met à jour l'affichage de l'heure actuelle.
 * Cette fonction récupère l'heure actuelle et la formate en utilisant le format local français.
 * Elle met ensuite à jour le contenu de l'élément HTML avec l'ID "time".
 */
function time() {
  // Crée un nouvel objet Date pour obtenir l'heure actuelle.
  let time = new Date();

  // Formate l'heure en utilisant le format local français.
  let heureMinuteSeconde = time.toLocaleTimeString("fr-FR");

  // Met à jour le contenu de l'élément HTML avec l'ID "time".
  document.getElementById("time").innerHTML = heureMinuteSeconde;
}

// Appelle la fonction time pour afficher l'heure immédiatement.
time();

// Met à jour l'heure toutes les secondes (1000 millisecondes).
setInterval(time, 1000);

/**
 * Met à jour l'affichage de la date actuelle.
 * Cette fonction récupère la date actuelle et la formate en utilisant le format local français.
 * Elle met ensuite à jour le contenu de l'élément HTML avec l'ID "date".
 */
function date() {
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

// Appelle la fonction date pour afficher la date immédiatement.
date();

// Met à jour la date une fois par jour (86400000 millisecondes).
setInterval(date, 86400000);
