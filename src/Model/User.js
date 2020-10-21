const mongoose=require('mongoose');
const schema=mongoose.Schema;
const bcrpt=require('bcrypt');


const userSchema=new schema({
    email:{
        type: String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified('password')){
        return next();
    }

    bcrpt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }
        bcrpt.hash(user.password,salt,(err,hash)=>{
            if(err){
                return next(err);
            }
            user.password=hash;
            next();
        })


    })

});

userSchema.methods.comparepasswords=function(candidatepassword){
    
    return new Promise((resolve,reject)=>{
        bcrpt.compare(candidatepassword,this.password,(err,ismatch)=>{
            if(err){
                return reject(err);
            }
            if(!ismatch){
                reject(false);
            }

            resolve(true);
        });    
    });
    
    
}
mongoose.model('User',userSchema);