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

exports.authUser = async (req,res,next) =>{
    const {email, password} = req.body;
    const user = await Users.findOne({email})

    if(!user){
        await res.status(401).json({message: "El usuario no existe"})//no autorizado
    } else {
        if(!bcrypt.compareSync(password, user.password)){
            await res.status(401).json({message: "Password incorrecto"})
            next();
        }else{
            const token = jwt.sign({
                email: user.email,
                name: user.name,
                id: user._id
            }, 'REACT_NODE', {expiresIn: '1h'})
            res.json({token})
        }
    }

}