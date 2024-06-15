import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/grid.css";
import "../styles/card.css";
import "../styles/homeItens.css";
import banner from "../imgs/banner teste.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [tam, setTam] = useState([]);
  const [cor, setCor] = useState([]);
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [change, setChange] = useState(false);
  const [img_banner, setImg_banner] = useState("");
  const Navigate = useNavigate();

  const listarProdutos = async () => {
    try {
      const dados = await axios.post(
        "http://localhost:3001/api/v1/anuncios/home", { tam, cor, precoMin, precoMax }
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

  const getBanner = async () => {
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/banner/getBanner/663516d49906828873d816dd`
      );
      console.log(data);
      setImg_banner(data.banner.img_banner)
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

  function removeDaLista(arr, e) {
    let newArr = [];
    for (let i = 0; i <= arr.length; i++) {
      if (arr[i] !== e && arr[i] !== undefined) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }

  const handleRangePreco = (precos) => {
    if (precos[0] === precos[1]) return `R$${precos[0]}`;
    else return `De R$${precos[0]} até R$${precos[1]}`
  }
  
  const handleTamanhos = (t) => {
    const resultado = tam.includes(t);
    if (resultado) {
      let arrNovo = removeDaLista(tam, t);
      setTam(arrNovo);
    } else {
      let novoArr = tam;
      novoArr.push(t);
      setTam(novoArr);
    }
    setChange(true);
  };

  const handleCores = (c) => {
    const resultado = cor.includes(c);
    if (resultado) {
      let arrNovo = removeDaLista(cor, c);
      setCor(arrNovo);
    } else {
      let novoArr = cor;
      novoArr.push(c);
      setCor(novoArr);
    }
    setChange(true);
  };

  const trocaCasoNull = (valor) => {
    if(!valor || valor.length === 0) return "0";
    else return valor;
  }
  
    useEffect(() => {
    listarProdutos();
    getBanner();
    setChange(false);
  }, [change, precoMax, precoMin]);

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img className="imagem" src={img_banner}></img>
      </div>
      <div className="grid">
        <div className="filter">
          <div className="card2">
            <h3 style={{ marginBottom: "2rem" }}>Filtro de produtos</h3>
            <div style={{ marginBottom: "2rem" }}>
              <h4>Tamanho</h4>
              <label className="checkContainer">
                Baby Look
                <input type="checkbox" onChange={() => handleTamanhos("BL")} />
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">
                Pequeno
                <input type="checkbox" onChange={() => handleTamanhos("P")} />
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">
                Médio
                <input type="checkbox" onChange={() => handleTamanhos("M")} />
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">
                Grande
                <input type="checkbox" onChange={() => handleTamanhos("G")} />
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">
                Extra Grande
                <input type="checkbox" onChange={() => handleTamanhos("XG")} />
                <span className="checkmark"></span>
              </label>
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <h4>Cor</h4>
              <label className="checkContainer">
                Branco
                <input type="checkbox" onChange={() => handleCores("Branco")} />
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">
                Preto
                <input type="checkbox" onChange={() => handleCores("Preto")} />
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">
                Cinza
                <input type="checkbox" onChange={() => handleCores("Cinza")} />
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">
                Azul
                <input type="checkbox" onChange={() => handleCores("Azul")} />
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">
                Rosa
                <input type="checkbox" onChange={() => handleCores("Rosa")} />
                <span className="checkmark"></span>
              </label>
            </div>
            <div>
              <h4>Preço</h4>
              <div style={{ marginBottom: "1rem", display: "flex" }}>
                <label
                  style={{
                    fontSize: "1.5rem",
                    minWidth: "7rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  Mínimo
                </label>
                <input
                  style={{ maxWidth: "7rem", minHeight: "2.5rem" }}
                  type="number"
                  value={precoMin}
                  onChange={(e) => setPrecoMin(e.target.value)}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label
                  style={{
                    fontSize: "1.5rem",
                    minWidth: "7rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  Máximo
                </label>
                <input
                  style={{ maxWidth: "7rem", minHeight: "2.5rem" }}
                  type="number"
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid2" style={{display: "flex", flexWrap: "wrap"}}>
          {produtos?.map((p) => (
            <div className="card" style={{maxWidth: "35rem"}}>
              <div key={p._id} className="container">
                <div style={{ maxWidth: "500px", padding: "1rem" }}>
                  <Carousel className="home" showArrows={false} infiniteLoop emulateTouch showStatus={false}>
                    {p.imagens?.map((i) => (
                      <img
                        style={{ maxWidth: "250px", maxHeight: "250px" }}
                        src={i}
                      />
                    ))}
                  </Carousel>
                </div>

                <div style={{ minWidth: "90%", display: "flex", alignItems: "center", flexDirection: "column"}}>
                  <h3 style={{margin: "0.5rem"}}>{p.nome}</h3>
                  <h3 style={{margin: "0.5rem"}}>{handleRangePreco(p.rangePrecos)}</h3>
                  <h4 style={{margin: "0.5rem"}}>{p.descricao}</h4>
                </div>
                <button
                  className="button1"
                  onClick={() => {
                    Navigate(`/produto/${p._id}/${trocaCasoNull(tam)}/${trocaCasoNull(cor)}/${trocaCasoNull(precoMin)}/${trocaCasoNull(precoMax)}`)
                  }}
                >
                  Escolher estampa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
