function time() {
  let time = new Date();

  let heureMinuteSeconde = time.toLocaleTimeString("fr-FR");

  document.getElementById("time").innerHTML = heureMinuteSeconde;
}

time();

setInterval(time, 1000);

function date() {
  let date = new Date();

  let jourMoisAns = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  document.getElementById("date").innerHTML = jourMoisAns;
}

date();

setInterval(date, 1000);
