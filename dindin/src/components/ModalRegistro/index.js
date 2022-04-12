import './style.css';
import fecharBtn from '../../assets/fechar.svg';
import api from '../../services/api';
import {useEffect, useState} from 'react';

function ModalRegistro({mostrarModalRegistro, fecharModalRegistro, listagemTransacoes, extratoTransacao}) {
    
    const [listaCategorias, setListaCategorias] = useState([]);
    const [btnEntrada, setBtnEntrada] = useState(false);
    const [btnSaida, setBtnSaida] = useState(true);
    const [formRegistro, setFormRegistro] = useState({descricao:'', valor:'', data:'', categoria_id:'', tipo:'saida'});

    function registrarEntrada() {
        setBtnEntrada(true);
        setBtnSaida(false);
        setFormRegistro({...formRegistro, tipo: 'entrada'});
    };

    function registrarSaida() {
        setBtnEntrada(false);
        setBtnSaida(true);
        setFormRegistro({...formRegistro, tipo: 'saida'});
    };

    function mudarValorInputRegistro(e) {
        setFormRegistro({...formRegistro, [e.target.name]: e.target.value});
    };

    async function submeterFormRegistro(e) {
        e.preventDefault();
    
        if (!formRegistro.valor || !formRegistro.categoria_id || !formRegistro.data || !formRegistro.descricao) {
            return;
        };

        try {
            const response = await api.post('/transacao',
                {
                    ...formRegistro
                }
            );
              
            fecharModalRegistro(false);
            extratoTransacao();
            listagemTransacoes();
        } catch (error) {
            console.log(error.message);
        };
    };

    async function listarCategoria(){
        try {
          const response = await api.get('/categoria');
          setListaCategorias(response.data);
          
        } catch (error) {
          console.log(error.message);
        };
    };

    useEffect(() => {
        listarCategoria()
    }, []);
    
  return (
    <>
        {mostrarModalRegistro &&

            <div className="modal-adicionar">
                <div className="container-modal-adicionar">
                    <div className="top-modal-adicionar">
                        <h1>Adicionar Registro</h1>
                        <img
                            src={fecharBtn}
                            alt="Botão fechar"
                            onClick={() => fecharModalRegistro(false)}
                        ></img>
                    </div>
                    <div className="btn-modal-adicionar">
                        <button 
                            className="btn-entrada"
                            onClick={() => registrarEntrada()}
                            style={btnEntrada ? {backgroundColor: '#3A9FF1'} : {backgroundColor: '#B9B9B9'}}
                        >
                            Entrada
                        </button>
                        <button
                            className="btn-saida"
                            onClick={() => registrarSaida()}
                            style={btnSaida ? {backgroundColor: '#FF576B'} : {backgroundColor: '#B9B9B9'}}
                        >
                            Saída
                        </button>
                    </div>
                    <form onSubmit={submeterFormRegistro} className="form-modal-adicionar">
                        <label>Valor</label>
                        <input 
                            type="text"
                            name="valor"
                            value={formRegistro.valor}
                            onChange={mudarValorInputRegistro}
                            required
                        ></input>

                        <label>Categoria</label>
                        <select name="categoria_id" required onChange={mudarValorInputRegistro}>
                            <option value=""></option>
                            {listaCategorias.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >{item.descricao}</option>
                            ))}
                        </select>

                        <label>Data</label>
                        <input
                            type="date"
                            name="data"
                            value={formRegistro.data}
                            onChange={mudarValorInputRegistro}
                            required
                        ></input>

                        <label>Descrição</label>
                        <input 
                            type="text"
                            name="descricao"
                            value={formRegistro.descricao}
                            onChange={mudarValorInputRegistro}
                            required
                        ></input>

                        <button type='submit'>Confirmar</button>
                    </form>
                </div>
            </div>
        }
    </>
  );
}

export default ModalRegistro;