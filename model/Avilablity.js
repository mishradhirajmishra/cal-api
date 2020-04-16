const mongoose  = require('mongoose');
Schema = mongoose.Schema;

const avilablitySchema = mongoose.Schema({
    title:{type:String,required:true}, 
    bookingSlot:[], 
    date:{type:String,required:true}, 
    userId:{type: Schema.Types.ObjectId, ref: 'user'},  
    serviceId:{type: Schema.Types.ObjectId, ref: 'service'},   
    orgin:{type:String,default:"fromDatabase"} 
},{
    timestamps: true
 })

module.exports = mongoose.model('avilablity',avilablitySchema);