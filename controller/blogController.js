//CRUD DB || handle DB
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const { v4: uuidv4 } = require('uuid');


exports.create = async (req,res) =>{

    const {title,content,author}=req.body
    let slug = slugify(title)
    
    !slug ? slug=uuidv4() : ''

    //---validation---
    switch(true){
        case !title:
            return res.status(400).json({message:"Require Title"})
            break;
        case !content:
            return res.status(400).json({message:"Require Content"})
            break;
    }

    //---save---
    Blogs.create({title,content,author,slug})
    .then((blog)=> res.json(blog))
    .catch((err)=>{
        if (err.code === 11000 ) {
            res.status(400).json({
                error:err.code,
                message:'Duplicate Record'
            })
        }else{
            res.status(400).json({error:err})    
        }
    })
}

exports.getAllblogs = (req,res) => {
    Blogs.find({})
    .then((blogs)=>res.json(blogs))
    .catch(err =>{
        console.log(err);
    })
}


exports.singleBlog = (req,res) => {
    const {slug} = req.params
    Blogs.findOne({slug}).exec()
    .then((blog)=>{
        !blog ? res.json({message:'Not Found Blog'}) : res.json(blog)
        })
    .catch(err =>{
        console.log(err);
    })
}

exports.removeBlog = (req,res) => {
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec()
    .then((blog)=>{
        !blog ? res.json({message:'Not Found Blog'}) : res.json({message:`Remove ${blog.slug} Done.`})
        })
    .catch(err =>{
        console.log(err);
    })
}

exports.updateBlog = (req,res) => {
    const {slug} = req.params
    const {title,content,author}=req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec()
    .then((blog)=>res.json(blog))
    .catch(err =>{
        console.log(err);
    })
}
