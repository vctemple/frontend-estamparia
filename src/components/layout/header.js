import React from "react";
import "../../styles/header.css";
import logo1 from "../../imgs/Estamparia_logo1.png";
import logo2 from "../../imgs/Estamparia_logo2.png";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";
import { UseAuth } from "../../context/auth";
import { toast } from "react-toastify";

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
              {" "}
              {/*Tornar dinâmico e adicionar o carrinho cheio*/}
              {!auth.usuario ? (
                <>
                  <IconePersonalizado to="/login">Login</IconePersonalizado>
                  <IconePersonalizado to="/cadastro">
                    Cadastro
                  </IconePersonalizado>
                </>
              ) : (
                <>
                  <li>
                    <NavLink onClick={handleLogout} to="/">
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
              <IconePersonalizado to="/carrinho">
                Carrinho&#160;
                <RiShoppingCart2Line />
              </IconePersonalizado>
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
