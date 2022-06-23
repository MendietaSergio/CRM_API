const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registerUser = async (req,res,next) =>{
    const user = new Users(req.body)

    user.password = await bcrypt.hash(req.body.password,12)
    try {
        await user.save()
        res.json({message:"El usuario se creo correctamente."})
    } catch (error) {
        console.log(error);
        res.json({message: "Hubo un error"})
        next()

    }
}

exports.authUser = (req,res,next) =>{
    
}