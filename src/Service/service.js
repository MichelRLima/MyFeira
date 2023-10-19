const express = require('express');
const app = express();
const port = 3001;
const connectToDatabase = require('../database/db'); // Importe a função de conexão com o banco de dados
const Clients = require('../model/client')
app.use(express.json());
// Chame a função para configurar a conexão com o MongoDB
connectToDatabase();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Permite o acesso do servidor React
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api/hello', (req, res) => {
    res.json({
        client: 'Michel',
        teste: "teste"
    });
});

app.get('/clients', async (req, res) => {
    try {
        const clients = await Clients.find(); // Consulta todos os documentos na coleção 'Clients'
        res.json(clients); // Retorna os dados em formato JSON
    } catch (err) {
        console.error('Erro ao buscar dados da coleção "Clients":', err);
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

app.post('/clients', async (req, res) => {
    try {
        console.log(req.body)
        const newClientData = req.body; // Dados do novo cliente enviados no corpo da requisição
        const newClient = new Clients(newClientData); // Crie uma nova instância do modelo 'Clients' com os dados
        await newClient.save(); // Salve o novo cliente no banco de dados
        res.status(201).json(newClient); // Responda com o novo cliente criado
    } catch (err) {
        if (err.code === 11000) {
            // Este é um erro de chave duplicada
            console.error('Erro ao criar novo cliente: Nome de usuário duplicado');
            res.status(400).json({ error: 'Nome de usuário duplicado' });
        } else {
            console.error('Erro ao criar novo cliente:', err);
            res.status(500).json({ error: 'Erro ao criar novo cliente' });
        }
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
