const express = require('express');
const axios = require('axios');
const cors = require('cors');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const utils = require('./utils');const voicevoxApp = express()

voicevoxApp.get('/*', (req, res) => {
    let url = 'https://napha-voicevox.loca.lt' + req.originalUrl.replace("/voicevoxApp","");

    axios.get(url, {
        headers: {
            'bypass-tunnel-reminder': 'true',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        Object.keys(response.headers).forEach(header => {
            res.setHeader(header, response.headers[header]);
        });
        res.status(response.status).send(response.data);
    }).catch(error => {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send(error.message);
        }
    });
});

voicevoxApp.post('/*', (req, res) => {
    let url = 'https://napha-voicevox.loca.lt' + req.originalUrl.replace("/voicevoxApp","");

    axios.post(url, req.body, {
        headers: {
            'bypass-tunnel-reminder': 'true',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        Object.keys(response.headers).forEach(header => {
            res.setHeader(header, response.headers[header]);
        });
        res.status(response.status).send(response.data);
    }).catch(error => {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send(error.message);
        }
    });
});

module.exports = voicevoxApp;
