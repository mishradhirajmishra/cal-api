const mongoose  = require('mongoose');
Schema = mongoose.Schema;

const bookingSchema = mongoose.Schema({
    date:{type:String,required:true}, 
    time:{type:String,required:true}, 
    onerId:{type: Schema.Types.ObjectId, ref: 'user'},  
    serviceId:{type: Schema.Types.ObjectId, ref: 'service'},
    userId:{type: Schema.Types.ObjectId, ref: 'user'},      
    userDetail:{
        firstName:{type:String,required:true}, 
        lastName:{type:String,required:true}, 
        email:{type:String,required:true} ,
        phone:{type:String} 
      },      
     },{
        timestamps: true
     })

module.exports = mongoose.model('booking',bookingSchema);