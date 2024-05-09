import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";

const EditarCamiseta = () => {
  const Navigate = useNavigate();
  const [cor_tecido, setCor_tecido] = useState("");
  const [descricao, setDescricao] = useState("");
  const [img_frente, setImg_frente] = useState("");
  const [img_tras, setImg_tras] = useState("");
  const params = useParams();

  const getCamiseta = async () => {
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/camisetas/getCamiseta/${params.pid}`
      );
      console.log(data);
      setCor_tecido(data.camiseta.cor_tecido);
      setDescricao(data.camiseta.descricao);
      setImg_frente(data.camiseta.img_frente);
      setImg_tras(data.camiseta.img_tras);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/api/v1/camisetas/editarCamiseta/${cor_tecido}`, {
        descricao,
        img_frente,
        img_tras,
      });

      if (res && res.data.success) {
        toast.success(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
        setTimeout(() => {
          Navigate("/auth-login/auth-gerente/auth-adm/camisetas_lisas");
        }, 2000);
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

  useEffect(() => {
    getCamiseta();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="cad">Editar camiseta lisa</h1>
      <div className="forms">
        <form onSubmit={handleUpdate}>
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
            <button type="submit">Editar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditarCamiseta;
