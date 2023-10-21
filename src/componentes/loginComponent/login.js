import React, { useState } from "react"
import styles from './login.module.css'
import { BsCart3 } from 'react-icons/bs'
import axios from 'axios';
import { Input, Button } from 'antd';
import { alertErro } from "../Alerts/alertErro";
function Login(props) {

    const [urname, setUrname] = useState("")
    const [senha, setSenha] = useState("")



    const axiosInstance = axios.create({
        validateStatus: function (status) {
            return true; // Sempre retorna true para considerar todas as respostas como bem-sucedidas
        },
    });

    async function reqLogin() {
        try {
            const response = await axiosInstance.post('http://localhost:3003/login', {
                username: urname,
                password: senha
            });



            if (response.status === 200) {
                const user = response.data.user

                //const nome = user.nome;
                // Credenciais corretas, o usuário está autenticado.

                console.log('Usuário autenticado com sucesso', user);

                props.logar(user.nome);
            } else if (response.status === 401) {
                // Credenciais incorretas, exibir mensagem de erro ou redirecionar para página de erro.
                alertErro("Credenciais invalidas")

            } else {
                alertErro("Internal server error");
            }
        } catch (error) {
            alertErro("Internal server error");
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
                    placeholder="Username"
                    value={urname}
                    onChange={(e) => setUrname(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}

                />

                <Button onClick={() => reqLogin()} className={styles.buttonLogin} type="primary">Logar</Button>
            </div>

            <div className={styles.containerTextoLogin}>
                <p>Não tem cadastro? <span onClick={() => props.cadastrar()}>Clique aqui</span></p>
            </div>

        </>
    )
}

export default Login