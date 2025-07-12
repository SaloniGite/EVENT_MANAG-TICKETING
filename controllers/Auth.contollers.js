const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists " });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ message: "please fill all the feilds " })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        const accessToken = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECERET,
            { expiresIn: process.env.JWT_EXPIRE || '12h' }
        )

        const refreshToken = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days 
        });

        res.status(201).json({
            message: 'User registered successfully',
            accessToken,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                createdAt: newUser.createdAt,
            },
        });
    }catch(error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}