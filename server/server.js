var express = require('express');
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose.js');

var {Lanet} = require('./models/lanet');


var {User} = require('./models/user');
var app = express();

app.use(bodyParser.json())

app.post('/lanet',(req,res)=>{
    var lanet =new Lanet({
        text : req.body.text
    });
    
  lanet.save().then((doc)=>{
      res.send(doc);
  },(e) =>{
      res.status(400).send(e);
  });
});

app.get('/lanet',(req,res)=>{
   Lanet.find().then((lanet)=>{
       res.send({lanet});
   },(e)=>{
       res.status(400).send(e);
   }) ;
});


app.listen(3000,() =>{
    console.log('Started on port 3000');
});

module.exports = {app};