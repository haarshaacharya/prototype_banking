const User = require("../models/User");

const SecurityLog = require("../models/SecurityLog");

const Session = require("../models/Session");

const Kyc = require("../models/Kyc");





// ADMIN DASHBOARD DATA

exports.getAdminDashboard = async(req,res)=>{

    try{


        // Total Users

        const totalUsers = await User.countDocuments();





        // Verified KYC Users

        const verifiedUsers = await User.countDocuments({

            kycStatus:"VERIFIED"

        });






        // Threat Alerts

        const threatAlerts = await SecurityLog.countDocuments({

            risk:{
                $in:[
                    "HIGH",
                    "MEDIUM"
                ]
            }

        });






        // High Risk Users

        const highRiskUsers = await SecurityLog.distinct(

            "userId",

            {

                risk:"HIGH"

            }

        );






        // Active Sessions

        const activeSessions = await Session.countDocuments({

            active:true

        });







        // Recent Security Logs

        const recentLogs = await SecurityLog.find()

        .sort({

            createdAt:-1

        })

        .limit(10)

        .populate(

            "userId",

            "name email role"

        );







        // Users List

        const usersList = await User.find()

        .select(

            "name email role kycStatus createdAt"

        )

        .sort({

            createdAt:-1

        });







        res.json({

            success:true,


            dashboard:{


                totalUsers,


                verifiedUsers,


                threatAlerts,


                highRiskUsers:
                highRiskUsers.length,


                activeSessions,


                recentLogs,


                usersList


            }


        });



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};











// GET PENDING KYC


exports.getPendingKyc = async(req,res)=>{

    try{


        const kycs = await Kyc.find({

            status:"Pending"

        })

        .populate(

            "user",

            "name email"

        );





        res.json({

            success:true,

            kycs

        });



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};
// APPROVE KYC


exports.approveKyc = async(req,res)=>{


    try{


        const kyc = await Kyc.findById(

            req.params.id

        );



        if(!kyc){


            return res.status(404).json({

                success:false,

                message:"KYC not found"

            });


        }





        // Update KYC Status

        kyc.status = "Verified";


        await kyc.save();







        // Update User KYC Status

        await User.findByIdAndUpdate(

            kyc.user,

            {

                kycStatus:"VERIFIED"

            }

        );






        // Security Log

        await SecurityLog.create({

            userId:kyc.user,

            eventType:"KYC_APPROVED",

            description:"KYC verified by admin",

            risk:"LOW"

        });







        res.json({

            success:true,

            message:"KYC Approved Successfully"

        });




    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};











// REJECT KYC


exports.rejectKyc = async(req,res)=>{


    try{


        const kyc = await Kyc.findById(

            req.params.id

        );



        if(!kyc){


            return res.status(404).json({

                success:false,

                message:"KYC not found"

            });


        }






        // Update KYC Status

        kyc.status = "Rejected";


        await kyc.save();







        // Update User Status

        await User.findByIdAndUpdate(

            kyc.user,

            {

                kycStatus:"REQUIRED"

            }

        );








        // Security Log

        await SecurityLog.create({

            userId:kyc.user,

            eventType:"KYC_REJECTED",

            description:"KYC rejected by admin",

            risk:"MEDIUM"

        });







        res.json({

            success:true,

            message:"KYC Rejected"

        });





    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};