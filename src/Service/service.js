const express = require('express');
const app = express();
const port = 3003;
const connectToDatabase = require('../database/db'); // Importe a função de conexão com o banco de dados
const Clients = require('../model/client')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
app.use(express.json());
// Chame a função para configurar a conexão com o MongoDB
connectToDatabase();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite o acesso do servidor React
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//TODA DE ADICIONAR ITEM
app.put('/adicionar/:id', async (req, res) => {
    const IDclient = req.params.id;
    const novoDado = req.body

    try {
        console.log("Recebida requisição PUT para atualizar o cliente com o ID: " + IDclient);
        const cliente = await Clients.findById(IDclient);


        // Aqui você pode implementar a lógica para atualizar o cliente
        cliente.itens.push(novoDado)
        await cliente.save();
        console.log("Cliente atualizado com sucesso");
        res.status(200).json(cliente)

    } catch (error) {
        console.error("Erro ao atualizar o cliente:", error);
        res.status(500).send("Erro ao atualizar o cliente");

    }
});

//ROTA DE DELETAR ITEM
app.delete('/item/:client/:id', async (req, res) => {
    const itemId = req.params.id;
    const client = req.params.client;


    try {

        const updatedClient = await Clients.findByIdAndUpdate(
            client,
            {
                $pull: { 'itens': { _id: new ObjectId(itemId) } },
            },
            { new: true }
        );

        res.status(200).json(updatedClient)


    } catch (error) {
        console.error('Erro ao excluir o item:', error);
        res.status(500).send('Erro ao excluir o item');
    }


});

//ROTA PARA ATUALIZAR O ITEM
app.put('/item/:client/:id', async (req, res) => {
    const itemId = req.params.id;
    const client = req.params.client;
    const { nome, valor, quantidade } = req.body;

    try {
        // Encontre o cliente específico
        const updatedClient = await Clients.findById(client);

        // Encontre o índice do item que deseja atualizar com base no _id
        const itemIndex = updatedClient.itens.findIndex(item => item._id.toString() === itemId);

        if (itemIndex !== -1) {
            // Atualize os campos do item
            updatedClient.itens[itemIndex].nome = nome;
            updatedClient.itens[itemIndex].valor = valor;
            updatedClient.itens[itemIndex].quantidade = quantidade;

            // Salve as alterações no banco de dados
            await updatedClient.save();

            // Envie uma resposta de sucesso
            res.status(200).json(updatedClient);
        } else {
            // Caso o item não seja encontrado, retorne um erro 404 (não encontrado)
            res.status(404).json({ error: 'Item não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar o item:', error);
        res.status(500).send('Erro ao atualizar o item');
    }
});



app.get('/', (req, res) => {
    res.json({
        message: 'API MyFeira funcionando',
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

                // Credenciais incorretas, exibir mensagem de erro ou redirecionar para página de erro.
                res.status(401).json({ message: 'Credenciains incorretas' });
                console.log('Credenciains incorretas')
            }
        } else {
            res.status(401).json({ message: 'Credenciais incorretas' });
            console.log('Credenciains incorretas')
        }
    } catch (err) {
        // Lidar com erros de consulta ou outros erros internos do servidor
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});





app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
