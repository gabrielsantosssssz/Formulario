import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import api from '../../services/api';

function Home() {
  const [mensagem, setMensagem] = useState('');
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputTelefone = useRef();
  const inputEmail = useRef();

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await api.get('/usuarios');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }
    getUsers();
  }, []);

  const createUsers = async (e) => {
    e.preventDefault();

    const name = inputName.current.value.trim();
    const telefone = inputTelefone.current.value.trim();
    const email = inputEmail.current.value.trim();

    console.log("Name:", name);
    console.log("Telefone:", telefone);
    console.log("Email:", email);

    if (!name || !telefone || !email) {
      setMensagem('Todos os campos são obrigatórios!');
      return;
    }

    try {
      console.log("Enviando requisição para API...");
      const response = await api.post('/usuarios', { name, telefone, email });
      console.log("Resposta da API:", response.data);
      setMensagem('Usuário cadastrado com sucesso!');

      // Atualiza a lista de usuários
      const updatedUsers = await api.get('/usuarios');
      setUsers(updatedUsers.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setMensagem('Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="container">
      <h1 className="form">Formulário de Contato</h1>
      <form onSubmit={createUsers}>
        <div className="input-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" ref={inputName} required />
        </div>

        <div className="input-group">
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" id="telefone" ref={inputTelefone} placeholder="(XX) XXXXX-XXXX" required />
        </div>

        <div className="input-group">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" ref={inputEmail} required />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}

      <Link to="/lista-contatos" className="link">Ir para lista de contatos</Link>

      <h2>Usuários da API:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
