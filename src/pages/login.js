import React, { useState } from "react";
import Layout from "../components/layout/layout.js";
import "../styles/auth.css";
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const res = await axios.post(`http://localhost:3001/api/v1/auth/login`, {
        email,
        senha
      });

      if(res && res.data.success) {
        alert(res.data.message);
  
      } else{
        toast.error(res.data.message, {
          className: "toast-message"
        });
      }
    } catch (err) {
      toast.error("Algo deu errado", {
        className: "toast-message"
      });
    }
  }
  
  return (
    <Layout className="container">
      <h1>Login</h1>
      <div className="forms">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="user@user.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="senha"
              name="senha"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
      <div className="link">
        <NavLink to="/cadastro">
          <p>Cadastrar-se</p>
        </NavLink>
      </div>
      <div className="link">
        <NavLink to="/recuperarSenha">
          <p>Recuperar senha</p>
        </NavLink>
      </div>
    </Layout>
  );
}

export default Login