const mongoose  = require('mongoose');
Schema = mongoose.Schema;
const userSchema = mongoose.Schema({
    // username:{type:String,required:true}, 
    firstName:{type:String,required:true},   
    lastName:{type:String,required:true}, 
    email:{type:String,required:true} ,
    phone:{type:String} ,
    password:{type:String,required:true} , 
    role:{type:String,default:'user'},   
    status:{type:String,default:'active'},   
    type:{type:String,default:'registred'}, 
    image:{type:String,default:'profile.jpg'},  
    paypalId:{type:String},  
    stripeId:{type:String},  
},{
    timestamps: true
 })

module.exports = mongoose.model('user',userSchema);