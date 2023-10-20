import React from "react"
import styles from './login.module.css'
import { BsCart3 } from 'react-icons/bs'

import { Input, Button } from 'antd';
function Login(props) {


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
                />

                <Input
                    type="password"
                    placeholder="Senha"

                />

                <Button onClick={() => props.logar()} className={styles.buttonLogin} type="primary">Logar</Button>
            </div>

            <div className={styles.containerTextoLogin}>
                <p>Não tem cadastro? <span onClick={() => props.cadastrar()}>Clique aqui</span></p>
            </div>

        </>
    )
}

export default Login