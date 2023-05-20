const express = require("express")
const router = express.Router()
const {create,getAllblogs,singleBlog,removeBlog,updateBlog} = require("../controller/blogController")
const {requireLogin} = require("../controller/authController")


router.post('/create',requireLogin,create)
router.get('/blogs',getAllblogs)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',requireLogin,removeBlog)
router.put('/blog/:slug',requireLogin,updateBlog)

module.exports=router  