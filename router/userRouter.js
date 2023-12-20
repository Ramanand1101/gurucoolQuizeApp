const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../model/userModel');
const userRouter = express.Router();

// User registration endpoint
userRouter.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if required fields are provided
        if (!username || !password) {
            // Log missing fields
            return res.status(400).json({message: 'Please provide all the fields' ,error: err.message});
        }

        // Check for duplicate email
        const existingEmail = await User.findOne({username});

        if (existingEmail) {
            // Log duplicate email or username
            return res.status(409).json({ message: 'This Email or Username is already taken.' });
        } else {
            // Hash password and save user
            const hash = await bcrypt.hash(password, 5);
            const user = new User({ username,password: hash});

            await user.save();

            // Log successful registration
            res.json({ message: 'User has been registered' });
        }
    } catch (err) {
        // Log registration failure
        console.error(err);
        res.status(500).json({ message: 'User not registered', error: err.message });
    }
});

// User login endpoint
userRouter.post('/login', async (req, res) => {
    try {
        const {username, password } = req.body;
        const user = await User.findOne({username});
        // console.log(user.role)

        if (!user) {
            // Log invalid credentials
            return res.status(401).json({message:"Invalid Credentials"});
        }

        // Compare passwords
        const result = await bcrypt.compare(password, user.password);

        if (result) {
            // Generate tokens and set cookies
            const Token = jwt.sign({ userId: user._id }, process.env.secretkey, {
                expiresIn: '7d'
            });


            // Log successful login
            res.json({ message: 'Login Successfully', Token});
        } else {
            // Log invalid credentials
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (err) {
        // Log login failure
        console.error(err);
        res.status(500).json({ message: 'Something Went Wrong', error: err.message });
    }
});
module.exports = {userRouter};
