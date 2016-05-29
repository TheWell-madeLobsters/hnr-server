// Inclusione dipendenze
var express = require('express'); // express framework per web app
var bodyParser = require('body-parser'); // parser per json
// var couchbase = require("couchbase"); // couchbase driver

// Costanti
var SIT_SENSE_ROOT = "/sit_sense";
var SIT_SENSE_PORT = 3000;
var SIT_SENSE_USERNAME = "sit-sense";
var SIT_SENSE_PASSWORD = "g2YL8PIGEyeXE8MheKLE"

// Definizione delle API
var app = express();
app.use(bodyParser.json()); // per attivare il parsing json
app.disable('x-powered-by'); // impostazione di sicurezza per header

// Status
app.get(SIT_SENSE_ROOT + "/status", function(req, res) {
    console.log("Richiesta '/status' ricevuta");
    res.writeHead(200, {"Content-Type": "application/json"});
    var json = JSON.stringify({
        status: "OK",
        msg: "Aho', ecchime!"
    });
    res.end(json);
})

// Ricezione dati sedile
app.post(SIT_SENSE_ROOT + "/dati_sedile", function(req, res) {
    console.log("Richiesta ricezione dati ricevuta, contenuto: " + JSON.stringify(req.body));
    res.sendStatus(200);
});

// Connessione Couchbase
var cluster = new couchbase.Cluster("couchbase://40.69.29.211"); // couchbase e' sulla stessa macchina
var bucket = cluster.openBucket("sit-sense", function(err) {
    if(err) {
        console.error("Errore durante il tentativo di connessione al DB. Messaggio: " + err);
        process.exit(1);
    }
    console.log("Connessione al DB stabilita");

    // Creazione della Web app
    app.listen(3000, function () {
        console.log("SitSense Web App in ascolto sulla porta " + SIT_SENSE_PORT);
    });
});
