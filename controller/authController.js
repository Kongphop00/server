const jwt = require("jsonwebtoken")
const { expressjwt: expressjwt } = require("express-jwt")

exports.login=(req,res)=>{
    const {username,password} = req.body

    if (password === process.env.PASSWORD) {
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    } else {
        res.status(400).json({message:"Invalid Password."})
    }
}

exports.requireLogin = expressjwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperyty:"auth"
})