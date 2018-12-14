//const MongoClient =require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');
var obj = new ObjectID();

console.log(obj);
var user = {name:'rushita',age:20};
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp1', (err, client) => {
    if(err){
        
     return console.log("can not connect to mongo db");}
    console.log("connection established");
    
    var db = client.db('TodoApp1');
    
//    db.collection('Lanet').insertOne({text:'krupali', complete:true},   (err, result) => {
//        
//        if(err)
//        {
//          return console.log("Error while inserting", err);
//        }
//        
//        else {
//          console.log("Added ",JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
//        }
//    });
    
    
    client.close();
    });
