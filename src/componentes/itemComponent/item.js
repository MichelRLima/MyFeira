import React from "react";
import styles from './item.module.css'
import { useState, useEffect } from "react";
import { BsFillPencilFill } from 'react-icons/bs'
import { MdSave } from 'react-icons/md'
import { Input } from 'antd';


function Item(props) {

    const [quantidade, setQuantidade] = useState(1);
    const [nomeEditado, setNomeEditado] = useState(props.nome);
    const [valorEditado, setValorEditado] = useState(props.valor);
    const [editando, setEditando] = useState(false);
    const [valorSomado, setValorSomado] = useState()


    const handleEditarClick = () => {
        setEditando(!editando);
    };






    useEffect(() => {
        setValorSomado(valorEditado * quantidade)


    }, [quantidade, valorEditado])



    const handleSalvarClick = () => {
        // Você pode adicionar aqui a lógica para salvar os valores editados
        // Por exemplo, você pode atualizar o estado global ou fazer uma chamada à API
        // E então, definir editando de volta para false para sair do modo de edição
        props.atualizarItem(props.id, nomeEditado, valorEditado, valorSomado);
        setEditando(false);
    };

    return (
        <>
            <div className={styles.containerItem}>
                <div className={styles.item}>
                    <div className={styles.containerContador}>
                        <button
                            className={styles.buttonMenos}
                            disabled={quantidade <= 1 ? true : false}
                            onClick={() => setQuantidade(quantidade - 1)}>
                            -
                        </button>

                        <span className={styles.quantidade}>{quantidade}</span>

                        <button className={styles.buttonMais} onClick={() => setQuantidade(quantidade + 1)}>
                            +
                        </button>
                    </div>
                    {editando ? (
                        <>  <div className={styles.conteudo}>
                            <span>Nome: </span><Input className={styles.inputNome} type="text" value={nomeEditado} onChange={(e) => setNomeEditado(e.target.value)} />
                            <span>R$: </span><Input className={styles.inputValor} type="text" value={valorEditado} onChange={(e) => setValorEditado(parseFloat(e.target.value))} />

                        </div>
                            <div className={styles.containerEditar}>
                                <MdSave onClick={handleSalvarClick}>SALVAR </MdSave>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className={styles.nome}>{nomeEditado}</p>
                            <p className={styles.valor}>R${parseFloat(valorSomado).toFixed(2)}</p>

                            <div className={styles.containerEditar}>



                                <BsFillPencilFill onClick={handleEditarClick}></BsFillPencilFill>
                            </div>

                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Item;