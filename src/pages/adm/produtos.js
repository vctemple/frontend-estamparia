import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout.js";
import "../../styles/listas.css";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import {
  RiFileEditLine,
  RiCloseCircleFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";

const ProdutosPage = () => {
  const [Produtos, setProdutos] = useState([]);

  const listarProdutos = async () => {
    try {
      const dados = await axios.get("http://localhost:3001/api/v1/produtos/");
      setProdutos(dados.data.produtos);
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
    listarProdutos();
    //eslint-disable-next-line
  }, []);

  const handleAtivacao = async (_id, ativo) => {
    await axios
      .put("http://localhost:3001/api/v1/produtos/ativacao/" + _id, {
        ativo,
      })
      .then(window.location.reload())
      .catch((err) => {
        toast.error(err.message, {
          className: "toast-message",
        });
      });
  };

  return (
    <Layout>
      <h1>Lista de Produtos</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th style={{ border: 0, backgroundColor: "#fff" }}></th>
              <th>Nome</th>
              <th>Tecido</th>
              <th>Estampa</th>
              <th>Quantidade</th>
              <th>Tamanho</th>
              <th>Cor</th>
              <th>Preço</th>
              <th>Custo</th>
              <th>Fornecedor</th>
              <th>Marca</th>
            </tr>
          </thead>
          <tbody>
            {Produtos?.map((p) => (
              <tr key={p._id}>
                <img
                  width={50}
                  height={50}
                  src={p.imgFrente}
                  style={{ borderRadius: "10px" }}
                ></img>

                <td>{p.nome}</td>
                <td>{p.tecido}</td>
                <td>{p.estampa}</td>
                <td>{p.quantidade}</td>
                <td>{p.tamanho}</td>
                <td>{p.cor}</td>
                <td>{p.preco}</td>
                <td>{p.custo}</td>
                <td>{p.fornecedor.nome}</td>
                <td>{p.marca}</td>
                <td className="tdEspecial">
                  <NavLink
                    to={`/auth-login/auth-gerente/editarProduto/${p._id}`}
                  >
                    <RiFileEditLine size="25px" />
                  </NavLink>
                </td>
                <td
                  onClick={() => handleAtivacao(p._id, p.ativo)}
                  style={{ borderColor: "#fff", padding: "0" }}
                >
                  {p.ativo ? (
                    <RiCheckboxCircleFill size="25px" className="icon" />
                  ) : (
                    <RiCloseCircleFill size="25px" className="icon" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProdutosPage;
