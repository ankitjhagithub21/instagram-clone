const User = require("../models/user")
const validator = require('validator')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const sendEmail = require("../utils/sendEmail")

const register = async(req,res) =>{
    try{
        const {fullName,email,username,password} = req.body;

        if(!fullName ||!email || !username || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({
                success:false,
                message:"Email already exist."
            })
        }
        
        const existingUsername = await User.findOne({username})

        if(existingUsername){
            return res.status(400).json({
                success:false,
                message:"Username already taken."
            })
        }
     

        //email validation
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message:"Please enter valid email address."
            })
        }

        //password validation
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({
                success:false,
                message:"Please choose strong password."
            })
        }

        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            username,
            password:hashedPassword
        })

        await newUser.save()

        res.status(201).json({
            success:true,
            message:"Account created."
        })
        


    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

const login = async(req,res) =>{

    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found."
            })
        }
        
        const comparePassword = await bcrypt.compare(password,user.password)


        if(!comparePassword){
            return res.status(400).json({
                success:false,
                message:"Wrong email or password."
            })
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:1*24*60*60*1000 // 1 day
        })

        res.status(200).json({
            success:true,
            message:"Login successfull."
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

const logout = async(req,res) =>{
    try{
        res.cookie('token','',{
            httpOnly:true,
            secure:true,
            maxAge:0
        }).status(200).json({
            success:true,
            message:"Logout successfull."
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

const getUser = async(req,res) =>{

    try{

       
        const user = await User.findById(req.userId).select("-password")

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found."
            })
        }


        res.status(200).json({
            success:true,
            user
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

const forgotPassword = async(req,res) =>{
    const {email} = req.body;

    try{
        
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found."
            })
        }

        //Generate reset token

        const resetToken = crypto.randomBytes(32).toString('hex');

        user.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

        user.resetPasswordExpires = Date.now() + 3600000; //1 hour
        await user.save()

        //send reset email
        const resetUrl = `${process.env.ORIGIN}/reset-password/${resetToken}`;

        await sendEmail(
          email,
          'Password Reset Request - Instagram Clone',
          `You requested a password reset. Click here: ${resetUrl}`
        );

        res.status(200).json({
            success:true,
            message:"Password reset email sent.",
            
        })
      

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const resetPassword = async(req,res) =>{
    const {token} = req.params;
    const {password} = req.body;
    try{
        
         const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

         const user = await User.findOne({
            resetPasswordToken:hashedToken,
            resetPasswordExpires:{$gt:Date.now()}
         });

         if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired token."
            })

         }
         if(!validator.isStrongPassword(password)){
            return res.status(400).json({
                success:false,
                message:"Please enter strong password."
            })
         }
         const hashedPassword = await bcrypt.hash(password,10)
         user.password = hashedPassword;
         user.resetPasswordToken = undefined;
         user.resetPasswordExpires = undefined;
         await user.save();


        res.status(200).json({
            success:true,
            message:"Password Updated successfully."
        })
      

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}




module.exports = {
    register,
    login,
    logout,
    getUser,
    forgotPassword,
    resetPassword
}