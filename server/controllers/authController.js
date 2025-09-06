const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn:"30d"});
};

exports.registerUser = async (req,res) => {
    try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { name, email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists) return res.status(400).json({message:"You have an account already."});

    const user = await User.create({name, email, password});
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(400).json({message:"Invalid user data"});
    }
}catch(error){
    console.error(error);
    res.status(500).json({message:"Server error.Please try again later."});

}

};

exports.loginUser = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors:errors.array()});
        }
    const { email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(401).json({message:"Invalid credentials"});
    }
}catch(error){
    console.error(error);
    res.status(500).json({message:"Server error.Please try again later."});
}

};

exports.getMe = async (req, res) =>{
    try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error.Please try again later."});
    }
};