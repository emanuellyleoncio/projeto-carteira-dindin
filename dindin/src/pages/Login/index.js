import './style.css';
import logo from '../../assets/logo.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import {setItem, getItem} from '../../utils/storage';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  
  useEffect(() => {
    const token = getItem('token');

    if (token){
      navigate('/');
    }
  }, [])

  async function submitFormulario(e){
    e.preventDefault();
    try {
      if(!email || !senha) {
        return;
      };

      const response = await api.post('/login', {
        email,
        senha
      });

      const {token} = response.data;
      setItem('token', token);
      console.log(token)
      
      const userId = response.data.usuario.id;
      setItem('userId', userId);


      navigate('/home');
    } catch (error) {
      console.log(error.response.data.mensagem);
    };
  };

  return (
    <div className="container-login">
      <img className="logo" src={logo} alt="Logo"></img>
      
      <div className="conteudo-login">
        <div className="intro">
          <h1>Controle suas finanças, sem planilha chata.</h1>
          <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
          <button><Link to='/cadastro'>Cadastro</Link></button>
        </div>

        <div className="formulario">
          <h1>Login</h1>
          <form onSubmit={submitFormulario} className="form-login">
            <label>E-mail</label>
            <input
              type="text"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>

            <label>Password</label>
            <input
              type="password"
              name='senha'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            ></input>

            <button>Entrar</button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default Login;
