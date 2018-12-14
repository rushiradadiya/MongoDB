//const MongoClient =require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp1', (err, client) => {
    if(err){
        
     return console.log("can not connect to mongo db");}
    console.log("connection established");
    
    var db = client.db('TodoApp1');
//    db.collection('Lanet').find().count().then((count)=>{
//        console.log(count);
//       // console.log(JSON.stringify(docs,undefined,2));
//    },(err)=>{
//        console.log('unable to fetch data from lanet',err);
//    });

     db.collection('Lanet').find({text:'rushita'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
       // console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('unable to fetch data from lanet',err);
    });

    
   // client.close();
    });
