const mongoose = require('mongoose');

// URL de conexão com o MongoDB
const mongoURL = 'mongodb+srv://michelrocha502:root@cluster0.ozgxq3o.mongodb.net/Myfeira?retryWrites=true&w=majority';

async function connectToDatabase() {
    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado ao banco de dados com sucesso');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

module.exports = connectToDatabase;
