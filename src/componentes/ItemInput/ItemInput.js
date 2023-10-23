import React from 'react';
import { Input } from 'antd';

function ItemInput({ novoItem, setNovoItem }) {
    return (
        <div className='container_input'>
            <Input
                type="text"
                placeholder="Item"
                value={novoItem.nome}
                onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
            />
            <Input
                type="text"
                placeholder="Valor em R$"
                value={novoItem.valor}
                onChange={(e) =>
                    setNovoItem({ ...novoItem, valor: e.target.value })
                }
            />

            <Input
                type="number"
                placeholder="Quantidade: 1"
                value={novoItem.quantidade}
                onChange={(e) =>
                    setNovoItem({ ...novoItem, quantidade: e.target.value })
                }
            />
        </div>
    );
}

export default ItemInput;
