const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server.js');
var {ObjectID} = require('mongodb')

const {Lanet} = require('./../models/lanet.js');

const lanets=[{
    _id :new ObjectID(),
    text:'first test lanet'
},{
    _id :new ObjectID(),
   text:'second test lanet' ,
    completed :true,
    completedAt : 168
    
}];



beforeEach((done)=>{
    Lanet.remove({}).then(()=>{
       
       return Lanet.insertMany(lanets);
    }).then(() => done());
});


describe('POST/lanet',() =>{
it('should create a new lanet ',(done)=>{
    var text = 'Test lanet text';
       request(app)
       .post('/lanet')
        .send({text})
        .expect(200)
        .expect((res)=>{
           expect(res.body.text).toBe(text);
       })
        .end((err,res)=>{
           if(err)
               {
                   return done(err);
               }
           Lanet.find({text}).then((lanet)=>{
               expect(lanet.length).toBe(1);
               expect(lanet[0].text).toBe(text);
               done();
           }).catch((e)=>done(e));
       });
    });

    
    it('should not create lanet with invaild body data',(done)=>{
        request(app)
        .post('/lanet')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err)
                {
                    return done(`Radadiya ${err}`);
                }
            Lanet.find().then((lanet)=>{
                expect(lanet.length).toBe(2);
                done();
            }).catch((e)=>done(`rushita ${e}`));
        });
    });    
 });


describe('GET /lanet',()=>{
    it('should get all lanet data',(done)=>{
        request(app)
        .get('/lanet')
        .expect(200)
        .expect((res) =>{
            expect(res.body.lanet.length).toBe(2);
        })
        .end(done);
    });
});


describe('GET /lanet/:id',()=>{
    it('should return lanet data',(done)=>{
         
        request(app)
        .get(`/lanet/${lanets[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) =>{
            expect(res.body.lanet.text).toBe(lanets[0].text);
        })
        .end(done);
    });
    
    it('should return 404 if lanet not found',(done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`/lanet/${hexId}`)
        .expect(404)
        .end(done);
        
    });
    
    it('should return 404 if lanet non object found',(done)=>{
        request(app)
        .get('/lanet/123')
        .expect(404)
        .end(done);
        
    });
});


describe('DELETE /lanet/:id',() =>{
    it('should remove a lanet',(done)=>{
        var haxId = lanets[1]._id.toHexString();
         request(app)
        .delete(`/lanet/${haxId}`)
        .expect(200)
        .expect((res) =>{
        //console.log(res);   
           expect(res.body._id).toBe(haxId);
        })
        .end((err,res)=>{
             if(err)
                 {
                     return done(err);
                 }
             
             Lanet.findById(haxId).then((lanetData)=>{
                 expect(lanetData).toNotExist();
                 done();
             }).catch((e)=>done(e));
             
         });
    });
    
    
    it('should return 404 if lanet not found',(done)=>{
          var haxId = new ObjectID().toHexString();
         request(app)
        .delete(`/lanet/${haxId}`)
        .expect(404)
        .end(done)
    });
    
     it('should return 404 if object id not found',(done)=>{
         request(app)
        .delete('/lanet/123')
        .expect(404)
        .end(done);
        
    });
});




//update testing

describe('PATCH /lanet/:id',() =>{
    
    it('should update the lanet',(done)=>{
         var haxId = lanets[0]._id.toHexString();
        
        var text = 'This should be the new text';
         request(app)
        .patch(`/lanet/${haxId}`)
       .send({
             completed:true,
             text
         }) 
        .expect(200)
        .expect((res)=>{
             expect(res.body.text).toBe(text);
             expect(res.body.completed).toBe(true);
             expect(res.body.completedAt).toBeA('number');
         })
        .end(done);
    });
    
    
     it('should clear completedat when lanet is not completed ',(done)=>{
          var haxId = lanets[1]._id.toHexString();
        
        var text = 'This should be the new text !!';
         request(app)
        .patch(`/lanet/${haxId}`)
       .send({
             completed: false,
             text
         }) 
        .expect(200)
        .expect((res)=>{
             expect(res.body.text).toBe(text);
             expect(res.body.completed).toBe(false);
             expect(res.body.completedAt).toNotExist();
         })
        .end(done);
    });
    
})




