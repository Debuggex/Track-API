const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=mongoose.model('User');


const routes=express.Router();

routes.post('/signup', async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=new User({email,password});
        await user.save();
        
        const token=jwt.sign({userID:user._id},'MY_SECRET_KEY');
        res.send({token});
    }catch(err){
        return res.status(422).send(err.message);
    }
});
routes.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    
    
    if(!email || !password){
        return res.status(422).send({error:'Must Provide email or password'})
    }

    const user=await User.findOne({email});
    if(!user){
          return res.status(422).send({error:'Invalid Email or Password'})  
    }

    try{
        await user.comparepasswords(password);
        const token=jwt.sign({userID:user._id},'MY_SECRET_KEY');
        res.send({token});
    }catch(err){
        return res.status(422).send({error:'Invalid Email or Password'});
    }


    
})

module.exports=routes;