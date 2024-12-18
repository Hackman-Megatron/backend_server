const { check } = require("express-validator");
const db = require("../database");
const {compare} = require("bcryptjs");

const password = check("password").isLength(
    {min: 6 , max: 15 }
).withMessage(
    "Password has to be between 6 and 15 characters."
);

const confirmPassword = check("confirmPassword").custom((value, { req }) => { 
    if (value !== req.body.password) { 
        throw new Error("Passwords do not match."); 
    } return true; 
});

const email = check("email").isEmail().withMessage(
    "Provide a valide email."
);

const emailExits = check("email").custom(async(value)=>{
    const { rows } = await db.query("SELECT * from users WHERE email = $1", [value,])
    if (rows.length) {
        throw new Error('Email already exists.');
    }
})

const loginFieldsCheck = check("email").custom(async(value, {req})=>{
    const user = await db.query("SELECT * from users WHERE email = $1", [value,]);
    if (!user.rows.length) {
        throw new Error("Email does not exists.")
    }
    const validPassword = await compare(req.body.password, user.rows[0].password);
    if (!validPassword) {
        throw new Error("Wrong password")
    }
    req.user = user.rows[0];
})


module.exports = {
    registerValidation: [email, password, confirmPassword ,emailExits],
    loginValidation: [loginFieldsCheck]
}