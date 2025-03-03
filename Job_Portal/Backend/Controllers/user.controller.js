import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User is already registered",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Password is incorrect",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role",
                success: false
            });
        }

        const tokenData = { userId: user._id };
        const token= await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

         user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber:user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
            .json({
                message: `Welcome back, ${user.fullname}`,
                user,
                success: true
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const logOut = async (req,res) => {
    try {
        res.clearCookie("token","",{maxAge:0});
        return res.status(200).json({
            message: "Logout Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponces=await cloudinary.uploader.upload(fileUri.content);

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; 
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;


        if(cloudResponces){
            user.profile.resume=cloudResponces.secure_url;//save thr url of the image
            user.profile.resumeOriginalName = file.originalname; //save the original name of the image
        }
        await user.save();

        user = {
            _id: user._id, 
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile Updated Successfully",
            user,
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};



