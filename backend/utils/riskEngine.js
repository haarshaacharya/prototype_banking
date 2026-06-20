const calculateRiskScore = (user) => {
    let score = 10; // base safe score

    // Rule 1: new account risk
    const createdAt = new Date(user.createdAt);
    const now = new Date();
    const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);

    if (diffDays < 2) score += 30;
    else if (diffDays < 7) score += 15;

    // Rule 2: role risk
    if (user.role === "admin") score += 10;

    // Final cap
    if (score > 100) score = 100;

    return score;
};

const getRiskLevel = (score) => {
    if (score < 30) return "LOW";
    if (score < 70) return "MEDIUM";
    return "HIGH";
};

module.exports = { calculateRiskScore, getRiskLevel };