const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server.js');
const {Lanet} = require('./../models/lanet.js');
beforeEach((done)=>{
    Lanet.remove({}).then(()=>done());
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
           Lanet.find().then((lanet)=>{
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
                expect(lanet.length).toBe(0);
                done();
            }).catch((e)=>done(`rushita ${e}`));
        });
    });    
 });