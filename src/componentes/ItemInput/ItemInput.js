import React from 'react';
import { Input } from 'antd';
import { useState } from 'react';
function ItemInput({ novoItem, setNovoItem }) {
    const [value, setValue] = useState(0);
    const handleInputChange = (event) => {
        let inputValue = event.target.value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        const numericValue = parseFloat(inputValue) / 100;

        if (!isNaN(numericValue)) {
            setValue(numericValue);
            setNovoItem((prev) => ({ ...prev, valor: numericValue.toFixed(2) }));
        } else {
            setValue(0);
            setNovoItem((prev) => ({ ...prev, valor: '0.00' }));
        }
    }

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
                value={value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                onChange={handleInputChange}
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
