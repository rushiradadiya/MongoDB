const {ObjectID} =require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Lanet} = require('./../server/models/lanet');

var id = '5c1492735781160120db8980';

if(!ObjectID.isValid(id)){
    console.log('Id not Vaild');
}

//Lanet.find({
//    text: 'Rushita'
//}).then((lanets)=>{
//    console.log('Lanet',lanets);
//});
//
//Lanet.findOne({
//   text: 'Rushita'
//}).then((lanet)=>{
//    console.log('Lanet',lanet);
//});


Lanet.findById(id).then((lanet)=>{
    if(!lanet)
        {
            return console.log('ID not Found')
        }
    console.log('Lanet by id',JSON.stringify(lanet,undefined,2))
}).catch((err)=>{
    console.log(err);
});