import { TeamName } from './db';
import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
var app = express();
var http = require('http').Server(app)
import nunjucks from 'nunjucks';
// require("babel-core").transform("code", options);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

var _templates = process.env.NODE_PATH ? process.env.NODE_PATH + '/templates' : 'templates' ;

nunjucks.configure( _templates, {
    autoescape: true,
    cache: false,
    express: app
} ) ;

app.engine( 'html', nunjucks.render );
app.set('view engine', 'html');

// global controller
app.get('/*',(req, res, next) => {
    res.header('Access-Control-Allow-Origin' , '*' );
    next(); 
});

app.use('/api', apiRouter);
app.use(express.static('public'));

app.get('/test', (req, res)=> {
    res.render('base');
})


app.get('/leaguedata', (req, res)=>{
    TeamName.findAll({order: [['teamName', 'ASC']]}).then(teamData => {
        var type = req.query.type;
        res.send(teamData);        
        
    })
})

app.use(function(req, res, next){
    res.status(404);
    res.render('404', { url: req.url });
    return;
})

app.use(function(error, req, res, next) {
    res.render('500', 500);
 });

var server = http.listen(config.port, () => {
    console.log('server is listening on port ', server.address().port)
});

