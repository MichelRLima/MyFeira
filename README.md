# Myfeira

O Myfeira é um projeto que visa facilitar a organização das compras em um supermercado, permitindo o registro de produtos no carrinho e o acompanhamento do valor total das compras em tempo real.

## Tecnologias Utilizadas

- Frontend: React
  - Bibliotecas: react-toastify, sweetalert2

## Instalação

Certifique-se de ter o Node.js instalado. Para instalar as dependências, utilize o seguinte comando no diretório raiz do projeto:

```bash
npm install
```
## Estrutura de Diretórios

- `src/components/Alerts`: Componentes para exibição de alertas de erro e sucesso.
- `src/components/cadastroComponent`: Componente e estilo associado para o cadastro.
- `src/components/clientComponent`: Componente e estilo associado para o cliente.
- `src/components/itemComponent`: Componente e estilo associado para o item.
- `src/components/ItemInput`: Componente e estilo associado para a entrada de itens.

- `src/database/db.js`: Configuração do banco de dados.
- `src/service/service.js`: Requisições da API.

## Iniciar o Servidor de Desenvolvimento
Para iniciar o servidor de desenvolvimento local, execute os seguintes comandos:

```bash

# Inicia o projeto React
npm start
```

## Funcionalidades Principais

- Adição de itens ao carrinho.
- Especificação de valores e quantidades.
- Cálculo automático do valor total das compras.

## Dependências

### Frontend

- [react-toastify](https://github.com/fkhadra/react-toastify)
- [sweetalert2](https://sweetalert2.github.io/)
