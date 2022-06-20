const Clients= require('../models/Clients')

exports.newClient = async (req,res,next) =>{
    // console.log(req.body);
    const client = new Clients (req.body)

    try {
        await client.save()
        res.json({
            message: "Se guardó el cliente nuevo"
        })
    } catch (error) {
        console.log(error);

        next()
    }
}

exports.Clients = async (req,res,next) =>{
    try {
        const clients = await Clients.find({})
        res.json(clients)
    } catch (error) {
        console.log(error);
        next()
    }
}
exports.idClients = async (req,res,next) =>{
    const idClient = await Clients.findById(req.params.id)

    if(!idClient){
        res.json({
            message:"El cliente no existe"
        })
        next()
    }

    res.json(idClient)
    
}