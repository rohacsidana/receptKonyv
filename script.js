let receptek = []
$(function () {
    let sorID = 0
    let fajlNev = "adat.json"
    beolvas(fajlNev, tablazat, receptek)

})

function beolvas(fajlNev, callback, tomb) {
    fetch(fajlNev)
        .then((res) => res.json())
        .then((data) => {
            tomb = data.receptek
            callback(tomb)
        })
}
function tablazat(tomb) {
    console.log(tomb)

    var txt = "<table><tr><th>Név</th><th>Elkészítési idő</th><th>Hozzávalók</th></tr>"
    for (let i = 0; i < tomb.length; i++) {
        var hv = ""
        for (let j = 0; j < tomb[i].hozzavalok.length; j++) {
            hv += tomb[i].hozzavalok[j]
            if (j < tomb[i].hozzavalok.length - 1) {
                hv += ", "
            }
        }
        txt += `<tr>    <td class=thNev>${tomb[i].nev}</td>     <td>${tomb[i].elkIdo} perc</td>     <td>${hv}</td>      </tr>`
    }
    txt += "</table>"
    $("article").append(txt)
    $("article table").addClass("tablazat")
    $("article").addClass("article")
    kattintas(tomb)
}
function kattintas(tomb) {
    $("article").append("<div class=betolt></div>")
    $("td.thNev").on("click", function () {
        for (let i = 0; i < tomb.length; i++) {
            if ($(this).html() == tomb[i].nev) {
                $(".betolt").html("<img class=kep>")
                $("article img").attr("src",`kepek/${tomb[i].kepSrc}`)
            }
        }
    })
}