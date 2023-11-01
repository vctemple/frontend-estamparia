import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout.js";
import "../../styles/listas.css";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import {
  RiFileEditLine,
  RiDeleteBin5Line,
} from "react-icons/ri";

const FornecedoresPage = () => {
  const [Fornecedores, setFornecedores] = useState([]);

  const listarFornecedores = async () => {
    try {
      const dados = await axios.get("http://localhost:3001/api/v1/fornecedores/");
      setFornecedores(dados.data.fornecedores);
    } catch (e) {
      console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message",
        position: "top-center",
                      autoClose: 1500,
                      theme: "dark"
      });
    }
  };

  useEffect(() => {
    listarFornecedores();
    //eslint-disable-next-line
  }, []);

  const handleDelete = async (_id) => {
    await axios
      .put("http://localhost:3001/api/v1/fornecedores/delete/" + _id)
      .then(window.location.reload())
      .catch((err) => {
        toast.error(err.message, {
          className: "toast-message",
          position: "top-center",
                      autoClose: 1500,
                      theme: "dark"
        });
      });
  };

  return (
    <Layout>
      <h1>Lista de Fornecedores</h1>
      <div className="table">
        <table style={{width: "auto"}}>
          <thead>
            <tr>
              <th style={{width: "15rem"}}>Nome</th>
              <th>Email</th>
              <th>CNPJ</th>
              <th>Telefone</th>
              <th>Cidade</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {Fornecedores?.map((f) => (
              <tr key={f._id}>
                 <td>{f.nome}</td>
                <td>{f.email}</td>
                <td>{f.cnpj}</td>
                <td>{f.telefone}</td>
                <td>{f.cidade}</td>
                <td>{f.estado}</td>
                <td className="tdEspecial">
                  <NavLink
                    to={`/auth-login/auth-gerente/auth-adm/editarFornecedor/${f._id}`}
                  >
                    <RiFileEditLine size="25px" />
                  </NavLink>
                </td>
                <td
                  onClick={() => handleDelete(f._id)}
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

export default FornecedoresPage;
