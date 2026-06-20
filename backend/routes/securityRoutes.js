const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const SecurityLog = require("../models/SecurityLog");



router.get("/", authMiddleware, async(req,res)=>{


    try{


        const logs = await SecurityLog.find({

            userId:req.user.id

        })
        .sort({

            createdAt:-1

        });



        const threats = await SecurityLog.countDocuments({

            userId:req.user.id,

            risk:{
                $in:[
                    "HIGH",
                    "MEDIUM"
                ]
            }

        });



        const highThreats = await SecurityLog.countDocuments({

            userId:req.user.id,

            risk:"HIGH"

        });



        res.json({

            success:true,

            logs,

            threats,

            highThreats

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


});



module.exports = router;