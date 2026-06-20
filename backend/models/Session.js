const mongoose = require("mongoose");


const sessionSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    deviceId:{
        type:String
    },


    ip:{
        type:String
    },


    userAgent:{
        type:String
    },


    active:{
        type:Boolean,
        default:true
    },


    createdAt:{
        type:Date,
        default:Date.now
    }


});

module.exports = mongoose.model(
    "Session",
    sessionSchema
);