const securityLogs = [
    {
        type: "LOGIN_SUCCESS",
        message: "User logged in successfully",
        risk: "LOW"
    },
    {
        type: "NEW_DEVICE",
        message: "Login from new device detected",
        risk: "MEDIUM"
    },
    {
        type: "MULTIPLE_FAILED_LOGIN",
        message: "Multiple failed login attempts",
        risk: "HIGH"
    }
];

module.exports = securityLogs;