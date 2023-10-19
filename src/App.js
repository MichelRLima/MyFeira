import './App.css';
import React, { useState } from 'react';
import Client from './componentes/clientComponet/client';
import Item from "./componentes/itemComponent/item"
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai'
import Swal from 'sweetalert2';
import ItemInput from './componentes/ItemInput/ItemInput';
import Login from './componentes/loginComponent/login'
import axios from 'axios';
import Cadastro from './componentes/cadastroComponent/cadastro';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {



  axios.get('http://localhost:3001/clients')
    .then(response => {
      console.log('Resposta da API:', response.data);
      response.data.forEach(item => {
        const client = item.client;
        console.log('Cliente:', client);
      });


    })
    .catch(error => {
      console.error('Erro ao buscar dados da API:', error);
    });



  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState({ nome: '', valor: "" });
  const [CriarItem, setCriarItem] = useState(false);
  const [login, setLogin] = useState(true)
  const [cadastro, setCdastro] = useState(false)

  function logar() {
    toast.success('Usuário logado', { autoClose: 8000 });
    setLogin(false)
    setCdastro(false)
  }

  function cadastrar() {

    setLogin(false)
    setCdastro(true)
  }

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
      <ToastContainer />

      {login ?
        (
          <Login logar={logar} cadastrar={cadastrar} ></Login>
        )
        : cadastro ?
          (
            <Cadastro logar={logar} ></Cadastro>
          )
          :
          (
            <>
              <Client nome="Michel" />

              <div className='ContainerItem'>
                {itens.map((item) => (
                  <div key={item.id}>
                    <Item
                      id={item.id}
                      nome={item.nome}
                      valor={item.valor}
                      qtd={item.qtd}
                      atualizarItem={atualizarItem}
                      showAlert={showAlert}
                    />

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
                  <span className='texto_criarItem'>Clique para criar um novo item</span>
                </div>
              )}

              <div className='container_valorTotal'>

                <span>Valor total R$: </span>
                <p> {calcularTotal()}</p>

              </div>
            </>
          )

      }
    </div>
  );
}

export default App;