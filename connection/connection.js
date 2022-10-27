const mongoose=require('mongoose');

var connect=()=>{
    mongoose.connect('mongodb+srv://root:root@cluster0.rhtxjhj.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
      },(err,success)=>{
        if(err) throw err;
        else{  console.log('database connected 1 successfully');}

    })
}

module.exports=connect;