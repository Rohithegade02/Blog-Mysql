import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    // Check if the user already exists
    const query1 = 'SELECT * FROM Users WHERE email = ? OR username = ?';
    
    try {
        db.query(query1, [email, username], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (data.length) {
                return res.status(409).json({
                    success:false,
                    message: "User already exists"
                });
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);

                const query2 = 'INSERT INTO Users(`username`, `email`, `password`) VALUES (?)';
                const values = [username, email, hashPassword];

                db.query(query2, [values], (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message:err
                        });
                    }
                    return res.status(200).json(
                     {   success: true,
                        message:"User created successfully"}
                    );
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message:err
        });
    }
};

export const loginUser = (req, res) => {
    const { username, password } = req.body;
    const query1 = 'SELECT * from Users where username =?'
    try {
        db.query(query1, [username], (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message:err
                })
            }
            if (data.length === 0) {
                return res.status(404).json("User not Found")
            } else {
                const isPassword = bcrypt.compareSync(password, data[0].password)
                if (!isPassword) return res.status(400).json({
                    success: false,
                    message:"Password is incorrect"
                })
                const token = jwt.sign({ id: data[0].id }, "jwttoken")

                res.cookie("token", token, {
                    httpOnly: true,
                    secure:false,
                    sameSite:'none'
                }).status(200).json({
                    success: true,
                    message: "User Logged in",
                    token,
                    data
                })
            }
        })
    }catch (err) {
        res.status(500).json({
            success: false,
            message:err
        });
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        sameSite: "none",
        secure:true
    }).status(200).json({
        success: true,
        message:"Logged Out Successfully"
    })
}