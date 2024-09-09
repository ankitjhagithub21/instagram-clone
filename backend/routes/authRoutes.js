const express = require('express')
const { register, login, logout, getUser, forgotPassword, resetPassword } = require('../controllers/authController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.get("/user",isAuthenticated,getUser)
authRouter.post("/forgot-password",forgotPassword)
authRouter.post("/reset-password/:token",resetPassword)

module.exports = authRouter