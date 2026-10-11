const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const {makeToken}=require("../utils/makeToken");

exports.register = async(req,res,next) =>{
    try{
        const { name,email,password,confirmPassword} = req.body;
        if(!name){
            return res.status(404).json({
                message: "name not found"
            })
        }
        if(!email){
            return res.status(404).json({
                message: "email not found"
            })
        }
        if(!password || !confirmPassword){
            return res.status(404).json({
                message:"enter password or confirm password"
            })
        }
        if(password != confirmPassword){
            return res.status(404).json({
                message: "Entered password and confirm password are not matching"
            })
        }
        const hashedpassword = await bcryptjs.hash(password,10);
        const newUser = await User.create({
            name,
            email,
            password:hashedpassword
        });
        return res.status(201).json({
            id: newUser._id,
            name:newUser.name,
            email:newUser.email
        })
    }
    catch(err){
        next(err);
    }
}

exports.login = async(req,res,next) => {
    try{
        const{email,password} =req.body;

        if(!email){
            return res.status(401).json({
                message:"Email not found"
            })
        }
        if(!password){
            return res.status(401).json({
                message:"Password not found"
            })
        }
        const user=await User.findOne({email}).select("+password");
        
        if(!user){
            return res.status(410).json({
                message:"Uesr does'nt exist"
            })
        }
        const ok = await bcryptjs.compare(password,user.password);
        if(!ok){
            return res.status(200).json({
                message: "Invalid email or password"
            })
        }
        res.status(200).json({
            token : makeToken(user)
        })
    }
    catch(err){
        next(err);
    }
}