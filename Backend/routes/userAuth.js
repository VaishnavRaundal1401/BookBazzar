const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
        
    if(token == null)
    {
        return res.status(401).json({message:"Authentication token required"});
    }

    jwt.verify(token, "bookStore789", (err, user) => {
        if(err)
        {
            return res.status(403).json({message:"Token Expired, please Sign-In again"});
        }
        req.user = user;
        next();
    });
};

module.exports = {authToken};