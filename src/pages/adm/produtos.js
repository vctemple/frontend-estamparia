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
  RiAddCircleLine,
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
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    listarProdutos();
    //eslint-disable-next-line
  }, []);

  const handleAtivacao = async (sku, ativo_sku) => {
    await axios
      .put("http://localhost:3001/api/v1/produtos/ativacaoSKU/" + sku, {
        ativo_sku,
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
      <div
        className="table"
        style={{
          flexDirection: "column",
          maxHeight: "80vh",
          justifyContent: "normal",
        }}
      >
        <table style={{ width: "auto" }}>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {Produtos?.map((p) => (
              <tr key={p._id} style={{display: "grid", borderBottomStyle: "groove",
              borderBottomColor: "#302c2c",}}>
                
                <table style={{ width: "auto" }}>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                  <td>
                  <img
                    width={50}
                    height={50}
                    src={p.imgEstampa}
                    style={{ borderRadius: "10px" }}
                  ></img>
                </td>

                <td>{p.nome_estampa}</td>
                <td>{p.descricao}</td>
                <td className="tdEspecial">
                  <NavLink to={`/auth-login/auth-gerente/cadastroSKU/${p._id}`}>
                    <RiAddCircleLine size="25px" />
                  </NavLink>
                </td>
                    {p.SKUs.map((s) => (
                      <tr key={s.sku} style={{borderBottom: "1px solid #ccc"}}>
                        <td><img
                          width={50}
                          height={50}
                          src={s.imgFrente}
                          style={{ borderRadius: "10px" }}
                        ></img></td>
                        <td>{s.sku}</td>
                        <td>{s.dimensao_estampa}</td>
                        <td>{s.tipo_estampa}</td>
                        <td>{s.tecido_camiseta}</td>
                        <td>{s.cor_camiseta}</td>
                        <td>{s.tamanho_camiseta}</td>
                        <td>{s.marca_camiseta}</td>
                        <td>{s.fornecedor.nome}</td>
                        <td>{s.quantidade}</td>
                        <td
                          onClick={() => handleAtivacao(s.sku, s.ativo_sku)}
                          style={{ borderColor: "#fff", padding: "0" }}
                        >
                          {s.ativo_sku ? (
                            <RiCheckboxCircleFill
                              size="25px"
                              className="icon"
                            />
                          ) : (
                            <RiCloseCircleFill size="25px" className="icon" />
                          )}
                        </td>
                        <td className="tdEspecial">
                          <NavLink
                            to={`/auth-login/auth-gerente/editarSKU/${s.sku}`}
                          >
                            <RiFileEditLine size="25px" />
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProdutosPage;
