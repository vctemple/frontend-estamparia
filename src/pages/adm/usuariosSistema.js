import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout.js";
import "../../styles/listas.css";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import {
  RiFileUserFill,
  RiCloseCircleFill,
  RiCheckboxCircleFill,
  RiDeleteBin5Line,
} from "react-icons/ri";

const UsuariosPage = () => {
  const [Usuarios, setUsuarios] = useState([]);

  const listarUsuarios = async () => {
    try {
      const dados = await axios.get("http://localhost:3001/api/v1/auth/usuarios");
      setUsuarios(dados.data.usuarios);
    } catch (e) {
      console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message",
      });
    }
  };

  useEffect(() => {
    listarUsuarios();
    //eslint-disable-next-line
  }, []);

  const handleAtivacao = async (_id, ativo) => {
    await axios
      .put("http://localhost:3001/api/v1/auth/ativacao/" + _id, {
        ativo,
      })
      .then(window.location.reload())
      .catch((err) => {
        toast.error(err.message, {
          className: "toast-message",
        });
      });
  };

  const handleDelete = async (_id) => {
    await axios
      .put("http://localhost:3001/api/v1/auth/delete/" + _id)
      .then(window.location.reload())
      .catch((err) => {
        toast.error(err.message, {
          className: "toast-message",
        });
      });
  };

  const mostraPerfil = (perfil) => {
    switch (perfil){
      case 0 : return "Cliente";
      case 1 : return "Admin";
      case 2: return "Gerente";
    }
  }

  return (
    <Layout>
      <h1>Lista de Usuários</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th style={{ border: 0, backgroundColor: "#fff" }}></th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Perfil</th>
            </tr>
          </thead>
          <tbody>
            {Usuarios?.map((u) => (
              <tr key={u._id}>
                <img
                  width={50}
                  height={50}
                  src={u.imagem}
                  style={{ borderRadius: "10px" }}
                ></img>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.telefone}</td>
                <td>{mostraPerfil(u.perfil)}</td>
                <td
                  style={{ borderColor: "#fff", padding: "0" }}
                >
                  <NavLink
                    to={`/auth-login/auth-gerente/auth-adm/usuarioDados/${u._id}`}
                  >
                    <RiFileUserFill size="25px" className="icon" />
                  </NavLink>
                </td>
                <td
                  onClick={() => handleAtivacao(u._id, u.ativo)}
                  style={{ borderColor: "#fff", padding: "0" }}
                >
                  {u.ativo ? (
                    <RiCheckboxCircleFill size="25px" className="icon" />
                  ) : (
                    <RiCloseCircleFill size="25px" className="icon" />
                  )}
                </td>
                <td
                  onClick={() => handleDelete(u._id)}
                  style={{ borderColor: "#fff", padding: "0" }}
                >
                  <RiDeleteBin5Line size="25px" className="icon" /> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UsuariosPage;
