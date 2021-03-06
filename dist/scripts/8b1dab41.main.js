(function() {
  var changeClientCounts, clientId, p, playInm, soundList, ws;

  soundList = ["10man", "atui6", "enjoo", "igaito", "kimoti", "n", "onashas", "sikei", "tanomuyo", "wan2", "19", "azz", "enjoyy", "ii", "kiso", "naite", "onegai", "sikore", "tasyou", "wan3", "1man", "bara", "fella", "iipenki", "kitanee", "nakaii", "osigoto", "sinouka", "tikaesi", "wasureteta", "24sai", "bbp", "foo", "iiyo", "kitu", "nakamani", "osikko", "siroino", "tintara", "wea", "2doto", "bbp2", "futotte", "iiyo2", "kizu", "nanisoreha", "osimai", "sitatukatte", "tohno", "wihi", "3nin", "beam", "fuzake", "ikasumi", "kobushi", "nante", "ossan", "siteha", "tuite", "world", "5man", "beer", "fuzakenja", "ikenaiyo", "koiyo", "naoki", "otiro", "snpino", "tukareta", "x2", "M", "benki", "gaki", "ikisugi", "koko", "nasake", "otita", "soreha", "tukkome", "yabee", "SNT", "bequiet", "gakusei", "ikizama", "kondou", "neemou", "otoko", "sou", "tukkome2", "yada", "TNPSK", "best", "geijyutu", "ikudo", "konjou", "nha", "otokonara", "soudayo", "tukkome3", "yada2", "a-mou", "bisi", "geijyutu2", "inm", "koukai", "nml", "otonasiku", "sounanoka", "tumanne", "yame", "aa", "boku", "geijyutu3", "inu", "ksg", "nna-", "otya", "sp", "tyara", "yame2", "aaaaa", "bokuha", "guara", "itai", "kubi", "no-n", "ou", "start", "tyara2", "yamete", "aaaaa2", "brbr", "ha", "itai2", "kurra", "nona", "oun", "sude", "tyousi", "yametekudasai", "abare", "brbr2", "ha2", "itai3", "kusee", "nonke", "papa", "sugee", "tyupa", "yareba", "adolf", "btp", "hahaha", "itai4", "kya", "nu", "papapa", "sugu", "u-u-", "yatai", "aitenjan", "cookie", "haitte", "itain", "kz", "ob", "parn", "sugumou", "u-u-2", "yattyaimasuka", "amai", "cry", "hayaku", "itaino", "mad", "obore", "pinpin", "suiei", "udk", "yo", "amefuto", "daijoubu", "hayaku2", "itee", "mannaka", "odore", "pon", "suimasen", "udk2", "yokatta", "ana1", "dainamo", "hayaku3", "iwana", "mata", "ohn", "qk", "suimasen2", "uee", "yokose", "anan", "dancee", "heiki", "jbjb", "matte", "oikmr", "qknohi", "suka", "uee2", "yoro", "anosa", "dddn", "heiten", "jijou", "mazui", "oikora", "qoqo", "suki", "ugo", "yotu", "aok", "demasuyo", "help", "jikan", "migite", "oil", "qora", "sukkiri", "umaina", "you", "arasi", "deteike", "hide", "kaesite", "mike", "ojisan", "rgr", "sweet", "umou", "ytr", "asita", "dokuji", "homo", "kangae", "miseteyaruyo", "ok", "s", "syouganai", "uresii", "yuruseru", "asouda", "dou", "homoka", "kanno", "mitokeyo", "okasi", "sabori", "syouganee", "urusee", "yuueki", "atai", "doumo", "honani", "kantyo", "moo", "okasiyo", "saikou", "syouhin", "utuzo", "atui", "dousitara", "honto", "kataku", "mooo", "okotte", "saraba", "syouhin2", "vanhouten", "atui2", "dousitaraii", "hontoni", "katte", "motto", "okujou", "seiron", "syouko", "voo", "atui3", "drink", "hontou", "kbs", "mozart", "omae", "sekai", "tabun", "wakannee", "atui4", "ee", "horahora", "ken", "muri", "omatase", "senpai", "tama", "wakatta", "atui5", "enjj", "icetea", "ketudase", "myonmyon", "omoeba", "sexy", "tamatte", "wan"];

  clientId = Math.floor(Math.random() * 100000);

  p = function(arg) {
    $("#status").html(arg);
    return console.log(arg);
  };

  ws = new WebSocket("ws://lab.cnosuke.com:55555");

  ws.onclose = function() {
    return p("closed.");
  };

  ws.onopen = function() {
    return p("connected.");
  };

  changeClientCounts = function(c) {
    return $("#howmany").html(c);
  };

  playInm = function(file) {
    var audio, file_path;
    p("play: " + file);
    file_path = './sounds/' + file + ".mp3";
    audio = new Audio(file_path);
    return audio.play();
  };

  $.map(soundList, function(n, i) {
    var el;
    el = $("<button/>").html(n);
    $('.container').append($("<li/>").addClass("inmli").append(el));
    return el.click(function() {
      p('click button');
      playInm(n);
      return ws.send(JSON.stringify({
        "clientId": clientId,
        "name": n,
        "event": "playInm"
      }));
    });
  });

  ws.onmessage = function(evt) {
    var obj;
    p("recieving");
    obj = JSON.parse(evt.data);
    p(obj);
    if (obj.event === "changeClientCounts") {
      return changeClientCounts(obj.clientCounts);
    } else {
      if (obj.cliendId !== clientId) {
        return playInm(obj.name);
      }
    }
  };

  $("#inm_text").autocomplete({
    source: soundList,
    delay: 100,
    autoFocus: true,
    select: function(event, ui) {
      var n;
      n = ui.item.value;
      playInm(n);
      return ws.send(JSON.stringify({
        "clientId": clientId,
        "name": n,
        "event": "playInm"
      }));
    }
  });

}).call(this);
