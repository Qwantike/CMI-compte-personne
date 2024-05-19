// helper function: log message to screen
var msg, temp;

function log(msg) {
    var ladate = new Date();
    var h = ladate.getHours();
    if (h < 10) { h = "0" + h }
    var m = ladate.getMinutes();
    if (m < 10) { m = "0" + m }
    var s = ladate.getSeconds();
    if (s < 10) { s = "0" + s }
    temp = msg;
    document.getElementById('log').innerHTML += h + ":" + m + ":" + s + " - " + temp + "<br>\n";
};
function mesure(msg) {
    temp = msg;
    document.getElementById("mesure").style.fontSize = "30px";
    document.getElementById('mesure').innerHTML = temp;
};

function get_appropriate_ws_url() {
    var pcol;
    var u = document.URL;
    /*
     * We open the websocket encrypted if this page came on an
     * https:// url itself, otherwise unencrypted
     */
    if (u.substring(0, 5) == "https") {
        pcol = "wss://";
        u = u.substr(8);
    } else {
        pcol = "ws://";
        if (u.substring(0, 4) == "http")
            u = u.substr(7);
    }
    u = u.split('/');
    /* + "/xxx" bit is for IE10 workaround */
    return pcol + u[0] + "/xxx";
}

// setup websocket with callbacks
var ws = new WebSocket(get_appropriate_ws_url());
ws.onopen = function () {
    log('CONNECT');
};
ws.onclose = function () {
    log('DISCONNECT');
};
ws.onmessage = function (event) {
    msg = event.data;
    log(msg);
    mesure(msg);
};

//Génération du graph 

// Créer un tableau pour stocker les mesures
var measurements = [];

// Créer un graphique vide
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Les étiquettes de l'axe des x (le temps)
        datasets: [{
            label: 'Nombre de personnes',
            data: [], // Les données pour l'axe des y (le nombre de personnes)
            borderColor: 'rgb(255, 255, 255)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Fonction pour ajouter une mesure au graphique
function addMeasurement(time, value) {
    measurements.push({ time: time, value: value });
    updateChart();
}

// Fonction pour mettre à jour le graphique
function updateChart() {
    // Réinitialiser les données du graphique
    myChart.data.labels = measurements.map(measurement => measurement.time);
    myChart.data.datasets[0].data = measurements.map(measurement => measurement.value);
    // Mettre à jour le graphique
    myChart.update();
}

// Exemple de récupération des mesures toutes les 5 minutes et ajout au graphique
setInterval(function () {
    // Supposons que vous récupérez la mesure de la variable 'mesure' toutes les minutes
    var time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    var value = parseInt(document.getElementById('mesure').innerHTML);
    addMeasurement(time, value);
}, 60000); // 60000 millisecondes = 1 minute
