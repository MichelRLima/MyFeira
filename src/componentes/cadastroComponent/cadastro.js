import React from "react"
import styles from './cadastro.module.css'
import { BsCart3 } from "react-icons/bs"
import { Input, Button } from 'antd';
function Cadastro(props) {


    return (
        <>
            <div className={styles.titulo}>
                <BsCart3></BsCart3>
                <h1>MyFeira</h1>
            </div>

            <div className={styles.login}>

                <Input
                    type="text"
                    placeholder="Seu nome"
                />
                <Input
                    type="text"
                    placeholder="username (ex: michel123)"
                />

                <Input
                    type="password"
                    placeholder="Crie uma senha"

                />

                <Input
                    type="password"
                    placeholder="Confirme sua senha"

                />

                <Button onClick={() => props.logar()} className={styles.buttonLogin} type="primary">Cadastrar</Button>
            </div>
        </>
    )
}

export default Cadastro