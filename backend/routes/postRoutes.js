const express = require('express')
const { createPost, deletePost, getAllPost } = require('../controllers/postController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const postRouter = express.Router()

postRouter.post("/create",isAuthenticated,createPost)
postRouter.delete("/:postId",isAuthenticated,deletePost)
postRouter.get("/",isAuthenticated,getAllPost)

module.exports = postRouter
