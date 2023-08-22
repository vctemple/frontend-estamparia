import React from "react";
import "../../styles/header.css";
import logo1 from "../../imgs/Estamparia_logo1.png";
import logo2 from "../../imgs/Estamparia_logo2.png";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";
import { UseAuth } from "../../context/auth";
import { toast } from "react-toastify";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import "../../styles/dropDownMenu.css";

const header = () => {
  const [auth, setAuth] = UseAuth();
  const handleLogout = () => {
    try {
      setAuth({
        ...auth,
        usuario: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Logout com sucesso!", {
        className: "toast-message",
      });
    } catch (e) {
      toast.error("Algo deu errado!", {
        className: "toast-message",
      });
    }
  };

  function PerfilSelecao (){
    if(auth?.usuario){
      switch (auth.usuario.perfil){
        case 0:
          return [
            <IconePersonalizado to="/carrinho">Carrinho&#160;<RiShoppingCart2Line/></IconePersonalizado>,
            <IconePersonalizado to="/usuario">Usuário</IconePersonalizado>,
            <li>
                <NavLink onClick={handleLogout} to="/">
                  Logout
                </NavLink>
            </li>
          ]   
        case 1:
          return [
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <li>
                  <a>Adm</a>
                </li>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Dashboard
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
             </DropdownMenu.Root>,
            
            <li>
                <NavLink onClick={handleLogout} to="/">
                  Logout
                </NavLink>
            </li>
          ]
          case 2:
            return [
              (
              <DropdownMenu.Root>Gerente</DropdownMenu.Root>
              ),
              
              <li>
                  <NavLink onClick={handleLogout} to="/">
                    Logout
                  </NavLink>
              </li>
            ]
      }
    } else{
      return [
            <IconePersonalizado to="/login">Login</IconePersonalizado>,
            <IconePersonalizado to="/cadastro">Cadastro</IconePersonalizado>,
            <IconePersonalizado to="/carrinho">Carrinho&#160;<RiShoppingCart2Line/></IconePersonalizado>
      ]
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
              <PerfilSelecao/>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="menu-space" />
    </div>
  );
};

//function Dropdown()

export default header;
