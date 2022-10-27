const mongoose=require('mongoose');

var connect=()=>{
    mongoose.connect('mongodb://localhost:27017/usersdb',{
        useNewUrlParser: true,
        useUnifiedTopology: true
      },(err,success)=>{
        if(err) throw err;
        else{  console.log('database connected successfully');}

    })
}

module.exports=connect;