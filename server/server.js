var express = require('express');
var bodyParser = require('body-parser')
const {ObjectID} =require('mongodb');
var {mongoose} = require('./db/mongoose.js');

var {Lanet} = require('./models/lanet');


var {User} = require('./models/user');
var app = express();
const port = process.env.PORT || 3000;


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
   //console.log(req);
   res.send({lanet});
   },(e)=>{
       res.status(400).send(e);
   }) ;
});

app.get('/lanet/:id',(req,res)=>{
    // console.log(req);
    var id = req.params.id;
    //validate
    //find by text
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Lanet.findById(id).then((lanet)=>{
        if (!lanet){
             return res.status(404).send();
        }
      
       res.send({lanet});
    }).catch((e)=>{
        res.status(400).send();
    });
    //res.send(req.params);
});

app.listen(port,() =>{
    console.log(`Strated up to port ${port}`);
});

module.exports = {app};