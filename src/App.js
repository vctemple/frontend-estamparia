import { Routes, Route } from "react-router-dom";
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
import RotaGerente from "./components/routes/rotaGerente.js";
import Produtos from "./pages/adm/produtos.js";
import Banner from "./pages/adm/banner.js";
import UsuariosSistema from "./pages/adm/usuariosSistema.js";
import Fornecedores from "./pages/adm/fornecedores.js";
import CadastroProduto from "./pages/adm/cadastroProdutos.js";
import EditarProduto from "./pages/adm/editarProduto.js";
import CadastroFornecedores from "./pages/adm/cadastroFornecedores.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="*" element={<PaginaNaoEncontrada />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/auth-login" element={<RotaPrivada />}>
          <Route path="/auth-login/usuario" element={<Usuario />} />

          <Route path="/auth-login/auth-gerente" element={<RotaGerente />}>
            <Route
              path="/auth-login/auth-gerente/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/auth-login/auth-gerente/produtos"
              element={<Produtos />}
            />
            <Route
              path="/auth-login/auth-gerente/cadastroProduto"
              element={<CadastroProduto />}
            />
            <Route
              path="/auth-login/auth-gerente/editarProduto/:pid"
              element={<EditarProduto />}
            />
            <Route
              path="/auth-login/auth-gerente/banner"
              element={<Banner />}
            />

            <Route
              path="/auth-login/auth-gerente/auth-adm"
              element={<RotaAdm />}
            >
              <Route
                path="/auth-login/auth-gerente/auth-adm/fornecedores"
                element={<Fornecedores />}
              />
              <Route
                path="/auth-login/auth-gerente/auth-adm/cadastroFornecedor"
                element={<CadastroFornecedores />}
              />
              {/* <Route
                path="/auth-login/auth-gerente/auth-adm/editarFornecedor/:pid"
                element={<EditarFornecedor />}
              /> */}
              <Route
                path="/auth-login/auth-gerente/auth-adm/usuariosSistema"
                element={<UsuariosSistema />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
