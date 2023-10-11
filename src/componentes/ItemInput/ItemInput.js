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
                type="number"
                placeholder="Valor em R$"
                value={novoItem.valor}
                onChange={(e) =>
                    setNovoItem({ ...novoItem, valor: parseFloat(e.target.value) })
                }
            />
        </div>
    );
}

export default ItemInput;
