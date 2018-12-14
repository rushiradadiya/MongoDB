var mongoose = require('mongoose');

var Lanet = mongoose.model('Lanet',{
   text:{
       type:String,
       required:true,
       minlength: 1,
       trim:true
       
   },completed:{
       type:Boolean,
       default:false
   },completedAt:{
       type:Number,
       default:null
   }
});

//var newLanet = new Lanet({
//    text:'software Company'
//});
//
//newLanet.save().then((doc) =>{
//    console.log('save data',doc);
//},(e)=>{
//    console.log('Unable to save data');
//});

module.exports ={Lanet};
