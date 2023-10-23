import './App.css';
import React, { useState } from 'react';
import Client from './componentes/clientComponet/client';
import Item from "./componentes/itemComponent/item"
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai'
import Swal from 'sweetalert2';
import ItemInput from './componentes/ItemInput/ItemInput';
import Login from './componentes/loginComponent/login'
import { BiLogOut } from 'react-icons/bi'
import Cadastro from './componentes/cadastroComponent/cadastro';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Logo from './componentes/logo/logo';
import { alertErro } from './componentes/Alerts/alertErro';



function App() {



  const [dataClient, setDataClient] = useState("")
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState({ nome: '', valor: "", quantidade: "" });
  const [CriarItem, setCriarItem] = useState(false);
  const [login, setLogin] = useState(true)
  const [cadastro, setCdastro] = useState(false)
  const [cliente, setCliente] = useState("")





  function logar(cliente) {
    toast.success('Usuário logado', { autoClose: 8000 });
    setLogin(false)
    setCdastro(false)
    setCliente(cliente)
  }

  function cadastrar() {

    setLogin(false)
    setCdastro(true)
  }

  function logOut() {

    toast.success('Faça seu login', { autoClose: 8000 });
    setLogin(true)
    setCdastro(false)

  }


  function loginRetorn() {

    toast.success('Faça seu login', { autoClose: 8000 });
    setLogin(true)
    setCdastro(false)

  }

  const showAlertDelete = (item, nome) => {
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


  const adicionarItem = () => {
    if (novoItem.nome && novoItem.valor !== "" && !isNaN(novoItem.valor) && !isNaN(novoItem.quantidade) && novoItem.quantidade !== "") {

      const newItem = {

        nome: novoItem.nome,
        valor: novoItem.valor,
        quantidade: novoItem.quantidade

      };

      axios.put(`https://apimyfeira.online/adicionar/${dataClient._id}`, newItem)
        .then((response) => {
          console.log("Item criado com sucesso");

          setDataClient(response.data)
          calcularTotal()

          // setDataClient(response.data)
        })
        .catch((error) => {
          console.error("Erro ao criar Item:", error);
        });


      setItens([...itens, newItem]);
      setNovoItem({ nome: '', valor: "" });
      setCriarItem(!CriarItem);


    }
    else {
      alertErro("Existe alguma informação incorreta")
    }
  };

  const removerItem = (id) => {


    axios.delete(`https://apimyfeira.online/item/${dataClient._id}/${id}`)
      .then((response) => {
        console.log('Item excluído com sucesso');
        setDataClient(response.data)
        calcularTotal()
      })
      .catch((error) => {
        console.error('Erro ao excluir o Item', error);
      });

  };

  function atualizarItem(id, nome, valor, quantidade) {

    axios.put(`https://apimyfeira.online/item/${dataClient._id}/${id}`, {
      nome: nome,
      valor: valor,
      quantidade: quantidade,
    }).then((response) => {
      setDataClient(response.data)
      calcularTotal()

    }).catch((error) => {
      console.log(error)
    })
  };

  const CriarNovoItem = () => {
    setCriarItem(!CriarItem);
  };

  // Função para calcular o total dos valores dos itens
  const calcularTotal = () => {
    let total = 0;

    if (dataClient && dataClient.itens && dataClient.itens.length > 0) {
      dataClient.itens.forEach((item) => {
        if (item.valor && item.quantidade) {

          total += item.valor * item.quantidade;
        }
      });
    }

    return total;

  };





  return (


    <div className="App">
      <ToastContainer />

      {login ?
        (
          <Login logar={logar} cadastrar={cadastrar} setDataClient={setDataClient} ></Login>
        )
        : cadastro ?
          (
            <Cadastro logar={logar} loginRetorn={loginRetorn}></Cadastro>
          )
          :
          (
            <>
              <BiLogOut className='exit' onClick={() => logOut()}></BiLogOut>


              <Logo></Logo>
              <Client nome={cliente} />

              <div className='ContainerItem'>
                {dataClient.itens.map((item) => (
                  <div key={item._id}>

                    <Item
                      id={item._id}
                      nome={item.nome}
                      valor={item.valor}
                      qtd={item.quantidade} // Use "quantidade" em vez de "qtd" para corresponder ao modelo
                      atualizarItem={atualizarItem}
                      showAlertDelete={showAlertDelete}
                    />
                    <hr />
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