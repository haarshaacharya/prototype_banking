const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const Session = require("../models/Session");


// GET ACTIVE SESSIONS

router.get("/", authMiddleware, async(req,res)=>{

    try{


        const sessions = await Session.find({

            userId:req.user.id,

            active:true

        })
        .sort({
            createdAt:-1
        });



        res.json({

            success:true,

            count:sessions.length,

            sessions

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

});


module.exports = router;