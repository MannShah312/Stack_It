import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async (req,res) => {
    try {
        console.log('Request body:', req.body);
        const hashed = await bcrypt.hash(req.body.password,10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed
        })
        console.log(user);

        await user.save();
        console.log('User signed up successfully');

        return res.status(200).json({msg: 'Signup Successfull'});
    } catch (error) {
        console.error('Error while signing up user: ', error);
        return res.status(500).json({msg: 'Error while signing up'});
    }
};

export const loginUser = async (req,res) => {
    let user = await User.findOne({
        email: req.body.email
    });
    if(!user){
        return res.status(400).json({msg: 'Username does not match.'});
    }

    try {
        let match = await bcrypt.compare(req.body.password,user.password);
  
        if(match) {
            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(),process.env.REQUEST_SECRET_KEY);
            
            const newToken = new Token({token: refreshToken});
            await newToken.save();

            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username});
        } else {
            return res.status(400).json({msg: 'Password does not match.'});
        }
    } catch (error) {
        return res.status(500).json({msg: 'Error while login in user' });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ msg: "Refresh token missing" });
        }

        // Remove the token from the DB
        await Token.deleteOne({ token: refreshToken });

        return res.status(200).json({ msg: "Logout successful" });
    } catch (error) {
        console.error("❌ Error logging out:", error.message);
        return res.status(500).json({ msg: "Logout failed" });
    }
};