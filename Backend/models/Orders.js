const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ordersSchema = new Schema ({
    client: {
        type: Schema.ObjectId,
        ref: 'Clients'
    },
    orders: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Products'
        },
        cant: Number
    }],
    total: {
        type: Number
    }
})

module.exports = mongoose.model('Orders', ordersSchema)