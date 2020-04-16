const mongoose  = require('mongoose');
Schema = mongoose.Schema;

const packageFeatureSchema = mongoose.Schema({
    name:{type:String,required:true}, 
    description:{type:String,required:true}  
},{
    timestamps: true
 });
module.exports = mongoose.model('packagefeature',packageFeatureSchema);