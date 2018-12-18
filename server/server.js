require('./config/config.js');
const _= require('lodash');
const express = require('express');
const bodyParser = require('body-parser')
const {ObjectID} =require('mongodb');
var {mongoose} = require('./db/mongoose.js');
const port = process.env.PORT || 3000;
var {Lanet} = require('./models/lanet');
var {User} = require('./models/user');
var app = express();

console.log(port);
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



app.delete('/lanet/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
//Lanet.findOneAndRemove({_id:'5c14e6f1003a8b040cc13880'}).then((lanet)=>{
//  console.log(lanet);
//});
Lanet.findByIdAndRemove(id).then((lanet)=>{
    if(!lanet){
        return res.status(404).send();
    }
    res.send(lanet);
}).catch((e)=>{
    res.status(400).send();
});
    
    
});

app.patch('/lanet/:id',(req,res)=>{
    
   //console.log(body);
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
      
      if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    if(_.isBoolean(body.completed)&&body.completed)
        {
            body.completedAt = new Date().getTime();
        }
    else{
        body.completed = false;
        body.completedAt = null;
    }
    
    Lanet.findByIdAndUpdate(id,{$set:body},{new:true}).then((lanet)=>{
        
        if(!lanet){
            return res.status(404).send();
        }
           res.send(lanet);
    }).catch((e)=>{
        res.status(400).send();
    });
 
    
})


app.listen(port,() =>{
    console.log(`Strated up to port ${port}`);
});

module.exports = {app};