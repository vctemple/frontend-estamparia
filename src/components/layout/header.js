import React, { useEffect, useState } from "react";
import "../../styles/header.css";
import logo1 from "../../imgs/Estamparia_logo1.png";
import logo2 from "../../imgs/Estamparia_logo2.png";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";
import { UseAuth } from "../../context/auth.js";
import { toast } from "react-toastify";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "../../styles/dropDownMenu.css";

const Header = () => {
  const [auth, setAuth] = UseAuth();
  const [carrinho, setCarrinho] = useState([]);
  const handleLogout = () => {
    try {
      setAuth({
        ...auth,
        usuario: null,
        token: "",
      });
      sessionStorage.removeItem("auth");
      toast.success("Logout com sucesso!", {
        className: "toast-message",
        position: "top-center",
                      autoClose: 1500,
                      theme: "dark"
      });
    } catch (e) {
      toast.error("Algo deu errado!", {
        className: "toast-message",
        position: "top-center",
                      autoClose: 1500,
                      theme: "dark"
      });
    }
  };

  useEffect(() => {
    const data = window.sessionStorage.getItem("carrinho")
    if(data !== null) setCarrinho(JSON.parse(sessionStorage.getItem("carrinho")))
  }, [])

  useEffect(() => {
    setCarrinho(JSON.parse(sessionStorage.getItem("carrinho")))
  }, [sessionStorage.getItem("carrinho")])
  
  function PerfilSelecao() {
    if (auth?.usuario) {
      switch (auth.usuario.perfil) {
        case 0:
          return [
            <IconePersonalizado to="/carrinho">
              Carrinho&#160; {carrinho?.length ? <RiShoppingCart2Fill /> : <RiShoppingCart2Line />} {carrinho?.length}

            </IconePersonalizado>,
            <IconePersonalizado to="/auth-login/usuario">Usuário</IconePersonalizado>,
            <li>
              <NavLink onClick={handleLogout} to="/">
                Logout
              </NavLink>
            </li>,
          ];
        case 1:
          return [
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <li>
                  <a>Adm</a>
                </li>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent">
                  <DropdownMenu.Item className="DropdownMenuItem">
                    <NavLink to="/auth-login/auth-gerente/dashboard">
                      Dashboard
                    </NavLink>
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="DropdownMenuSeparator" />

                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                      <NavLink to="/auth-login/auth-gerente/produtos">
                        Produtos
                      </NavLink>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent className="DropdownMenuSubContent">
                      <DropdownMenu.Item className="DropdownMenuItem">
                        <NavLink to="/auth-login/auth-gerente/cadastroProduto">
                          Cadastrar Produto
                        </NavLink>
                      </DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>

                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                      <NavLink to="/auth-login/auth-gerente/auth-adm/fornecedores">
                        Fornecedores
                      </NavLink>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent className="DropdownMenuSubContent">
                      <DropdownMenu.Item className="DropdownMenuItem">
                        <NavLink to="/auth-login/auth-gerente/auth-adm/cadastroFornecedor">
                          Cadastrar Fornecedor
                        </NavLink>
                      </DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>

                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                      <NavLink to="/auth-login/auth-gerente/auth-adm/usuariosSistema">
                        Usuários de sistema
                      </NavLink>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent className="DropdownMenuSubContent">
                      <DropdownMenu.Item className="DropdownMenuItem">
                        <NavLink to="/auth-login/auth-gerente/auth-adm/cadastroUsuario">
                          Cadastrar Usuário
                        </NavLink>
                      </DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>

                  <DropdownMenu.Separator className="DropdownMenuSeparator" />

                  <DropdownMenu.Item className="DropdownMenuItem">
                    Relatório de Vendas
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Relatório de Custos
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Relatório de Lucro
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="DropdownMenuSeparator" />

                  <DropdownMenu.Item className="DropdownMenuItem">
                    <NavLink to="/auth-login/auth-gerente/banner">
                      Banner
                    </NavLink>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>,
            <IconePersonalizado to="/auth-login/usuario">
              Usuário
            </IconePersonalizado>,
            <li>
              <NavLink onClick={handleLogout} to="/">
                Logout
              </NavLink>
            </li>,
          ];
        case 2:
          return [
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <li>
                  <a>Gerente</a>
                </li>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="DropdownMenuContent"
                  sideOffset={5}
                >
                  <DropdownMenu.Item className="DropdownMenuItem">
                    <NavLink to="/auth-login/auth-gerente/dashboard">
                      Dashboard
                    </NavLink>
                  </DropdownMenu.Item>

                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                      <NavLink to="/auth-login/auth-gerente/produtos">
                        Produtos
                      </NavLink>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent className="DropdownMenuSubContent">
                      <DropdownMenu.Item className="DropdownMenuItem">
                        <NavLink to="/auth-login/auth-gerente/cadastroProduto">
                          Cadastrar Produto
                        </NavLink>
                      </DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>

                  <DropdownMenu.Item className="DropdownMenuItem">
                    Relatório de Vendas
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="DropdownMenuItem">
                    <NavLink to="/auth-login/auth-gerente/banner">
                      Banner
                    </NavLink>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>,
            <IconePersonalizado to="/auth-login/usuario">
              Usuário
            </IconePersonalizado>,
            <li>
              <NavLink onClick={handleLogout} to="/">
                Logout
              </NavLink>
            </li>,
          ];
      }
    } else {
      return [
        <IconePersonalizado to="/login">Login</IconePersonalizado>,
        <IconePersonalizado to="/cadastro">Cadastro</IconePersonalizado>,
        <IconePersonalizado to="/carrinho">
          Carrinho&#160; {carrinho?.length ? <RiShoppingCart2Fill /> : <RiShoppingCart2Line />} {carrinho?.length}
        </IconePersonalizado>,
      ];
    }
  }

  function IconePersonalizado({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <li className={isActive ? "ativo" : ""}>
        <NavLink to={to} {...props}>
          {children}
        </NavLink>
      </li>
    );
  }

  return (
    <div>
      <input
        type="checkbox"
        id="close-menu"
        className="close-menu"
        aria-label="Close menu"
        role="button"
        aria-pressed="true"
      />
      <label
        htmlFor="close-menu"
        className="close-menu-label"
        title="close menu"
      ></label>
      <aside className="menu">
        <div className="menu-content content">
          <NavLink to="/">
            <img
              src={logo1}
              alt="Logo da empresa"
              className="logo"
              id="logo1"
            />
            <img
              src={logo2}
              alt="Logo da empresa"
              className="logo"
              id="logo2"
            />
          </NavLink>
          <nav>
            <ul>
              <PerfilSelecao />
            </ul>
          </nav>
        </div>
      </aside>
      <div className="menu-space" />
    </div>
  );
};



export default Header;
