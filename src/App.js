import {Routes, Route} from "react-router-dom";
import Home from "./pages/home.js";
import Carrinho from "./pages/carrinho.js";
import PaginaNaoEncontrada from "./pages/paginaNaoEncontrada.js";
import Login from "./pages/login.js";
import Cadastro from "./pages/cadastro.js";
import Dashboard from "./pages/adm/dashboard.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RotaPrivada from "./components/routes/rotaPrivada.js";
import Usuario from "./pages/usuario/usuario.js";
import RotaAdm from "./components/routes/rotaAdm.js";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/carrinho" element={<Carrinho />}/>
        <Route path="*" element={<PaginaNaoEncontrada />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/auth-login" element={<RotaPrivada />}>
          <Route path="/auth-login/usuario" element={<Usuario />}/>
          <Route path="/auth-login/auth-perfil-adm" element={<RotaAdm />}>
            <Route path="/auth-login/auth-perfil-adm/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
