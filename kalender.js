window.onload = function () {
  main();
};

function main() {
  changeTime(new Date().getTime());
}

function changeTime(timeToday) {
  // Grund-Daten
  let strDebug = "";
  let datToday = new Date();
  strDebug += "datToday: " + datToday.toDateString() + "<br/>"; // Ausgabe
  let datTodayGerman = getDateGerman(datToday);
  strDebug += "datTodayGerman: " + datTodayGerman + "<br/>"; // Ausgabe

  // Wochentag
  let weekday = datToday.getDay(); // ergibt den Tag der Woche als Zahl (von 0 = Sonntag bis 6 = Samstag)
  strDebug += "weekday: " + weekday + "<br/>"; // Ausgabe
  let weekdayGerman = getWeekdayGerman(weekday);
  strDebug += "weekdayGerman: " + weekdayGerman + "<br/>";

  // Monat
  let month = datToday.getMonth();
  strDebug += "month: " + month + "<br/>";
  let monthGerman = getMonthGerman(month);
  strDebug += "monthGerman: " + monthGerman + "<br/>";

  // Jahr
  let year = datToday.getFullYear();
  // Erster Kalendertag
  let lastOfMonth = new Date(
    datToday.getFullYear(),
    datToday.getMonth() + 1,
    0
  );
  // Bereschnumg für den letzen Tag des Monats
  let lastOfMonthWeekday = lastOfMonth.getDay();
  let daysGone = 7 - lastOfMonthWeekday;
  if (lastOfMonthWeekday == 0) {
    daysGone = 0;
  }
  // Feiertage

  let holidayArray = getHolidayArrayHessen(datToday);
  if (holidayArray.includes(datToday.getTime())) {
    holidayHTML = "Der " + datTodayGerman + " ist ein gesetzlicher Feiertag.";
  } else {
    holidayHTML = "Der " + datTodayGerman + " ist kein gesetzlicher Feiertag. ";
  }
  //berechnung für den letzen Kalendertag
  let lastDayOfCalendar = new Date(
    datToday.getFullYear(),
    datToday.getMonth() + 1,
    0 + daysGone
  );
  // Berechnung des wievielten Wochentages des Monats
  let wievielter = getWievielter(datToday);

  // Berechnung für den ersten Tag im Monat
  let firstOfMonth = new Date(datToday.getFullYear(), datToday.getMonth(), 1);
  let firstOfMonthWeekday = firstOfMonth.getDay();
  let daysBefore = firstOfMonthWeekday - 1;
  if (firstOfMonthWeekday == 0) {
    daysBefore = 6;
  }
  // erster Kalendertag
  let firstDayOfCalendar = new Date(
    datToday.getFullYear(),
    datToday.getMonth(),
    1 - daysBefore
  );
  // Ausgabe in das elDebug
  let elDebug = document.getElementById("debug");
  if (elDebug != null) {
    elDebug.innerHTML = strDebug;
  } else {
    console.log("Debug-Element nicht gefunden.");
  }

  let html = "<table>";
  html += "<thead>";
  html += "<tr>";
  html += '        <th colspan="8">' + monthGerman + "" + year + "</th>";
  html += "    </tr>";
  html += "    <tr>";
  html += '        <th class="kw">KW</th>';
  html += '        <th class="mo">Mo</th>';
  html += '        <th class="di">Di</th>';
  html += '        <th class="mi">Mi</th>';
  html += '        <th class="do">Do</th>';
  html += '        <th class="fr">Fr</th>';
  html += '        <th class="sa">Sa</th>';
  html += '        <th class="so">So</th>';
  html += "    </tr>";
  html += "</thead>";

  let d;
  for (
    d = firstDayOfCalendar;
    d <= lastDayOfCalendar;
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
  ) {
    html += getHtmlForOneDay(d, new Date(), holidayArray);
  }

  html += "</table>";
  // Funktionen in html einfügen

  document.getElementById("aktuellesDatum").innerHTML = datTodayGerman;
  document.getElementById("aktuellesDatum1").innerHTML = datTodayGerman;
  document.getElementById("aktuellesDatum2").innerHTML = datTodayGerman;
  document.getElementById("monthGerman").innerHTML = monthGerman;
  document.getElementById("weekdaysGerman").innerHTML = weekdayGerman;
  document.getElementById("weekdaysGerman1").innerHTML = weekdayGerman;
  document.getElementById("monthGerman1").innerHTML = monthGerman;
  document.title = "Kalenderblatt vom " + datTodayGerman;
  document.getElementById("kalenderblatt").innerHTML = html;
  document.getElementById("wievielter").innerHTML = wievielter;
}
// Aktuelles Datum
function getDateGerman(date) {
  let day = date.getDate();
  let month = date.getMonth();
  month = month + 1; // Warum auch immer ... Javascript speichert Monate 0-basiert, also 0 = Januar, 11 = Dezember, daher hier Korrektur + 1
  let year = date.getFullYear();
  // Man beachte: Man könnte hier nachfolgend nach dem if {} benutzen, aber da es sich nur um EINE nachfolgende Anweisung handelt, geht es auch so
  if (String(day).length == 1) day = "0" + day;
  // Nachfolgend alternativ MIT Klammern
  if (String(month).length == 1) {
    month = "0" + month;
  }
  let dateGerman = day + "." + month + "." + year;
  return dateGerman;
}
// Wochentag Auf deutsch in den Text  schreiben
function getWeekdayGerman(weekdayIndex) {
  let weekdaysGerman = [
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
  let day = date.getDate();
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

function getCalendarweek(date) {
  let currentThursday = new Date(
    date.getTime() + (3 - ((date.getDay() + 6) % 7)) * 86400000
  );
  let yearOfThursday = currentThursday.getFullYear();
  let firstThursday = new Date(
    new Date(yearOfThursday, 0, 4).getTime() +
      (3 - ((new Date(yearOfThursday, 0, 4).getDay() + 6) % 7)) * 86400000
  );
  let weekNumber = Math.floor(
    1 +
      0.5 +
      (currentThursday.getTime() - firstThursday.getTime()) / 86400000 / 7
  );
  return weekNumber;
}

function getWeekdayShortcut(date) {
  let weekday = getWeekdayGerman(date.getDay());
  weekday = weekday.substring(0, 2);
  weekday = weekday.toLowerCase();
  return weekday;
}

function getMonthGerman(monthIndex) {
  let arr = [
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
  return arr[monthIndex];
}

function getHtmlForOneDay(date, heute, holydayArray) {
  let html = "";
  let cssClass = "";
  let weekday = date.getDay();
  if (weekday == 1) {
    let weekNumber = getCalendarweek(date);
    html += "<tr>";
    html += '<td class ="kw">' + weekNumber + "</td>";
  }
  cssClass += " " + getWeekdayShortcut(date);
  if (holydayArray.includes(date.getTime())) {
    cssClass += " feiertag";
  }
  var heute = new Date();
  if (
    date.getMonth() == heute.getMonth() &&
    date.getDate() == heute.getDate()
  ) {
    cssClass += " heute";
  }

  html += '<td class = "' + cssClass + '">' + date.getDate() + "</td>";

  if (weekday == 0) {
    html += "</td>";
  }
  return html;
}

function getHolidayArrayHessen(date) {
  let year = date.getFullYear();
  let array = [];
  array.push(new Date(year - 1, 11, 25).getTime()); // 1. Weihnachtstag Vorjahr
  array.push(new Date(year - 1, 11, 26).getTime()); // 2. Weihnachtstag Vorjahr
  array.push(new Date(year, 0, 1).getTime()); // Neujahr
  array.push(new Date(year, 4, 1).getTime()); // Tag der Arbeit
  array.push(new Date(year, 9, 3).getTime()); // Tag der Dt. Einheit
  array.push(new Date(year, 11, 25).getTime()); // 1. Weihnachtstag
  array.push(new Date(year, 11, 26).getTime()); // 2. Weihnachtstag
  array.push(new Date(year + 1, 0, 1).getTime()); // Neujahr nächstes Jahr
  let osterSonntag = getEasterSunday(year);
  array.push(osterSonntag.getTime());
  let osterMontag = new Date(
    year,
    osterSonntag.getMonth(),
    osterSonntag.getDate() + 1
  );
  array.push(osterMontag.getTime());
  let christiHimmelfahrt = new Date(
    year,
    osterSonntag.getMonth(),
    osterSonntag.getDate() + 39
  );
  array.push(christiHimmelfahrt.getTime());
  let pfingstMontag = new Date(
    year,
    osterSonntag.getMonth(),
    osterSonntag.getDate() + 50
  );
  array.push(pfingstMontag.getTime());
  let fronLeichnam = new Date(
    year,
    osterSonntag.getMonth(),
    osterSonntag.getDate() + 60
  );
  array.push(fronLeichnam.getTime());
  return array;
}
function calendarHTML_footer() {
  html = "</tbody></table>";
  return html;
}

function getEasterSunday(Jahr) {
  // Erstellt von Ralf Pfeifer (www.arstechnica.de)
  // Falls ausserhalb des gültigen Datumsbereichs, kein Ergebnis zurueckgeben
  if (Jahr < 1970 || 2099 < Jahr) return null;
  var a = Jahr % 19;
  var d = (19 * a + 24) % 30;
  var Tag = d + ((2 * (Jahr % 4) + 4 * (Jahr % 7) + 6 * d + 5) % 7);
  if (Tag == 35 || (Tag == 34 && d == 28 && a > 10)) {
    Tag -= 7;
  }

  var OsterDatum = new Date(Jahr, 2, 22);
  OsterDatum.setTime(OsterDatum.getTime() + 86400000 * Tag);
  return OsterDatum;
}
