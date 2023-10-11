
import './App.css';
import React, { useState } from 'react';
import Client from './componentes/clientComponet/client';
import Item from "./componentes/itemComponent/item"
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai'
import { BsFillTrash3Fill } from 'react-icons/bs'
import Swal from 'sweetalert2';
import ItemInput from './componentes/ItemInput/ItemInput';
function App() {

  const showAlert = (item, nome) => {
    Swal.fire({
      title: 'Voce deseja retirar esse item?',
      text: nome,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, retirar da cesta!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Excluído!',
          text: 'Item retirado da cesta',
          icon: 'success',
          confirmButtonColor: '#4caf50', // Defina a cor desejada para o botão OK
          confirmButtonText: 'OK' // Altere o texto do botão OK conforme necessário
        })
        removerItem(item)
      }
    })
  };
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState({ nome: '', valor: "" });
  const [CriarItem, setCriarItem] = useState(false);

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const adicionarItem = () => {
    if (novoItem.nome && novoItem.valor !== "") {

      const newItem = {
        id: generateUniqueId(),
        nome: novoItem.nome,
        valor: novoItem.valor,
        valorTotal: novoItem.valor,

      };

      setItens([...itens, newItem]);
      setNovoItem({ nome: '', valor: "" });
      setCriarItem(!CriarItem);

    }
  };

  const removerItem = (id) => {
    const todosItens = itens.filter((item) => item.id !== id);
    setItens(todosItens);
  };

  const CriarNovoItem = () => {
    setCriarItem(!CriarItem);
  };

  // Função para calcular o total dos valores dos itens
  const calcularTotal = () => {
    let total = 0;
    itens.forEach((item) => {
      total += item.valorTotal;
    });
    return total.toFixed(2);
  };

  const atualizarItem = (id, novoNome, novoValor, novoQtd) => {
    const novosItens = itens.map((item) => {
      if (item.id === id) {
        return { ...item, nome: novoNome, valor: novoValor, valorTotal: novoQtd };
      }
      return item;
    });
    setItens(novosItens);
  };


  return (
    <div className="App">
      <Client nome="Michel" />




      <div className='Item'>
        {itens.map((item) => (
          <div key={item.id}>
            <Item
              id={item.id}
              nome={item.nome}
              valor={item.valor}
              qtd={item.qtd}
              atualizarItem={atualizarItem}


            />
            <div className='container_delete'>
              <BsFillTrash3Fill className='delete' onClick={() => showAlert(item.id, item.nome)} />
            </div>
            <hr></hr>
          </div>
        ))}

      </div>

      {CriarItem ? (
        <>
          <ItemInput novoItem={novoItem} setNovoItem={setNovoItem} />
          <div className='container_buttons'>
            <AiFillCheckCircle className='container_buttons-confirm' onClick={adicionarItem} />
            <AiFillCloseCircle className='container_buttons-refuse' onClick={CriarNovoItem} />
          </div>
        </>
      ) : (
        <div className='Container_CriarItem'>
          <IoMdAddCircleOutline className="CriarItem" onClick={CriarNovoItem} />
          <span>Clique para criar um novo item</span>
        </div>
      )}

      <div className='container_valorTotal'>

        <span>Valor total R$: </span>
        <p> {calcularTotal()}</p>

      </div>
    </div>
  );
}

export default App;