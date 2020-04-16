const mongoose  = require('mongoose');
Schema = mongoose.Schema;

const packageSchema = mongoose.Schema({
    name:{type:String,required:true}, 
    description:{type:String,required:true}, 
    price:{type:Number,required:true},  
    currencySymbol:{type:String,required:true},  
    noOfService:{type:Number,required:true},  
    noOfCalendar:{type:Number,required:true},  
    discount:{type:Number,required:true,default:0},  
    collectionPeriod:{type:String,required:true},  
    packageFeature:[{type: Schema.Types.ObjectId, ref: 'packagefeature'}],   
},{
    timestamps: true
 });
module.exports = mongoose.model('package',packageSchema);