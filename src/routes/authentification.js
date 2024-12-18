const { Router } = require("express");
const { getCurrentUser, register, login, protected, logout } = require("../controllers/authentification");
const { registerValidation, loginValidation } = require("../validators/authentification");
const { validationMiddleware } = require("../middlewares/validations-middleware");
const {userAuth} = require("../middlewares/auth-middleware")

const router = Router();
//user authentification
router.get("/getCurrentUser", getCurrentUser, (req, res)=>{
    return res.json({Status: "success", mail: req.mail})
});
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/protected", userAuth,protected); 
router.get("/logout", logout);

//admin authentification
//router.get("/get-admins", getAmins);


module.exports = router;