import './style.css';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api';

function UsuarioCadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({nome:'', email:'', senha:'', confirma:''});

  function mudarValorInput(e) {
    setForm({...form, [e.target.name]: e.target.value});
  };

  async function submeterForm(e) {
    e.preventDefault();

    if (!form.nome || !form.email || !form.senha || !form.confirma) {
      return;
    };

    if (form.senha !== form.confirma){
      return;
    };

    try {
      const response = await api.post('/usuario', {
        ...form
      });
      
      navigate('/');
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className="container-cadastro">

      <img className="logo-cadastro" src={logo} alt="Logo"></img>
      
      <div className="conteudo-cadastro">
        <h1>Login</h1>

        <form onSubmit={submeterForm} className="form-cadastro">
          <label>Nome</label>
          <input
            type="text"
            name='nome'
            value={form.nome}
            onChange={mudarValorInput}
            required
          ></input>

          <label>E-mail</label>
          <input
            type="text"
            name='email'
            value={form.email}
            onChange={mudarValorInput}
            required
          ></input>

          <label>Password</label>
          <input
            type="password"
            name='senha'
            value={form.senha}
            onChange={mudarValorInput}
            required
          ></input>

          <label>Confirmação de senha</label>
          <input
            type="password"
            name='confirma'
            value={form.confirma}
            onChange={mudarValorInput}
            required
          ></input>

          <button type='submit'>Cadastrar</button>
        </form>

        <span>Já tem cadastro? <Link to="/">Clique aqui!</Link></span>

      </div>

    </div>
  );
}

export default UsuarioCadastro;
