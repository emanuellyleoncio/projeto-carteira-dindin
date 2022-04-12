import './style.css';
import retangulo from '../../assets/retangulo.svg';
import api from '../../services/api';

function PopupApagar({popup, setPopup, transacaoAtual, extratoTransacao, listagemTransacoes}){

    function fecharPopup(){
        setPopup(false);
    };

    async function apagarTransacao(){
        try {
            const response = await api.delete(`/transacao/${transacaoAtual}`);
            await extratoTransacao();
            await listagemTransacoes();
            setPopup(false);
        } catch (error) {
            console.log(error.message);
        };
    }

    return(
        <>
            {popup &&
                <div className='container-popup'>
                    <div className='popup'>
                        <img src={retangulo}></img>
                        <span>Apagar item?</span>
                        <div className='popup-btn'>
                            <button
                                onClick={() => apagarTransacao()} 
                                className='popup-btn-sim'
                            >Sim</button>
                            <button
                                onClick={() => fecharPopup()}
                                className='popup-btn-nao'
                            >Não</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PopupApagar;