const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const authController = require('../controllers/auth.controller')
const isAdmin = require('../middleware/isAdmin')

router.post("/sign-up", authController.signUp );

router.post("/sign-in",  authController.signIn);

router.get("/me", verifyToken, authController.verifyUser);

router.get("/admin", verifyToken, isAdmin, authController.getAllUsers)

router.post("/toggleAdmin/:id", verifyToken, isAdmin, authController.toggleAdmin)

router.post("/delete-user/:id", verifyToken, isAdmin, authController.deleteUser)
module.exports = router;
