import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";
import { UseAuth } from "../../context/auth.js";
import { RiCheckboxCircleFill } from "react-icons/ri";


const CadastroCamiseta = () => {
  const [cor_tecido, setCor_tecido] = useState("");
  const [descricao, setDescricao] = useState("");
  const [img_frente, setImg_frente] = useState("");
  const [img_tras, setImg_tras] = useState("");
  const [flag, setFlag] = useState(false);
  const [auth] = UseAuth();
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/camisetas/cadastrarCamiseta`,
        {
            cor_tecido,
            descricao,
            usuario: auth.usuario._id,
            img_frente,
            img_tras,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
        setTimeout(() => {
          Navigate("/auth-login/auth-gerente/anuncios/");
        }, 2000);
      } else {
        toast.error(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error("Algo deu errado", {
        className: "toast-message",
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  function imgToBase64(img, text) {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      if (text === "frente") setImg_frente(reader.result);
      if (text === "tras") setImg_tras(reader.result);
    };
  }

//   useEffect(() => {
//     setFlag(false);
//     //eslint-disable-next-line
//   }, [flag]);

  return (
    <Layout>
      <h1 className="cad">Cadastro de camiseta lisa</h1>
      <div className="forms">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div style={{ marginLeft: "5rem" }}>
              <img
                width={200}
                height={200}
                src={img_frente}
                style={{ marginLeft: "2rem" }}
              />
              <input
                className="image"
                accept="image/*"
                type="file"
                onChange={(e) => imgToBase64(e.target.files[0], "frente")}
              />
            </div>
            <div>
              <img
                width={200}
                height={200}
                src={img_tras}
                style={{ marginLeft: "2rem" }}
              />
              <input
                className="image"
                accept="image/*"
                type="file"
                onChange={(e) => imgToBase64(e.target.files[0], "tras")}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cor_camiseta">Cor da camiseta</label>
            <select
              name="cor_camiseta"
              id="cor_camiseta"
              value={cor_tecido}
              onChange={(e) => setCor_tecido(e.target.value)}
              required
            >
              <option value="">-- Selecionar --</option>
              <option value="Branco">Branco</option>
              <option value="Preto">Preto</option>
              <option value="Cinza">Cinza</option>
              <option value="Azul">Azul</option>
              <option value="Rosa">Rosa</option>
            </select>
          </div>
          <div className="form-group">
                <label
                  htmlFor="descricao"
                  style={{
                    minWidth: "6rem",
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                >
                  Descrição{" "}
                </label>
                <input
                  type="text"
                  name="descricao"
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>

          <div className="form-group">
            <label></label>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CadastroCamiseta;
