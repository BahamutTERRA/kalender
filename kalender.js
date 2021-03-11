window.onload = function () {
  main();
};
function main() {
  // Grund-Daten
  var strDebug = "";
  var datToday = new Date();
  strDebug += "datToday: " + datToday.toDateString() + "<br/>"; // Ausgabe
  var datTodayGerman = getDateGerman(datToday);
  strDebug += "datTodayGerman: " + datTodayGerman + "<br/>"; // Ausgabe

  // Wochentag
  var weekday = datToday.getDay(); // ergibt den Tag der Woche als Zahl (von 0 = Sonntag bis 6 = Samstag)
  strDebug += "weekday: " + weekday + "<br/>"; // Ausgabe
  var weekdayGerman = getWeekdayGerman(weekday);
  strDebug += "weekdayGerman: " + weekdayGerman + "<br/>";

  // Monat
  var month = monthGerman.getMonthGerman();
  strDebug += "month: " + month + "<br/>";
  var monthGerman = getMonthGerma(month);
  strDebug += "monthGerman: " + monthGerman + "<br/>";

  // Ausgabe in das elDebug
  var elDebug = document.getElementById("debug");
  if (elDebug != null) {
    elDebug.innerHTML = strDebug;
  } else {
    console.log("Debug-Element nicht gefunden.");
  }
  document.getElementById("aktuellesDatum").innerHTML = datTodayGerman;
}

function getDateGerman(date) {
  var day = date.getDate();
  var month = date.getMonth();
  var month = month + ; // Warum auch immer ... Javascript speichert Monate 0-basiert, also 0 = Januar, 11 = Dezember, daher hier Korrektur + 1
  var year = date.getFullYear();
  // Man beachte: Man könnte hier nachfolgend nach dem if {} benutzen, aber da es sich nur um EINE nachfolgende Anweisung handelt, geht es auch so
  if (String(day).length == 1) day = "0" + day;
  // Nachfolgend alternativ MIT Klammern
  if (String(month).length == 1) {
    month = "0" + month;
  }
  var dateGerman = day + "." + month + "." + year;
  return dateGerman;
}

function getWeekdaysGerman(weekdayIndex) {
  var weekdaysGerman = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  return weekdaysGerman[weekdayIndex];
}
function getWievielter(date) {
  var day = date.getDate();
  if (day <= 7) {
    return "erste";
  } else if (day <= 14) {
    return "zweite";
  } else if (day <= 21) {
    return "dritte";
  } else if (day <= 28) {
    return "vierte";
  } else {
    return "fünfte";
  }
}
function getMonthGerman(monthIndex) {
  var month = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  return month[monthIndex];
}
