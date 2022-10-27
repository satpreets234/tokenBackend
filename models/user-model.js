const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const user=new mongoose.Schema({
    email:{type: String,required:true,unique:true},
    username:{type: String,required:true},
    password:{type: String,required:true}
})

user.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10);
    next();
})

module.exports=mongoose.model('user',user);