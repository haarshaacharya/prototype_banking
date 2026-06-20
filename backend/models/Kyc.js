const mongoose = require("mongoose");


const kycSchema = new mongoose.Schema(

{
    user:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },


    aadhaar:{

        type:String,

        required:true

    },


    pan:{

        type:String,

        required:true

    },


    status:{

        type:String,

        enum:[

            "Pending",
            "Verified",
            "Rejected"

        ],

        default:"Pending"

    }

},

{
    timestamps:true
}

);


module.exports = mongoose.model(
    "Kyc",
    kycSchema
);