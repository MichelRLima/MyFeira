var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema(
    {
        nome: String,
        valor: Number, // Use Number para representar valores decimais (double)
        quantidade: Number, // Use Number para representar números inteiros
    }
);

var clientSchema = new Schema(
    {
        nome: String,
        username: String,
        password: String,
        itens: [itemSchema], // Use o esquema de item como um array dentro do esquema do cliente
    },
    { collection: 'Clients' }
);

var Clients = mongoose.model('Clients', clientSchema);

module.exports = Clients;
