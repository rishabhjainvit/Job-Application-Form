const bcrypt = require('bcrypt')
const { required } = require("joi");
const jwt = require('jasonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req,res)=>{
    try{

        const{name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message : 'User is already exit,you can login', success: false});
        }
        const UserModel =new UserModel({name,email,password});
        UserModel.password = await bcrypt.hash(password , 10);
        await UserModel.save();
        res.status(201)
        .json({message: "Signup Sucessfully",
            sucess: true
        })
    }
    catch (err) { 
        res.status(500)
        .json({
            message: "Internal server error",
            sucess: false
        })

    }

}
const login = async (req,res)=>{
    try{

        const{email,password} = req.body;
        const user = await UserModel.findOne({email});
        const errorMsg = 'Auth Failed'
        if(!user){
            return res.status(403)
            .json({message : errorMsg, success: false});
        }
        const isPassEqual = await bcrypt.compare(password , user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({message : errorMsg, success: false});
        }
        const jwtToken = jwt.sign({email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24hr'}
        )
        res.status(200)
        .json({message: "Login Sucessfully",
            sucess: true,
            jwtToken,
            email,
            name: user.name
        })
    }
    catch (err) { 
        res.status(500)
        .json({
            message: "Internal server error",
            sucess: false
        })

    }

}

module.exports = {
    signup,
    login
}