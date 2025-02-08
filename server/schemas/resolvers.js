const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { User, Profile } = require('../models/user')
const { generateToken } = require('../utils/auth')
const { sgMail } = require('../utils/mail')
const { generateOTP } = require('../utils/otp')
const axios = require('axios')
const resolvers = {
    Query: {
        identity: (_, __, context) => {
            return context.token || null;
        },
        profile: async(_, __, context) => {
            const user = context.user;
            console.log("User:", user);
            const profile = await Profile.findOne({ email: user });
            if (!profile) {
                console.log("Profile not found");
                return null;
            }
            else {
                console.log("Profile FOund")
                return profile;
            }
        }
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
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? "None" : "strict",
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
                    ('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
            return "OTP sent successfully";
        },
        verifyOTP: async (_, { email, otp }, { res }) => {
            const user = await User.findOne({ email });
            ("This is the saved OTP", user.otp);
            ("This is the user OTP", otp);
            if (user.otp !== otp) {
                throw new Error("Invalid OTP")
            }
            if (Date.now() > user.otpExpiry) {
                throw new Error("OTP expired")
            }
            user.otp = null;
            user.otpExpiry = null;
            await user.save();
            const token = generateToken(user);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? "None" : "strict",
                maxAge: 10 * 24 * 60 * 60 * 1000
            })
            return { token, user };
        },
        createUserProfile: async (_, { name, skills, linkedin, github, about, dp }, context) => {
            const email = context.user;
            console.log("Email:", email);
            const checkEmail = await Profile.findOne({ email });
            if (checkEmail) {
                console.log("Profile already exists");
                return null;
            }
            const newProfile = new Profile({ email, name, skills, linkedin, github, about, dp });
            await newProfile.save();
            console.log("Profile created successfully");
            return newProfile;
        },
        authfortoken: async (_, { code }, { res }) => {
            try {
                const response = await axios.post(process.env.GOOGLE_ACCESS_TOKEN_URL, {
                    code,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
                    grant_type: 'authorization_code',
                })

                const { access_token } = response.data;
                const validResponse = await axios.get(process.env.GOOGLE_TOKEN_INFO_URL, {
                    params: { access_token }
                })
                const email = validResponse.data.email;
                const user = await User.findOne({ email });
                if (!user) {
                    const newUser = new User({ email });
                    await newUser.save();
                }
                const token = generateToken(validResponse.data);
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? "None" : "strict",
                    maxAge: 10 * 24 * 60 * 60 * 1000
                })
                return {
                    success: true,
                    token
                }
            } catch (error) {
                ("Error : ", error)
            }
        }
    }
};
module.exports = { resolvers };