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

const AnunciosPage = () => {
  const [anuncios, setAnuncios] = useState([]);

  const listarAnuncios = async () => {
    try {
      const dados = await axios.get("http://localhost:3001/api/v1/anuncios/");
      setAnuncios(dados.data.anuncios);
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
    listarAnuncios();
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
      <h1>Lista de Anúncios</h1>
      <div className="table">
        <table style={{ width: "auto" }}>
          <thead>
            <tr>
              <th style={{ border: 0, backgroundColor: "#fff" }}></th>
              <th>SKUs</th>
              <th>Preço de venda</th>
              <th>Promoção</th>
              <th>Data de criação</th>
            </tr>
          </thead>
          <tbody>
            {anuncios?.map((a) => (
              <tr key={a._id}>
                <img
                  width={50}
                  height={50}
                  src={a.imgFrente_anuncio}
                  style={{ borderRadius: "10px" }}
                ></img>
                <td>{a.SKUs_anuncio}</td>
                <td>{a.preco_venda}</td>
                <td>{a.promocao_anuncio}</td>
                <td>{dataBr(a.createdAt)}</td>
                <td className="tdEspecial">
                  <NavLink
                    to={`/auth-login/auth-gerente/editaranuncio/${a._id}`}
                  >
                    <RiFileEditLine size="25px" />
                  </NavLink>
                </td>
                <td
                  onClick={() => handleAtivacao(a._id, a.ativo_anuncio)}
                  style={{ borderColor: "#fff", padding: "0" }}
                >
                  {a.ativo_anuncio ? (
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

export default AnunciosPage;
