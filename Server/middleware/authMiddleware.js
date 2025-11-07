const jwt = require('jsonwebtoken');
const User = require('../model/user');


const authMiddleware = async(req,res,next) => {
    const token = req.cookies.token;
    
    try {
        if(!token) return res.status(401).json({error : "Token Not Available!"});

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if(!user) return res.status(404).json({error : "user not found!"});

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({error : "Invalid Token!"});
    }
};

module.exports = authMiddleware;