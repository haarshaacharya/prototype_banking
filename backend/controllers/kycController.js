const Kyc = require("../models/Kyc");


// Submit KYC

exports.submitKyc = async(req,res)=>{

    try{


        const {
            aadhaar,
            pan
        } = req.body;



        const existingKyc = await Kyc.findOne({

            user:req.user.id

        });



        if(existingKyc){

            return res.status(400).json({

                success:false,

                message:"KYC already submitted"

            });

        }





        const kyc = await Kyc.create({

            user:req.user.id,

            aadhaar,

            pan,

            status:"Pending"

        });





        res.status(201).json({

            success:true,

            message:"KYC submitted successfully. Waiting for approval",

            kyc

        });



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// Get My KYC

exports.getMyKyc = async(req,res)=>{


    try{


        const kyc = await Kyc.findOne({

            user:req.user.id

        });



        if(!kyc){


            return res.json({

                success:true,

                kyc:null

            });


        }




        res.json({

            success:true,

            kyc

        });



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};