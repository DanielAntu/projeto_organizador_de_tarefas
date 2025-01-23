const {
    register,
    login,
    profile,
    editProfile,
} = require("../controllers/userController");
const router = require("express").Router();
const verifyJwt = require("../middlewares/AuthMiddleware");

const {
    validationData,
    validationLogin,
    validationEditProfile,
} = require("../middlewares/ValidationData");

router.post("/register", validationData, register);
router.post("/login", validationLogin, login);
router.get("/profile", verifyJwt, profile);
router.put("/edit", verifyJwt, validationEditProfile, editProfile);

module.exports = router;
