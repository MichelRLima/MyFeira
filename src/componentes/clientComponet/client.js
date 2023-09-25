import React from "react";
import style from './client.module.css'

function Client(props) {
    return (
        <>
            <h3 className={style.titulo}>Olá, {props.nome}.</h3>
            <p className={style.descricao}>Adicione itens a sua cesta de compras.</p>
        </>
    )
}

export default Client;