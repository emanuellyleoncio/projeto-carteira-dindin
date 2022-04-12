import './style.css';
import ModalEditarRegistro from '../ModalEditarRegistro';
import PopupApagar from '../PopupApagar';
import editar from '../../assets/editar.svg';
import apagar from '../../assets/apagar.svg';
import { format } from 'date-fns';
import {useState, useEffect} from 'react';
import ptBR from 'date-fns/locale/pt-BR';

function TabelaTransacao({item, abrirModalEditarRegistro, listarTransacoes, extratoTransacao, listagemTransacoes}) {
    const [mostrarModalEditarRegistro, setMostrarModalEditarRegistro] = useState(false);
    const [popup, setPopup] = useState(false)
    const [transacaoAtual, setTransacaoAtual] = useState(null);

    function abrirModalEditarRegistro() {
        setMostrarModalEditarRegistro(true);
    };
    
    function fecharModalEditarRegistro() {
        setMostrarModalEditarRegistro(false);
    };

    function abrirPopup(){
        setPopup(true);
    };

    useEffect(() => {
        const transacaoEditar = listarTransacoes.find((transacao) => {
            return transacao.id === item.id;
        });

        setTransacaoAtual(transacaoEditar.id);
    }, [mostrarModalEditarRegistro === true || popup === true]);


  return (
    <tbody key={item.id}>
        <tr key={item.id}>
            <td className='linha-data'>{format(new Date(item.data), 'dd/MM/yy')}</td>
            <td>{format(new Date(item.data), 'EEEE', {locale: ptBR})}</td>
            <td>{item.descricao}</td>
            <td>{item.categoria_nome}</td>
            <td
                style={item.tipo === 'entrada' ? {color: '#7B61FF'} : {color: '#FA8C10'}}
            >R$ {item.valor/1000}</td>
            <td className='transacao-editar'>
                <img
                    onClick={() => abrirModalEditarRegistro()}
                    className='linha-editar'
                    src={editar}
                    alt="Lápis de edição"
                ></img>
                <img
                    onClick={() => abrirPopup()}
                    className='linha-apagar'
                    src={apagar}
                    alt="Apagar"
                ></img>
                <PopupApagar
                    setPopup={setPopup}
                    popup={popup}
                    transacaoAtual={transacaoAtual}
                    extratoTransacao={extratoTransacao}
                    listagemTransacoes={listagemTransacoes}
                />
            </td>
            
        </tr>
        <ModalEditarRegistro
            mostrarModalEditarRegistro={mostrarModalEditarRegistro}
            fecharModalEditarRegistro={fecharModalEditarRegistro}
            transacaoAtual={transacaoAtual}
            extratoTransacao={extratoTransacao}
            listagemTransacoes={listagemTransacoes}
        />
    </tbody>
  );
}

export default TabelaTransacao;