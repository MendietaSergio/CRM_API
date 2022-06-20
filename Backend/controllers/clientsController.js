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