import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout.js";
import "../../styles/listas.css";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import format from "date-fns/format";

const ProdutosPage = () => {
  const [Produtos, setProdutos] = useState([]);

  const listarProdutos = async () => {
    try {
      const dados = await axios.get(
        "http://localhost:3001/api/v1/produtos/listaEstampa"
      );
      const todosProdutos = dados.data.produtos;
      for (let i = 0; i < todosProdutos.length; i++) {
        if (!todosProdutos[i].ativo_estampa) delete todosProdutos[i];
      }
      setProdutos(todosProdutos);
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

  function dataBr(data) {
    let newData = Date.parse(data);
    return format(newData, "dd/MM/yyyy");
  }

  return (
    <Layout>
      <h1>Estampas disponíveis para cadastro</h1>
      <div
        className="table"
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh",
          justifyContent: "normal",
          alignItems: "center",
        }}
      >
        <table style={{  }}>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Produtos?.map((p) => (
              <NavLink to={`/auth-login/auth-gerente/cadastroSKU/${p._id}`}>
                <tr key={p._id} className="trHover" style={{ display: "flex", minWidth: "40rem", justifyContent: "space-evenly" }}>
                  <td>
                    <img
                      width={50}
                      height={50}
                      src={p.imgEstampa}
                      style={{ borderRadius: "10px" }}
                    ></img>
                  </td>

                  <td style={{minWidth: "16rem"}}>{p.nome_estampa}</td>
                  <td style={{minWidth: "16rem"}}>{p.descricao}</td>
                  <td>{dataBr(p.createdAt)}</td>
                </tr>
              </NavLink>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProdutosPage;
