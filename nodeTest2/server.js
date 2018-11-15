var express = require ('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose');
const Sequelize = require('sequelize');
const pginit = require('pg');
const pginit2 = require('pg-hstore');
const parse = require('csv-parse');
var fs = require('fs');
var csv = require('fast-csv');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

const sequelize = new Sequelize('mydb', 'nick', '.', {
    dialect: 'postgres'
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const TeamName = sequelize.define('team', {
    teamID: {
        type: Sequelize.STRING
    },
    teamName: {
        type: Sequelize.STRING
    },
    positions: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    points: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    wins: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    draws: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    losses: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    goalsfor: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    goalsagainst: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    goaldiff: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
});



const DataTypes = sequelize.define('datatypes', {
    typeName: {
        type: Sequelize.STRING
    },
    color: {
        type: Sequelize.STRING
    },
    scaleupper: {
        type: Sequelize.STRING
    },
    scalelower: {
        type: Sequelize.STRING
    }
})

var years = []

for(var i = 1993; i < 2019; i++){

    years.push(i);

}

const parser = parse({
    delimiter: ','
})

var initTeam = null;
var initID = null;
var positions = [];
var points = [];
var wins = [];
var draws = [];
var losses = [];
var goalsfor = [];
var goalsagainst = [];
var goaldiff = [];

TeamName.sync({force:true}).then(() => {
    fs.createReadStream('premdata.csv')
    .pipe(csv())
    .on('data', function(data){
        teamname = data[0];
        if (teamname != initTeam){
            console.log(teamname);
            if(initTeam != null){
                TeamName.create({
                            teamID: teamid,
                            teamName: initTeam,
                            positions: positions,
                            points: points,
                            wins: wins,
                            draws: draws,
                            losses: losses, 
                            goalsfor: goalsfor,
                            goalsagainst: goalsagainst,
                            goaldiff: goaldiff
                        });
            }

            initTeam = teamname;
            teamid = data[1];
            positions = [];
            points = [];
            wins = [];
            draws = [];
            losses = [];
            goalsfor = [];
            goalsagainst = [];
            goaldiff = [];

            for(var i = 0; i < years.length; i++){
                positions.push('21');
                points.push('0');
                wins.push('0');
                draws.push('0');
                losses.push('0');
                goalsfor.push('0');
                goalsagainst.push('0');
                goaldiff.push('0');
            }
        }else{
            var year = parseInt(data[2]);
            var index = years.indexOf(year);
            positions[index] = data[3];
            points[index] = data[10];
            wins[index] = data[4];
            draws[index] = data[5];
            losses[index] = data[6];
            goalsfor[index] = data[7];
            goalsagainst[index] = data[8];
            goaldiffnum = data[9];
            goaldiff[index] = goaldiffnum

        }
    })
    .on('end',function(data){
        TeamName.create({
            teamID: teamid,
            teamName: initTeam,
            positions: positions,
            points: points,
            wins: wins,
            draws: draws,
            losses: losses, 
            goalsfor: goalsfor,
            goalsagainst: goalsagainst,
            goaldiff: goaldiff
        });
        console.log("Read finished");
    });
});

mongoose.Promise = Promise

var dbUrl = 'mongodb://ntooley:user123@ds147391.mlab.com:47391/node-test-tooley'

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res)=>{
    Message.find({}, (err, messages)=>{
        res.send(messages);
    })
})

app.post('/messages', (req, res)=>{
    var message = new Message(req.body)

    message.save().then(() => {

        Message.findOne({message: 'badword'}, (err, censored)=>{
            if(censored){
            console.log('censored word find', censored)
            Message.remove({_id: censored.id}, (err) => {
                    console.log("removed bad word")
            })
        }
        })
         io.emit('message', req.body)
        res.sendStatus(200)
    }).catch((err) => {
        res.sendStatus(500)
        return console.error(err)
    })
    
})

io.on('connection', (socket) => {
    console.log('A user is connected')
})

mongoose.connect(dbUrl,{ useNewUrlParser: true }, (err) => {
    console.log('db connection', err)
})

var server = http.listen(3000, () => {
    console.log('server is listening on port ', server.address().port)
});

