const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { generateToken } = require('../utils/auth')
const { sgMail } = require('../utils/mail')
const { generateOTP } = require('../utils/otp')
const resolvers = {
    Query: {
        identity: ({ user }) => user
    },
    Mutation: {
        signup: async (_, { email, password }, { res }) => {
            if (await User.findOne({ email })) {
                throw new Error("email already exists");
            }
            if (!res) {
                throw new Error("Response object is undefined");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();
            const token = generateToken(newUser);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 10 * 24 * 60 * 60 * 1000
            })
            return {
                token,
                user: {
                    _id: newUser._id.toString(),
                    email: newUser.email,
                    password: newUser.password
                }
            };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error("Invalid email or password")
            }
            user.otp = generateOTP();
            user.otpExpiry = Date.now() + 360000;
            await user.save();
            const mailOptions = {
                from: 'himanshuch3003@gmail.com',
                to: email,
                subject: "OTP for login",
                text: user.otp.toString(),
            };
            sgMail
                .send(mailOptions)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
            return "OTP sent successfully";
        },
        verifyOTP: async (_, { email, otp }, { res }) => {
            const user = await User.findOne({ email });
            console.log("This is the saved OTP", user.otp);
            console.log("This is the user OTP", otp);
            if (user.otp !== otp) {
                throw new Error("Invalid OTP")
            }
            if (Date.now() > user.otpExpiry) {
                throw new Error("OTP expired")
            }
            user.otp=null;
            user.otpExpiry=null;
            await user.save();
            const token = generateToken(user);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 10 * 24 * 60 * 60 * 1000
            })
            return { token, user };
        }
    }
};
module.exports = { resolvers };