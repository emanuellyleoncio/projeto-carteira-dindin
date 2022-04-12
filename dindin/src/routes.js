import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import {getItem} from './utils/storage';

function RotaProtegida({ redirectTo }) {
    const autenticado = getItem('token');
    return autenticado ? <Outlet /> : <Navigate to={redirectTo} />
}

function Rotas() {
  return (
    <div className="container-rotas">
        <Routes>
            <Route 
                path='/'
                element={<Login />}
            ></Route>
            <Route 
                path='/cadastro'
                element={<Cadastro />}
            ></Route>
            <Route element={<RotaProtegida redirectTo={'/'}/>}>
                <Route 
                    path='/home'
                    element={<Home />}
                ></Route>
            </Route>
        </Routes>

    </div>
  );
}

export default Rotas;
