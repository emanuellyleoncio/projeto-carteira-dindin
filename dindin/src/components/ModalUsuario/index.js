import './style.css';
import fecharBtn from '../../assets/fechar.svg';
import api from '../../services/api';
import {useState} from 'react';
import {getItem} from '../../utils/storage';

function ModalUsuario({mostrarModalUsuario, fecharModalUsuario}) {
    const [formAtualizarUsuario, setformAtualizarUsuario] = useState({nome:'', email:'', senha:'', confirma:''})

    function mudarValorInputUsuario(e){
        setformAtualizarUsuario({...formAtualizarUsuario, [e.target.name]: e.target.value});
    };

    async function submeterFormAtualizarUsuario(e){
        e.preventDefault();

        if (!formAtualizarUsuario.nome || !formAtualizarUsuario.email || !formAtualizarUsuario.senha || !formAtualizarUsuario.confirma){
            return;
        };

        if (formAtualizarUsuario.senha !== formAtualizarUsuario.confirma) {
            return;
        };

        try {
            const response = await api.put('/usuario',{...formAtualizarUsuario});
            fecharModalUsuario(false);
        } catch (error) {
            console.log(error.message);
        };

    };
    

  return (
    <>
        {mostrarModalUsuario &&

            <div className="modal-usuario">
                <div className="container-modal-usuario">
                    <div className="top-modal-usuario">
                        <h1>Editar Perfil</h1>
                        <img
                            src={fecharBtn}
                            alt="Botão fechar"
                            onClick={() => fecharModalUsuario(false)}
                        ></img>
                    </div>
                    <form onSubmit={submeterFormAtualizarUsuario} className="form-modal-usuario">
                        <label>Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={formAtualizarUsuario.nome}
                            onChange={mudarValorInputUsuario}
                            required
                        ></input>

                        <label>E-mail</label>
                        <input 
                            type="text"
                            name="email"
                            value={formAtualizarUsuario.email}
                            onChange={mudarValorInputUsuario}
                            required
                        ></input>

                        <label>Senha</label>
                        <input 
                            type="password"
                            name="senha"
                            value={formAtualizarUsuario.senha}
                            onChange={mudarValorInputUsuario}
                            required
                        ></input>

                        <label>Confirmação de senha</label>
                        <input
                            type="password"
                            name="confirma"
                            value={formAtualizarUsuario.confirma}
                            onChange={mudarValorInputUsuario}
                            required
                        ></input>

                        <button>Confirmar</button>
                    </form>
                </div>
            </div>
        }
    
    </>
  );
}

export default ModalUsuario;