import {Routes, Route} from "react-router-dom";
import Home from "./pages/home.js";
import Carrinho from "./pages/carrinho.js";
import PaginaNaoEncontrada from "./pages/paginaNaoEncontrada.js";
import Login from "./pages/login.js";
import Cadastro from "./pages/cadastro.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/carrinho" element={<Carrinho />}/>
        <Route path="*" element={<PaginaNaoEncontrada />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro />}/>
      </Routes>
    </>
  );
}

export default App;
