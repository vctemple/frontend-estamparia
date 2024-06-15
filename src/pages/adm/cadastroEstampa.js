import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";


const CadastroEstampa = () => {
  const [nome_estampa, setNome] = useState("");
  const [dimensao, setDimensao] = useState("");
  const [dimensoes, setDimensoes] = useState([]);
  const [imgEstampa, setImgEstampa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [flag, setFlag] = useState(false);

  const Navigate = useNavigate();

  const addDimensoes = (e) => {
    let newArr = dimensoes;
    newArr.push(e);
    setDimensoes(newArr);
    setDimensao("");
    setFlag(true);
  };

  const limpaDimensoes = () => {
    setDimensoes([]);
    setDimensao("");
    setFlag(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/api/v1/produtos/cadastroEstampa`, {
        nome_estampa,
        dimensoes,
        imgEstampa,
        descricao,
      });

      if (res && res.data.success) {
        toast.success(res.data.message, {
            className: "toast-message",
            position: "top-center",
                        autoClose: 1500,
                        theme: "dark"
          });
        setTimeout(() => {
          Navigate("/auth-login/auth-gerente/produtos");
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

  function imgToBase64(img) {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      setImgEstampa(reader.result);
    };
  }

  
  useEffect(() => {
    setFlag(false);
    //eslint-disable-next-line
  }, [flag]);

  return (
    <Layout>
      <h1 className="cad">Cadastro de Estampa</h1>

      <div className="forms">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-group" style={{justifyContent: "flex-end"}}>
            <div style={{display: "flex", alignContent: "flex-end", flexDirection: "column" }}>
                <h3>Dimensões</h3>
                <div>{dimensoes.map((d) => (
                    <h4>{d}</h4>
                ))}</div>
              </div>
              <div style={{display: "flex", justifyContent: "flex-end", flexFlow: "column" }}>
                <img
                  width={200}
                  height={200}
                  src={imgEstampa}
                  style={{ marginLeft: "2rem" }}
                />
                <input
                  className="image"
                  accept="image/*"
                  type="file"
                  onChange={(e) => imgToBase64(e.target.files[0])}
                />
              </div>
              
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Nome" style={{minWidth: "14rem"}}>Nome da estampa</label>
            <input
              type="text"
              name="Nome"
              id="Nome"
              value={nome_estampa}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao" style={{minWidth: "14rem"}}>Descrição</label>
            <input
              type="text"
              name="descricao"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tecido" style={{minWidth: "14rem"}}>Dimenções</label>
            <input
              type="text"
              name="dimencoes"
              id="dimencoes"
              placeholder="comp X alt cm"
              value={dimensao}
              onChange={(e) => setDimensao(e.target.value)}
            />
            
          </div>

          <div className="form-group" style={{justifyContent: "flex-end"}}>
          <button type="button" onClick={() => addDimensoes(dimensao)} style={{maxWidth: "12rem"}}>Adicionar</button>
            <button type="button" onClick={() => limpaDimensoes()} style={{maxWidth: "12rem"}}>Limpar</button>
          </div>

          <div className="form-group" style={{justifyContent: "flex-end"}}>
            <label></label>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CadastroEstampa;
