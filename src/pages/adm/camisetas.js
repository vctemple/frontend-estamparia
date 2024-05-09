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

const Camisetas = () => {
  const [camisetas, setCamisetas] = useState([]);

  const listarCamisetas = async () => {
    try {
      const {data} = await axios.get("http://localhost:3001/api/v1/camisetas/listaCamisetas");
      setCamisetas(data.camisetas)
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
    listarCamisetas();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1>Lista de Camisetas Lisas</h1>
      <div className="table">
        <table style={{ width: "20rem" }}>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {camisetas?.map((p) => (
              <tr key={p._id} style={{display: "flex", justifyContent: "space-evenly"}}>
                <img
                  width={50}
                  height={50}
                  src={p.img_frente}
                  style={{ borderRadius: "10px", marginLeft: 0, marginRight: 0 }}
                ></img>

                <td>{p.cor_tecido}</td>
                <td style={{minWidth: "12rem"}}>{p.descricao}</td>
                <td className="tdEspecial">
                  <NavLink to={`/auth-login/auth-gerente/auth-adm/editarCamiseta/${p.cor_tecido}`}>
                    <RiFileEditLine size="25px" />
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Camisetas;
