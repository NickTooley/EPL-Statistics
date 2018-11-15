var express = require ('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose');
var Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

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

