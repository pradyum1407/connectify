import { upsertStreamUser } from "../Lib/stream.js";
import User from "../Models/User.js"
import jwt from "jsonwebtoken"


export async function signup(req, res) {
    try {
        const { email, password, fullname } = req.body;

        if (!email || !password || !fullname) {
            res.status(400).json({ message: "Field are required" })
        }

        if (password.length < 6) {
            res.status(400).json({ message: "password must be 6 character" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "email is  alresy exist,use diffrent one" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "invalid format of the email" })
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;


        const newUser = await User.create({
            fullname,
            email,
            password,
            profilePic: randAvatar,
        })

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullname,
                image: newUser.profilePic || "",
            });
            console.log(`Stream user created for ${newUser.fullname}`);
        } catch (error) {
            console.log("error while  creating the stream user", error)
        }




        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({ success: true, user: newUser })
    } catch (error) {
        console.log("error while handling the singup route", error)
        res.status(500).json({ message: "internal server error" })
    }

}
export async function login(req, res) {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ message: "invalid email or passowrd" })
        }

        const isPasswordCorrect = await user.matchPassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" })
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({ success: true, user })

    } catch (error) {
        console.log("error in login conntroller ", error);
        res.status(500).json({ message: "internal server error" })
    }
}
export async function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logout succesfull" })

}

export async function onBoarding(req, res) {
    try {

        const userId = req.user._id
        const { fullname, bio, nativelanguage, location } = req.body;

        if (!fullname || !bio || !nativelanguage || !location) {
            return res.status(401).json(
                {
                    message: "all fields are required",
                    missingFields: [
                        !fullname && "fullname",
                        !bio && "bio",
                        !nativelanguage && "nativelanguage",
                        !location && "location",
                    ].filter(Boolean),
                })
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                isOnboarded: true,
            },
            { new: true }
        )

        if(!updateUser){
            return res.status(401).json({message:"user dose  not exist"})
        }

        res.status(200).json({success: true, user:updateUser})
    } catch (error) {

    }
}