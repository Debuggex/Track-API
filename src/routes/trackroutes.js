const express=require('express');
const mongoose=require('mongoose');
const routes=express.Router();
const requireauths=require('../middlewares/requireauths');

const track =mongoose.model('Track');

routes.use(requireauths);
routes.get('/tracks',async(req,res)=>{
    const tracks=await track.find({userId:req.user._id});
    
    res.send(tracks);

});

routes.post('/tracks',async(req,res)=>{
    const {name,locations}=req.body;
    if(!name||!locations){
        return res.status(422).send({error:'You must Provide name and Locations'});
    }
    try{
        const tracks=new track({name,locations,userId:req.user._id});
        await tracks.save();
        res.send(tracks);
    }catch (err){
        return res.status(422).send({error:err.message});
    }    
});

module.exports=routes;
