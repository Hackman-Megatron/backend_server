const db = require("../database");
const {hash} = require('bcryptjs'); 
const {sign, verify,} = require("jsonwebtoken");
const {SECRET} = require("../constants")


//users controllers
exports.getCurrentUser = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "not autorized"});
    }else{
        verify(token, SECRET, (err, decoded)=> {
            if(err){
                return res.json({Error: "token is not okey"});
            }else{
                req.mail = decoded.email;
                next()
            }
        })
    }
}

exports.register = async (req, res) => {
   const {email, password, confPassword, role = "communautaire"} = req.body
    try {
            const hashedPassword = await hash(password, 10);
        await db.query("insert into users(email,password,role)values($1, $2 ,$3)",
            [email, hashedPassword, role]
        )
            return res.status(201).json({
                success: true,
                message:"The registration was succesfull"
            })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        })
    }
}

exports.login = async (req, res) => {
    let user = req.user
    let playload = {
        id: user.user_id,
        email: user.email,
    }
    try {
        const token = await sign(playload, SECRET, {expiresIn: "30d"})
           return res.status(200).cookie(
            "token", token, {httpOnly: true}
           ).json({
            success: true,
            message: "logged in Successfully",
            mail: user.email,
           })
     } catch (error) {
         console.log(error.message);
         return res.status(500).json({
             error: error.message,
         })
     }
}

 exports.protected = async (req, res) => {
    try {
        return res.status(201).json({
            success: "protected info",
        })
    } catch (error) {
        console.log(error.message);
    }
}

exports.logout = async (req, res) => {
    try {
           return res.status(200).clearCookie(
            "token", {httpOnly: true}
           ).json({
            success: true,
            message: "logged out Successfully",
           })
     } catch (error) {
         console.log(error.message);
         return res.status(500).json({
             error: error.message,
         })
     }
}


//admins controllers

exports.getAdmins = async (req, res) => {
    try {
        const { rows } = await db.query("select admin_id, username, role from admins");
        return res.status(201).json({
            success: true,
            message: rows,
        })
    } catch (error) {
        console.log(error.message);
    }
}
