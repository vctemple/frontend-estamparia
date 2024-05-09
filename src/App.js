import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Carrinho from "./pages/carrinho.js";
import PaginaNaoEncontrada from "./pages/paginaNaoEncontrada.js";
import Login from "./pages/login.js";
import Cadastro from "./pages/cadastro.js";
// import Dashboard from "./pages/adm/dashboard.js";
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
import EditarEstampa from "./pages/adm/editarEstampa.js";
import CadastroFornecedores from "./pages/adm/cadastroFornecedores.js";
import EditarFornecedor from "./pages/adm/editarFornecedor.js";
import CadastroUsuario from "./pages/adm/cadastrarUsuario.js";
import UsuarioDados from "./pages/adm/usuarioDados.js";
import DetalheProduto from "./pages/detalheProduto.js";
import CadastroEstampa from "./pages/adm/cadastroEstampa.js";
import Estampas from "./pages/adm/estampas.js";
import ListaEstampaProd from "./pages/adm/listaEstampaProd.js";
import Anuncios from "./pages/adm/anuncios.js"
import CadastroAnuncio from "./pages/adm/cadastroAnuncio.js";
import BalancoFinanceiro from "./pages/adm/balancoFinanceiro.js";
import Pagamento from "./pages/pagamento.js"
import BalancoVendas from "./pages/adm/balancoVendas.js";
import EditarAnuncio from "./pages/adm/editarAnuncio.js";
import ProdPersonalizado from "./pages/prodPersonalizado.js";
import CadastroCamiseta from "./pages/adm/cadastroCamiseta.js";
import Pedidos from "./pages/adm/pedidos.js";
import Camisetas from "./pages/adm/camisetas.js";
import EditarCamiseta from "./pages/adm/editarCamisetaLisa.js";
import DetalhePedido from "./pages/adm/detalhePedido.js";
import ClientesPage from "./pages/adm/clientesSistema.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="*" element={<PaginaNaoEncontrada />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produto/:pid/:tam/:cor/:pMin/:pMax" element={<DetalheProduto />} />
        <Route path="/prodPersonalizado" element={<ProdPersonalizado />} />

        <Route path="/auth-login" element={<RotaPrivada />}>
          <Route path="/auth-login/usuario" element={<Usuario />} />
          <Route path="/auth-login/pagamento/:pid" element={<Pagamento />} />
          <Route path="/auth-login/detalhePedido/:pid" element={<DetalhePedido />} />

          <Route path="/auth-login/auth-gerente" element={<RotaGerente />}>
            {/* <Route
              path="/auth-login/auth-gerente/dashboard"
              element={<Dashboard />}
            /> */}
            <Route
              path="/auth-login/auth-gerente/produtos"
              element={<Produtos />}
            />
            <Route
              path="/auth-login/auth-gerente/estampas"
              element={<Estampas />}
            />
            <Route
              path="/auth-login/auth-gerente/anuncios"
              element={<Anuncios/>}
            />
            <Route
              path="/auth-login/auth-gerente/editaranuncio/:pid"
              element={<EditarAnuncio/>}
            />
            <Route
              path="/auth-login/auth-gerente/cadastroAnuncio"
              element={<CadastroAnuncio/>}
            />
            <Route
              path="/auth-login/auth-gerente/listaEstampaProd"
              element={<ListaEstampaProd />}
            />
            <Route
              path="/auth-login/auth-gerente/cadastroSKU/:pid"
              element={<CadastroProduto />}
            />
            <Route
              path="/auth-login/auth-gerente/cadastroEstampa"
              element={<CadastroEstampa />}
            />
            <Route
              path="/auth-login/auth-gerente/editarSKU/:pid"
              element={<EditarProduto />}
            />
            <Route
              path="/auth-login/auth-gerente/editarEstampa/:pid"
              element={<EditarEstampa />}
            />
            <Route
              path="/auth-login/auth-gerente/banner"
              element={<Banner />}
            />
            <Route
              path="/auth-login/auth-gerente/balancoVendas"
              element={<BalancoVendas />}
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
              <Route
                path="/auth-login/auth-gerente/auth-adm/editarFornecedor/:pid"
                element={<EditarFornecedor />}
              />
              <Route
                path="/auth-login/auth-gerente/auth-adm/usuariosSistema"
                element={<UsuariosSistema />}
              />
              <Route
                path="/auth-login/auth-gerente/auth-adm/clientesSistema"
                element={<ClientesPage />}
              />
              <Route
                path="/auth-login/auth-gerente/auth-adm/usuarioDados/:pid"
                element={<UsuarioDados />}
              />
              <Route
                path="/auth-login/auth-gerente/auth-adm/cadastroUsuario"
                element={<CadastroUsuario />}
              />
              <Route
                path="/auth-login/auth-gerente/auth-adm/balancoFinanceiro"
                element={<BalancoFinanceiro />}
              />
              <Route
                path="/auth-login/auth-gerente/auth-adm/cadastroCamiseta"
                element={<CadastroCamiseta />}
              />
              <Route
                path="/auth-login/auth-gerente/auth-adm/camisetas_lisas"
                element={<Camisetas />}
              />
              <Route
                path="/auth-login/auth-gerente/auth-adm/editarCamiseta/:pid"
                element={<EditarCamiseta />}
              />
              <Route
                path="/auth-login/auth-gerente/auth-adm/pedidos"
                element={<Pedidos />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
