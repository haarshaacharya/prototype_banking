const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    calculateRiskScore,
    getRiskLevel
} = require("../utils/riskEngine");

const SecurityLog = require("../models/SecurityLog");
const Session = require("../models/Session");


// ================= REGISTER =================

exports.register = async(req,res)=>{

    try{

        const {
            name,
            email,
            password
        } = req.body;


        const userExists = await User.findOne({
            email
        });


        if(userExists){

            return res.status(400).json({

                success:false,

                message:"User already exists"

            });

        }


        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        const user = await User.create({

            name,

            email,

            password:hashedPassword

        });


        res.status(201).json({

            success:true,

            message:"User created successfully",

            user:{

                id:user._id,

                name:user.name,

                email:user.email

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





// ================= LOGIN =================

exports.login = async(req,res)=>{


    try{


        const {
            email,
            password
        } = req.body;



        const user = await User.findOne({
            email
        });



        if(!user){

            return res.status(400).json({

                success:false,

                message:"User not found"

            });

        }



        const isMatch = await bcrypt.compare(

            password,

            user.password

        );



        if(!isMatch){

            return res.status(400).json({

                success:false,

                message:"Invalid credentials"

            });

        }



        // AI RISK

        const riskScore = calculateRiskScore(user);


        const riskLevel = getRiskLevel(
            riskScore
        );



        const token = jwt.sign(

            {
                id:user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"7d"
            }

        );



        // ================= DEVICE DETECTION =================


        const deviceId = req.headers["user-agent"];


        const ip = req.ip;



        const existingDevice = user.devices?.find(

            device =>
            device.deviceId === deviceId

        );



        // DEBUG LOGS

        console.log(
            "DEVICE ID:",
            deviceId
        );


        console.log(
            "USER DEVICES:",
            user.devices
        );


        console.log(
            "EXISTING DEVICE:",
            existingDevice
        );



        let deviceRisk = riskLevel;
        
        // ================= RISK BASED KYC =================


if(deviceRisk === "HIGH"){


    user.kycStatus = "REQUIRED";


    await user.save();


}
else if(deviceRisk === "LOW"){


    user.kycStatus = "PENDING";


    await user.save();


}


        if(!existingDevice){


            console.log(
                "NEW DEVICE DETECTED"
            );



            await SecurityLog.create({

                userId:user._id,

                eventType:"NEW_DEVICE_DETECTED",

                description:
                "Login from new device detected",

                risk:"HIGH"

            });



            user.devices.push({

                deviceId,

                ip,

                userAgent:deviceId

            });


            await user.save();


            deviceRisk="HIGH";


        }

       // ================= LOGIN SUCCESS LOG =================


        await SecurityLog.create({

            userId:user._id,

            eventType:"LOGIN_SUCCESS",

            description:
            "User logged in successfully",

            risk:deviceRisk

        });
 
        // ================= CREATE ACTIVE SESSION =================

await Session.create({

    userId:user._id,

    deviceId,

    ip,

    userAgent:deviceId,

    active:true

});


        // ================= RESPONSE =================


        res.json({

            success:true,

            message:"Login successful",

            token,


            risk:{

                score:riskScore,

                level:deviceRisk

            },


            user:{

    id:user._id,

    name:user.name,

    email:user.email,

    role:user.role,

    kycStatus:user.kycStatus

}

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};





// ================= GET ME =================


exports.getMe = async(req,res)=>{


    try{


        const user = await User.findById(

            req.user.id

        )
        .select("-password");



        if(!user){


            return res.status(404).json({

                success:false,

                message:"User not found"

            });


        }



        const riskScore = calculateRiskScore(user);



        const riskLevel = getRiskLevel(

            riskScore

        );



        res.json({

            success:true,


            user,


            security:{

                riskScore,

                riskLevel

            }


        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


}; 
