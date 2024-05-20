import mongoose from "mongoose";    
import jwt from "jsonwebtoken";

const dbConnection= async () => {

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    }catch(err){
        console.log("DB error "+ err);
    }


};

export default dbConnection;


export const createJWT = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "1d"});

    res.cookie("token", token, {
        httpOnly: true,
        secure : process.env.NODE_ENV !== "development",
        sameSite : "strict", //csrf attacks
        maxAge : 1*24*60*60*1000, //1 day

        
    });
}