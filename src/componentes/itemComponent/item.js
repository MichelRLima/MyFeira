import React from "react";
import styles from './item.module.css'
import { useState, useEffect } from "react";
import { BsFillPencilFill } from 'react-icons/bs'
import { MdSave } from 'react-icons/md'
import { Input } from 'antd';
import { BsFillTrash3Fill } from 'react-icons/bs'
import { toast } from 'react-toastify';

function Item(props) {

    const [quantidade, setQuantidade] = useState(1);
    const [nomeEditado, setNomeEditado] = useState(props.nome);
    const [valorEditado, setValorEditado] = useState(props.valor);
    const [editando, setEditando] = useState(false);
    const [valorSomado, setValorSomado] = useState()


    const handleEditarClick = () => {
        setEditando(!editando);
    };
    /////////////////////////////////////////////////



    useEffect(() => {
        setValorSomado(parseFloat(valorEditado) * quantidade)

    }, [quantidade, valorEditado])


    const atualizarItem = () => {
        props.atualizarItem(props.id, nomeEditado, valorEditado, valorSomado);
    };

    useEffect(() => {
        atualizarItem();
        // Evite que o useEffect seja executado novamente ao incluir props.atualizarItem diretamente
        // como dependência. Isso é seguro, pois props.atualizarItem não muda ao longo do ciclo de vida do componente.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id, nomeEditado, valorEditado, valorSomado]);


    ////////////////////////////////////////////
    const handleSalvarClick = () => {
        // Remove espaços em branco à esquerda e à direita e verifica se o valor não está vazio



        if (valorEditado === "" || isNaN(valorEditado)) {
            toast.error("Insira algum valor válido no item");
        } else {
            console.log(valorSomado);
            setEditando(false);
        }
    };



    return (
        <>
            <div className={styles.containerItem}>
                <div className={styles.item}>
                    <div className={styles.containerContador}>
                        {editando ? (
                            <button
                                className={styles.buttonMenos}
                                disabled={quantidade <= 1 ? true : false}
                                onClick={() => setQuantidade(quantidade - 1)}>
                                -
                            </button>


                        ) : (
                            <>
                            </>
                        )


                        }

                        <span className={styles.quantidade}>{quantidade}</span>
                        {editando ? (
                            <button className={styles.buttonMais} onClick={() => setQuantidade(quantidade + 1)}>
                                +
                            </button>
                        ) : (
                            <>
                                <spna>x</spna>
                            </>
                        )


                        }
                    </div>
                    {editando ? (
                        <>  <div className={styles.conteudo}>
                            <Input className={styles.inputNome} placeholder="Nome" type="text" value={nomeEditado} onChange={(e) => setNomeEditado(e.target.value)} />
                            <Input className={styles.inputValor} placeholder="Valor R$" type="text" value={valorEditado} onChange={(e) => setValorEditado(e.target.value)} />

                        </div>
                            <div className={styles.containerEditar}>
                                <MdSave className={styles.icon} onClick={handleSalvarClick}  >SALVAR </MdSave>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className={styles.nome}>{nomeEditado}</p>
                            <p className={styles.valor}>R${parseFloat(valorSomado).toFixed(2)}</p>

                            <div className={styles.containerEditar}>
                                <BsFillPencilFill className={styles.icon} onClick={handleEditarClick}  ></BsFillPencilFill>
                                <BsFillTrash3Fill className={styles.delete} onClick={() => props.showAlert(props.id, props.nome)} />
                            </div>

                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Item;