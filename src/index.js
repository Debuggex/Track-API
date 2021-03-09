require('./Model/User');
require('./Model/Track');
var PORT = process.env.PORT||5000;
const express= require('express');
const mongoUri='mongodb+srv://<Username>:<Password>@cluster0.2kptq.mongodb.net/<dbname>?retryWrites=true&w=majority'
const app=express();
const authroutes=require('./routes/authroutes');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const trackauth=require('../src/routes/trackroutes');
const requireauths = require('./middlewares/requireauths');

app.use(bodyparser.json());
app.use(authroutes);
app.use(trackauth);
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log('Connected to Mongo DB');
});
mongoose.connection.on('error',(err)=>{
    console.log('Error Recieved',err);
});

app.get('/',requireauths,(req,res)=>{
    
    res.send(`Your Email is ${req.user.email}`);
});

app.listen(PORT,()=>{
    console.log("Listening on Port 3000");
})
