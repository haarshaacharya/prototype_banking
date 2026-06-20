const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(

{
    name:{
        type:String,
        required:true
    },


    email:{
        type:String,
        required:true,
        unique:true
    },


    password:{
        type:String,
        required:true
    },


    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },


    // Risk Based KYC Status

    kycStatus:{
        type:String,
        enum:[
            "PENDING",
            "VERIFIED",
            "REQUIRED"
        ],
        default:"PENDING"
    },


    // Trusted Devices

    devices:[
        {

            deviceId:{
                type:String
            },


            ip:{
                type:String
            },


            userAgent:{
                type:String
            },


            createdAt:{
                type:Date,
                default:Date.now
            }

        }
    ]


},

{
    timestamps:true
}


);


module.exports = mongoose.model(
    "User",
    userSchema
);