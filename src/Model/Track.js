const mongoose=require('mongoose');

const pointschema=new mongoose.Schema({
    timestamp:Number,
    coords:{
        latitude:Number,
        longitude:Number,
        altitude:Number,
        accuracy:Number,
        heading:Number,
        speed:Number
    }
});


const trachschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        default:''
    },
    locations:[pointschema]

});

mongoose.model('Track',trachschema);