

(function (globals) {

  var django = globals.django || (globals.django = {});


  django.pluralidx = function (count) { return (count == 1) ? 0 : 1; };



  /* gettext library */

  django.catalog = {
    "%(count)s results": "%(count)s Ergebnisse",
    "All %(count)s results": "Alle %(count)s Ergebnisse",
    "Cancel": "Abbrechen",
    "Click to insert your credentials": "Klicken Sie, um Ihre Anmeldedaten einzuf\u00fcgen.",
    "Could not load project credentials.": "Die Projektanmeldedaten konnten nicht geladen werden.",
    "Could not load projects list.": "Projektliste konnte nicht geladen werden.",
    "Could not save your project selection.": "Ihre Projektauswahl konnte nicht gespeichert werden.",
    "Credentials": "Anmeldedaten",
    "History Preferences": "Verlaufseinstellungen",
    "How can we improve this page?": "Wie k\u00f6nnen wir diese Seite verbessern?",
    "Insert": "Einf\u00fcgen",
    "Insert credential": "Anmeldedaten einf\u00fcgen",
    "It doesn't have what I need.": "Sie enth\u00e4lt nicht die ben\u00f6tigten Informationen.",
    "It's inaccurate.": "Sie ist ungenau.",
    "Loading credentials...": "Anmeldedaten werden geladen...",
    "Loading projects...": "Projekte werden geladen...",
    "Loading your history...": "Verlauf wird geladen...",
    "Most Recently Visited": "Zuletzt besucht",
    "My Most Visited": "Meistbesuchte Seiten",
    "Other (use text area above)": "Sonstiges (Textbereich oben verwenden)",
    "Project": "Projekt",
    "Sign in to insert your credentials.": "Melden Sie sich an, um Ihre Anmeldedaten einzuf\u00fcgen.",
    "Sign in to view your recently visited pages.": "Melden Sie sich an, um Ihre k\u00fcrzlich besuchten Seiten anzusehen.",
    "Sorry. We couldn't load the credentials for this project. You can visit the %(start_link)sDevelopers Console%(end_link)s to see them.": "Sorry. We couldn't load the credentials for this project. You can visit the %(start_link)sDevelopers Console%(end_link)s to see them.",
    "Sorry. We couldn't load your projects. You can visit the %(start_link)sDevelopers Console%(end_link)s to see them.": "Sorry. We couldn't load your projects. You can visit the %(start_link)sDevelopers Console%(end_link)s to see them.",
    "The Google Developers website now saves the pages you visit when you are logged into Google. You can quickly access them via the history icon at the top of the site. %(link_html)sManage History%(end_link_html)s": "Wenn Sie in Google angemeldet sind, werden die von Ihnen besuchten Seiten jetzt auf der Google Developers-Website gespeichert. \u00dcber das Verlaufssymbol oben auf der Website k\u00f6nnen Sie sie schnell aufrufen. %(link_html)sVerlauf verwalten%(end_link_html)s",
    "There's a typo, broken link, or layout problem.": "Sie enth\u00e4lt einen Tippfehler, einen fehlerhaften Link oder ein Problem mit dem Layout.",
    "This project has no appropriate credentials. You can add one in the %(start_link)sDevelopers Console%(end_link)s.": "This project has no appropriate credentials. You can add one in the %(start_link)sDevelopers Console%(end_link)s.",
    "Turn on %(begin_link_html)shistory%(end_link_html)s to view recently visited pages.": "Aktivieren Sie den %(begin_link_html)sVerlauf%(end_link_html)s, um die k\u00fcrzlich aufgerufenen Seiten einzublenden.",
    "You have no projects. You can create one in the %(start_link)sDevelopers Console%(end_link)s.": "You have no projects. You can create one in the %(start_link)sDevelopers Console%(end_link)s.",
    "Your browsing history on Google Developers will appear here.": "Hier wird der Verlauf Ihrer aufgerufenen Seiten auf Google Developers angezeigt."
  };

  django.gettext = function (msgid) {
    var value = django.catalog[msgid];
    if (typeof(value) == 'undefined') {
      return msgid;
    } else {
      return (typeof(value) == 'string') ? value : value[0];
    }
  };

  django.ngettext = function (singular, plural, count) {
    var value = django.catalog[singular];
    if (typeof(value) == 'undefined') {
      return (count == 1) ? singular : plural;
    } else {
      return value[django.pluralidx(count)];
    }
  };

  django.gettext_noop = function (msgid) { return msgid; };

  django.pgettext = function (context, msgid) {
    var value = django.gettext(context + '\x04' + msgid);
    if (value.indexOf('\x04') != -1) {
      value = msgid;
    }
    return value;
  };

  django.npgettext = function (context, singular, plural, count) {
    var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
    if (value.indexOf('\x04') != -1) {
      value = django.ngettext(singular, plural, count);
    }
    return value;
  };


  django.interpolate = function (fmt, obj, named) {
    if (named) {
      return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
    } else {
      return fmt.replace(/%s/g, function(match){return String(obj.shift())});
    }
  };


  /* formatting library */

  django.formats = {
    "DATETIME_FORMAT": "j. F Y H:i",
    "DATETIME_INPUT_FORMATS": [
      "%d.%m.%Y %H:%M:%S",
      "%d.%m.%Y %H:%M:%S.%f",
      "%d.%m.%Y %H:%M",
      "%d.%m.%Y",
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%Y-%m-%d"
    ],
    "DATE_FORMAT": "j. F Y",
    "DATE_INPUT_FORMATS": [
      "%d.%m.%Y",
      "%d.%m.%y",
      "%Y-%m-%d"
    ],
    "DECIMAL_SEPARATOR": ",",
    "FIRST_DAY_OF_WEEK": "1",
    "MONTH_DAY_FORMAT": "j. F",
    "NUMBER_GROUPING": "3",
    "SHORT_DATETIME_FORMAT": "d.m.Y H:i",
    "SHORT_DATE_FORMAT": "d.m.Y",
    "THOUSAND_SEPARATOR": ".",
    "TIME_FORMAT": "H:i",
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H:%M"
    ],
    "YEAR_MONTH_FORMAT": "F Y"
  };

  django.get_format = function (format_type) {
    var value = django.formats[format_type];
    if (typeof(value) == 'undefined') {
      return format_type;
    } else {
      return value;
    }
  };

  /* add to global namespace */
  globals.pluralidx = django.pluralidx;
  globals.gettext = django.gettext;
  globals.ngettext = django.ngettext;
  globals.gettext_noop = django.gettext_noop;
  globals.pgettext = django.pgettext;
  globals.npgettext = django.npgettext;
  globals.interpolate = django.interpolate;
  globals.get_format = django.get_format;

}(this));
