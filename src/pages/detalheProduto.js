import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Layout from "../components/layout/layout.js";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const DetalheProduto = () => {
  const Navigate = useNavigate();
  const params = useParams();
  const [produto, setProduto] = useState({});
  const [qtd, setQtd] = useState("1");

  const getProduto = async () => {
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/produtos/dados/${params.pid}`
      );
      setProduto(data.produto);
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
    getProduto();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "90vw",
          margin: "0 auto",
        }}
      >
        <div style={{ maxWidth: "500px", margin: "3rem 6rem 0 0" }}>
          <Carousel
            autoPlay
            showArrows={false}
            emulateTouch
            infiniteLoop
            interval="5000"
          >
            <img
              style={{ maxWidth: "400px", maxHeight: "400px" }}
              src={produto.imgFrente}
            />
            <img
              style={{ maxWidth: "400px", maxHeight: "400px" }}
              src={produto.imgTras}
            />
            <img
              style={{ maxWidth: "400px", maxHeight: "400px" }}
              src={produto.imgCorpo}
            />
          </Carousel>
        </div>
        <div>
          <div
            style={{
              backgroundColor: "#ddd",
              borderRadius: "2rem",
              padding: "1rem 2rem 1rem",
              marginTop: "3.5rem",
            }}
          >
            <h3 style={{ textTransform: "uppercase", marginBottom: "3rem" }}>
              {produto.nome}
            </h3>
            <h4>{produto.marca}</h4>
            <h4>Tamanho: {produto.tamanho}</h4>
            <h4>Cor do tecido: {produto.cor}</h4>
            <h4>Tipo de estampa: {produto.estampa}</h4>
            <h3>R${produto.preco}</h3>
          </div>
          <div style={{maxWidth: "26rem", flexDirection: "column", alignContent: "space-around", flexWrap: "wrap"}}>
          <div style={{padding: "2rem", display:"flex", justifyContent: "space-between", alignItems: "center"}}>
            <label htmlFor="numero" style={{fontSize:"2rem"}}>Quantidade</label>
            <input
              type="number"
              name="numero"
              id="nummero"
              value={qtd}
              onChange={(e) => setQtd(e.target.value)}
              required
              style={{maxWidth:"5rem", minHeight:"3rem", marginLeft:"3rem", fontSize:"2rem"}}
            />
          </div>
            <button style={{margin: "1rem 0"}} >
              Adicionar ao carrinho
            </button>
            <button style={{ margin: "1rem 0"}}>Comprar</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetalheProduto;
