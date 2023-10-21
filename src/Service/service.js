const express = require('express');
const app = express();
const port = 3003;
const connectToDatabase = require('../database/db'); // Importe a função de conexão com o banco de dados
const Clients = require('../model/client')
app.use(express.json());
// Chame a função para configurar a conexão com o MongoDB
connectToDatabase();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite o acesso do servidor React
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
            res.status(400).json({ error: 'Nome de usuário duplicado', errorCode: 11000 });

        } else {
            console.error('Erro ao criar novo cliente:', err);
            res.status(500).json({ error: 'Erro ao criar novo cliente' });
        }
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    // const { username, password } = req.body; // Dados de login do corpo da solicitação


    const username = req.body.username
    const password = req.body.password


    try {

        const user = await Clients.findOne({ username: req.body.username });

        if (user) {


            if (user.username === username && user.password === password) {
                // Credenciais corretas, o usuário está autenticado.
                res.status(200).json({ message: 'Login bem-sucedido', user });
            } else {
                console.log("entrou")
                // Credenciais incorretas, exibir mensagem de erro ou redirecionar para página de erro.
                res.status(401).json({ message: 'Credenciains incorretas' });
                console.log('Credenciains incorretas')
            }
        } else {
            res.status(401).json({ message: 'Credenciais incorretas' });
            console.log('Credenciains incorretas segundo ponto')
        }
    } catch (err) {
        // Lidar com erros de consulta ou outros erros internos do servidor
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
