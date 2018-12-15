const {ObjectID} =require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Lanet} = require('./../server/models/lanet');

Lanet.remove({}).then((result)=>{
    console.log(result);
});



//Lanet.findOneAndRemove
//Lanet.findByIdAndRemove

Lanet.findOneAndRemove({_id:'5c14e6f1003a8b040cc13880'}).then((lanet)=>{
      console.log(lanet);
});
Lanet.findByIdAndRemove('5c14e6f1003a8b040cc13880').then((lanet)=>{
    console.log(lanet);
});