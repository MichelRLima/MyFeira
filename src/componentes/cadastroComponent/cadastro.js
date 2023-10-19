import React, { useState } from "react"
import styles from './cadastro.module.css'
import { BsCart3 } from "react-icons/bs"
import { Input, Button } from 'antd';
import axios from "axios";
function Cadastro(props) {

    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');

    console.log(nome)
    console.log(username)
    console.log(senha)
    console.log(confirmSenha)


    const newClientData = {
        nome: nome,
        username: username,
        password: senha,
        itens: [

        ]
    };

    function Cadastrar() {

        if (nome && username && senha && confirmSenha) {

            axios.post('http://localhost:3001/clients', newClientData)
                .then(response => {
                    console.log('Novo cliente inserido com sucesso:', response.data);
                })
                .catch(error => {
                    console.error('Erro ao inserir novo cliente:', error);
                });
        } else {
            // Caso contrário, exiba uma mensagem de erro ou faça algo apropriado
            alert('Por favor, preencha todos os campos obrigatórios.');
        }


    }


    return (
        <>
            <div className={styles.titulo}>
                <BsCart3 className={styles.icon}></BsCart3>
                <h1>MyFeira</h1>
            </div>

            <div className={styles.login}>

                <Input className={styles.inputText}
                    type="text"
                    placeholder="Seu nome"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="username (ex: michel123)"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Crie uma senha"
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    required
                    value={confirmSenha}
                    onChange={(e) => setConfirmSenha(e.target.value)}
                />

                <Button onClick={() => Cadastrar()} className={styles.buttonLogin} type="primary">Cadastrar</Button>
            </div>
        </>
    )
}

export default Cadastro