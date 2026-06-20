const SecurityLog = require("../models/SecurityLog");


exports.getLogs = async(req,res)=>{

    try{

        const logs = await SecurityLog.find({
            userId:req.user.id
        })
        .sort({
            createdAt:-1
        });


        res.json({

            success:true,
            logs

        });


    }
    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};