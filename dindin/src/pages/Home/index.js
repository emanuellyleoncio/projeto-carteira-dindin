import './style.css';
import logo from '../../assets/logo.svg';
import userLogo from '../../assets/user-logo.svg';
import logout from '../../assets/logout.svg';
import filtro from '../../assets/filtro.svg';
import setaCima from '../../assets/seta-cima.svg';
import api from '../../services/api';
import ModalRegistro from '../../components/ModalRegistro';
import ModalUsuario from '../../components/ModalUsuario';
import TabelaTransacao from '../../components/TabelaTransacao';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function Home() {

  const [categorias, setCategorias] = useState([]);
  const [extrato, setExtrato] = useState({entrada:'', saida:'', saldo:''});
  const [listarTransacoes, setListarTransacoes] = useState([]);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [mostrarModalUsuario, setMostrarModalUsuario] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [ordenacao, setOrdenacao] = useState(false);

  function abrirModalRegistro() {
    setMostrarModalRegistro(true);
  };

  function fecharModalRegistro() {
    setMostrarModalRegistro(false);
  };

  function abrirModalUsuario() {
    setMostrarModalUsuario(true);
  }

  function fecharModalUsuario() {
    setMostrarModalUsuario(false);
  };

  async function dadosUsuario() {
    try {
      const response = await api.get('/usuario');
      const nomeInteiro = response.data.nome;
      const nome = nomeInteiro.split(' ');
      setNomeUsuario(nome[0]);
      
    } catch (error) {
      console.log(error.message);
    };
  };

  async function extratoTransacao() {
    try {
      const response = await api.get('/transacao/extrato');
      setExtrato({
        entrada: response.data.entrada/1000,
        saida: response.data.saida/1000,
        saldo: (response.data.entrada/1000 - response.data.saida/1000).toFixed(2)
      });

    } catch (error) {
      console.log(error.message)
    };
  };

  async function listagemTransacoes() {
    try {
      const response = await api.get('/transacao');
      setListarTransacoes(response.data);

    } catch (error) {
      console.log(error.message);
    };
  };
  

  async function resumoCategoria(){
    try {
      
      const response = await api.get('/categoria');
      setCategorias(response.data);
      
    } catch (error) {
      console.log(error.message);
    };
  };

  useEffect(() => {
    extratoTransacao();
    listagemTransacoes();
    dadosUsuario();
  }, []);
  

  return (
    <div className="container-home">

      <ModalRegistro
        mostrarModalRegistro={mostrarModalRegistro}
        fecharModalRegistro={fecharModalRegistro}
        listagemTransacoes={listagemTransacoes}
        extratoTransacao={extratoTransacao}
      />

      <ModalUsuario
        mostrarModalUsuario={mostrarModalUsuario}
        fecharModalUsuario={fecharModalUsuario}
      />
      
      <div className="home-header">

        <img className="logo"src={logo} alt="Logo"></img>

        <div className="usuario">
          <img src={userLogo} alt="Logo usuário" onClick={() => abrirModalUsuario()}></img>
          <h4>{nomeUsuario}</h4>
          <Link to='/'><img src={logout} alt="Sair"></img></Link>
        </div>
      </div>

      <div>
        <button className="btn-filtro"><img src={filtro} alt="Filtro"></img>Filtrar</button>

        <div className="home-conteudo">

          <table>
            <thead>
              <tr className="header-table">
                <th>Data <img src={setaCima} alt="Seta para cima"></img></th>
                <th>Dia da semana</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th></th>
              </tr>
            </thead>

            {listarTransacoes.map((item) => (
                <TabelaTransacao
                  item={item}
                  listarTransacoes={listarTransacoes}
                  listagemTransacoes={listagemTransacoes}
                  extratoTransacao={extratoTransacao}
                />
            ))}
          </table>

          <div className="home-conteudo-direita">
            <div className="resumo">
              <h1>Resumo</h1>
              <div className="resumo-transacao">
                <div className="resumo-entrada">
                  <h4>Entradas</h4>
                  <span className="dinheiro-entrada">R$ {extrato.entrada}</span>
                </div>
                <div className="resumo-saida">
                  <h4>Saídas</h4>
                  <span className="dinheiro-saida">R$ {extrato.saida}</span>
                </div>
              </div>
              <div className="resumo-saldo">
                <h3>Saldo</h3>
                <span className="dinheiro-saldo">R$ {extrato.saldo}</span>
              </div>
            </div>

            <button onClick={() => abrirModalRegistro()}>Adicionar Registro</button>
          </div>

          

        </div>
      </div>

      

    </div>
  );
}

export default Home;
