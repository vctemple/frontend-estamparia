import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/grid.css";
import "../styles/card.css";
import banner from "../imgs/banner teste.jpg"

const Home = () => {
  const [carrinho, setCarrinho] = useState([])
  const [produtos, setProdutos] = useState([]);
  const [tam, setTam] = useState([]);
  const [cor, setCor] = useState([]);
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [change, setChange] = useState(false);
  const Navigate = useNavigate();

  const listarProdutos = async () => {
    try {
      const dados = await axios.get("http://localhost:3001/api/v1/produtos/ativo");
      setProdutos(dados.data.produtos);
    } catch (e) {
      console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message",
      });
    }
  };

  const navegarCart = () => {
    Navigate("/carrinho");
  }

  const filtrarProdutos = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/produtos/filtro",
        { tam, cor, precoMin, precoMax }
      );
      setProdutos(data?.produtos);
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

  function removeDaLista(arr, e) {
    let newArr = [];
    for (let i = 0; i <= arr.length; i++) {
      if (arr[i] !== e && arr[i] !== undefined) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
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
    setChange(true)
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
    setChange(true)
  };

  const handleCarrinho = (p) => {
    let newArr = JSON.parse(sessionStorage.getItem("carrinho"));
    if (!newArr) newArr = carrinho
    newArr.push({
      ...p,
      qtd: 1
    });
    setCarrinho(newArr);
    sessionStorage.setItem("carrinho", JSON.stringify(newArr));
    setChange(true)
  }

  useEffect(() => {
    if (tam.length || cor.length || precoMin || precoMax) filtrarProdutos();
    setChange(false)
  }, [change, tam, cor, precoMin, precoMax]);

  useEffect(() => {
    if (!tam.length && !cor.length && !precoMin && !precoMax) listarProdutos();
    setChange(false)
  }, [change, tam.length, cor.length, precoMin, precoMax]);

  return (
    <Layout>
      <div style={{display: "flex", justifyContent: "center"}}><img className="imagem" src={banner}></img></div>
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
        <div className="grid2">
          {produtos?.map((p) => (
            <div className="card">
              <div key={p._id} className="container">
                <NavLink to={`/produto/${p._id}`}>
                  <img src={p.imgFrente} width={250} height={250} />
                </NavLink>
                <div style={{ minWidth: "90%" }}>
                  <h3>{p.nome}</h3>
                  <h3>R${p.preco}</h3>
                  <h4>Tamanho: {p.tamanho}</h4>
                </div>
                <button
                  className="button1"
                  onClick={() => {
                    handleCarrinho(p);
                    toast.success("Item adicionado ao carrinho", {
                      className: "toast-message",
                      position: "top-center",
                      autoClose: 1500,
                      theme: "dark"
                    });
                    }}
                >
                  Adicionar ao carrinho
                </button>
                <button className="button2" onClick={() => {
                    handleCarrinho(p);
                    navegarCart();
                    }}>Comprar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
