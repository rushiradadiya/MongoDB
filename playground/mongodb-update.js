//const MongoClient =require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp1', (err, client) => {
    if(err){
        
     return console.log("can not connect to mongo db");}
    console.log("connection established");
    
    var db = client.db('TodoApp1');
    
 
    
    db.collection('Lanet').findOneAndUpdate({
        _id: new ObjectID('5c124c9c9b3ba01b3cf3ac0f')},
        {
            $set:{
                    complete:true                                 
                 }
        },{
        returnOriginal:false
    }).then((result) => {
        console.log(result);
    })
                                       
    
    
      db.collection('Lanet').findOneAndUpdate({
        _id: new ObjectID('5c124c9c9b3ba01b3cf3ac0f')},
        {
            $set:{
                    text:'Axi'
                 },
          $inc:{
              age:1
          }
        },{
        returnOriginal:false
    }).then((result) => {
        console.log(result);
    })
            
    
    
        
    });

    
    
  
    
   // client.close();
