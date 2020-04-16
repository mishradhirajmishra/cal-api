const mongoose  = require('mongoose');
Schema = mongoose.Schema;
const packagHistoryeSchema = mongoose.Schema({
    userId:{type:String, required:true},  
    packageId:{type: Schema.Types.ObjectId, ref: 'package'},
    startDate:{type:Date,default:Date.now},  
    endDate:{type:Date,},
    status:{type:String,default:'active'}      
},{
    timestamps: true
 });
module.exports = mongoose.model('packagehistory',packagHistoryeSchema);