import React from "react"
import styles from './login.module.css'
import { BsCart3 } from 'react-icons/bs'

import { Input, Button } from 'antd';
function Login(props) {


    return (
        <>

            <div className={styles.titulo}>
                <BsCart3></BsCart3>
                <h1>MyFeira</h1>
            </div>

            <div className={styles.login}>
                <Input
                    type="text"
                    placeholder="username"
                />

                <Input
                    type="password"
                    placeholder="username"

                />

                <Button onClick={() => props.logar()} className={styles.buttonLogin} type="primary">Logar</Button>
            </div>

            <div className={styles.containerTextoLogin}>
                <p>Não tem cadastro? <a onClick={() => props.cadastrar()}>Clique aqui</a></p>
            </div>

        </>
    )
}

export default Login