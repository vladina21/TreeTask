import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protectRoute = async(req, res, next) => {
    try{
        let token = rwq.cookie.token;

        if(token){
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const response = await User.findById(decodedToken.userId).select("isAdmin email");
            req.user = {
                email: response.email,
                isAdmin : response.isAdmin,
                userId: decodedToken.userId,
            };

            next();
        };

    }catch(error){
        console.log(error);
        res.status(401);
        throw new Error("Not authorized. Try login again.");
    }
};


const isAdminRoute = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error("Not authorized as admin. Try login as admin.");
    }
};

export {protectRoute, isAdminRoute};
