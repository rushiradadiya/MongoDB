//const MongoClient =require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp1', (err, client) => {
    if(err){
        
     return console.log("can not connect to mongo db");}
    console.log("connection established");
    
    var db = client.db('TodoApp1');
    
   //deldteMany 
//    db.collection('Lanet').deleteMany({text:'krupali'}).then((result)=>{
//        console.log(result);
//       // console.log(JSON.stringify(docs,undefined,2));
//    },(err)=>{
//        console.log('unable to fetch data from lanet',err);
//    });

    
    
      
   //deldteOne 
//    db.collection('Lanet').deleteOne({text:'abc'}).then((result)=>{
//        console.log(result);
//       // console.log(JSON.stringify(docs,undefined,2));
//    },(err)=>{
//        console.log('unable to fetch data from lanet',err);
//    });

//findOne And Delete
    
    
//     db.collection('Lanet').findOneAndDelete({ complete : false}).then((result)=>{
//        console.log(result);
//       // console.log(JSON.stringify(docs,undefined,2));
//    },(err)=>{
//        console.log('unable to fetch data from lanet',err);
//    });
//    
    
     //db.collection('Lanet').deleteMany({ text : 'abc'});
      db.collection('Lanet').findOneAndDelete({ text : 'Axi'}).then((result)=>{
      //  console.log(result);
      console.log(JSON.stringify(result,undefined,2));
    },(err)=>{
        console.log('unable to fetch data from lanet',err);
    });
    
    
   // client.close();
});
