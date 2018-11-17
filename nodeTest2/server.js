import { TeamName } from './db';
import config from './config';
import apiRouter from './api';

console.log(config);

var express = require ('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app)
const Sequelize = require('sequelize');
const pginit = require('pg');
const pginit2 = require('pg-hstore');
const parse = require('csv-parse');
var fs = require('fs');
var csv = require('fast-csv');
// require("babel-core").transform("code", options);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

app.set('view engine', 'ejs');

// global controller
app.get('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin' , '*' );
    next(); 
});

app.use('/api', apiRouter);
app.use(express.static('public'));

app.get('/test', (req, res)=> {
    res.render('index');
})


app.get('/leaguedata', (req, res)=>{
    TeamName.findAll({order: [['teamName', 'ASC']]}).then(teamData => {
        var type = req.query.type;
        res.send(teamData);        
        
    })
})

var server = http.listen(config.port, () => {
    console.log('server is listening on port ', server.address().port)
});

