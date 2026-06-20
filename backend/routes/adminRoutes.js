const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");



const {

    getAdminDashboard,

    getPendingKyc,

    approveKyc,

    rejectKyc

} = require("../controllers/adminController");




// Admin Dashboard

router.get(

    "/dashboard",

    authMiddleware,

    adminMiddleware,

    getAdminDashboard

);




// Pending KYC

router.get(

    "/pending-kyc",

    authMiddleware,

    adminMiddleware,

    getPendingKyc

);




// Approve KYC

router.put(

    "/kyc/:id/approve",

    authMiddleware,

    adminMiddleware,

    approveKyc

);




// Reject KYC

router.put(

    "/kyc/:id/reject",

    authMiddleware,

    adminMiddleware,

    rejectKyc

);



module.exports = router;