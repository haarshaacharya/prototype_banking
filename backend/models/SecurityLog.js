const mongoose = require("mongoose");


const securityLogSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    eventType:{
        type:String,
        required:true
    },


    description:{
        type:String
    },


    risk:{
        type:String,
        enum:[
            "LOW",
            "MEDIUM",
            "HIGH"
        ],
        default:"LOW"
    },


    // Extra information

    ip:{
        type:String
    },


    deviceId:{
        type:String
    },


    createdAt:{
        type:Date,
        default:Date.now
    }


});


module.exports =
mongoose.model(
    "SecurityLog",
    securityLogSchema
);