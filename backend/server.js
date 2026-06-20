const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");

// Routes

const securityRoutes = require("./routes/securityRoutes");
const kycRoutes = require("./routes/kycRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Express App

const app = express();

// Database

connectDB();

// Middleware

app.use(cors({

    origin:"http://localhost:5173",

    credentials:true

}));

app.use(express.json());

// Home Route

app.get("/", (req,res)=>{


    res.json({

        success:true,

        message:"CyberShield Backend Running 🚀"

    });


});

// Auth Routes

app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

// KYC Routes

app.use(
    "/api/kyc",
    kycRoutes
);

// Security Logs Routes

app.use(
    "/api/security",
    securityRoutes
);

// Session Routes

app.use(
    "/api/sessions",
    sessionRoutes
);

// Admin Routes

app.use(
    "/api/admin",
    adminRoutes
);

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});