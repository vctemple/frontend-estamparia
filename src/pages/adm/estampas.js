import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout.js";
import "../../styles/listas.css";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import format from "date-fns/format";
import {
  RiFileEditLine,
  RiCloseCircleFill,
  RiCheckboxCircleFill,
  RiAddCircleLine,
} from "react-icons/ri";

const ProdutosPage = () => {
  const [Produtos, setProdutos] = useState([]);

  const listarProdutos = async () => {
    try {
      const dados = await axios.get(
        "http://localhost:3001/api/v1/produtos/listaEstampa"
      );
      setProdutos(dados.data.produtos);
    } catch (e) {
      console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message",
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    listarProdutos();
    //eslint-disable-next-line
  }, []);

  const handleAtivacao = async (_id, ativo) => {
    await axios
      .put("http://localhost:3001/api/v1/produtos/ativacaoEstampa/" + _id, {
        ativo,
      })
      .then(window.location.reload())
      .catch((err) => {
        toast.error(err.message, {
          className: "toast-message",
        });
      });
  };

  function dataBr(data) {
    let newData = Date.parse(data);
    return format(newData, "dd/MM/yyyy");
  }

  return (
    <Layout>
      <h1>Lista de Estampas</h1>
      <div className="table">
        <table style={{ width: "auto" }}>
          <thead>
            <tr>
              <th style={{ border: 0, backgroundColor: "#fff" }}></th>
              <th>Nome</th>
              <th>Data de cadastro</th>
            </tr>
          </thead>
          <tbody>
            {Produtos?.map((p) => (
              <tr key={p._id}>
                <img
                  width={50}
                  height={50}
                  src={p.imgEstampa}
                  style={{ borderRadius: "10px" }}
                ></img>

                <td>{p.nome_estampa}</td>
                <td>{dataBr(p.createdAt)}</td>
                <td className="tdEspecial">
                  <NavLink
                    to={`/auth-login/auth-gerente/cadastroSKU/${p._id}`}
                  >
                    <RiAddCircleLine size="25px" />
                  </NavLink>
                </td>
                <td className="tdEspecial">
                  <NavLink
                    to={`/auth-login/auth-gerente/editarEstampa/${p._id}`}
                  >
                    <RiFileEditLine size="25px" />
                  </NavLink>
                </td>
                <td
                  onClick={() => handleAtivacao(p._id, p.ativo_estampa)}
                  style={{ borderColor: "#fff", padding: "0" }}
                >
                  {p.ativo_estampa ? (
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
