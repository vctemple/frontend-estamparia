import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Layout from "../components/layout/layout.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/detalheItens.css";
import { set } from "date-fns";

const DetalheProduto = () => {
  const Navigate = useNavigate();
  const params = useParams();
  const [produto, setProduto] = useState();
  const [quantidade, setQuantidade] = useState("1");
  const [carrinho, setCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [tam, setTam] = useState([]);
  const [cor, setCor] = useState([]);
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [change, setChange] = useState(false);
  const [passou, setPassou] = useState(true);
  const [brancoFiltro, setBrancoFiltro] = useState();
  const [pretoFiltro, setPretoFiltro] = useState();
  const [cinzaFiltro, setCinzaFiltro] = useState();
  const [azulFiltro, setAzulFiltro] = useState();
  const [rosaFiltro, setRosaFiltro] = useState();
  const [blFiltro, setBlFiltro] = useState();
  const [pFiltro, setPFiltro] = useState();
  const [mFiltro, setMFiltro] = useState();
  const [gFiltro, setGFiltro] = useState();
  const [xgFiltro, setXgFiltro] = useState();

  const inicioFiltro = () => {
    if (passou) {
      const inicioTam = params.tam;
      const inicioCor = params.cor;
      const inicioPMin = params.pMin;
      const inicioPMax = params.pMax;

      if (inicioCor !== "0") {
        let newArr = [];
        if (inicioCor.search("Branco") !== -1) {
          setBrancoFiltro(true);
          newArr.push("Branco");
        }
        if (inicioCor.search("Preto") !== -1) {
          setPretoFiltro(true);
          newArr.push("Preto");
        }
        if (inicioCor.search("Cinza") !== -1) {
          setCinzaFiltro(true);
          newArr.push("Cinza");
        }
        if (inicioCor.search("Azul") !== -1) {
          setAzulFiltro(true);
          newArr.push("Azul");
        }
        if (inicioCor.search("Rosa") !== -1) {
          setRosaFiltro(true);
          newArr.push("Rosa");
        }
        setCor(newArr);
      }
      if (inicioTam !== "0") {
        let newArr = [];
        if (inicioTam.search("BL") !== -1) {
          setBlFiltro(true);
          newArr.push("BL");
        }
        if (inicioTam.search("P") !== -1) {
          setPFiltro(true);
          newArr.push("P");
        }
        if (inicioTam.search("M") !== -1) {
          setMFiltro(true);
          newArr.push("M");
        }
        if (inicioTam.search("G") !== -1) {
          setGFiltro(true);
          newArr.push("G");
        }
        if (inicioTam.search("XG") !== -1) {
          setXgFiltro(true);
          newArr.push("XG");
        }
        setTam(newArr);
      }
      if (inicioPMin !== "0") setPrecoMin(inicioPMin);
      if (inicioPMax !== "0") setPrecoMax(inicioPMax);
    }
    setPassou(false);
  };

  const getProdutos = async () => {
    console.log(passou);
    try {
      if (passou) {
        const inicioTam = params.tam;
        const inicioCor = params.cor;
        const inicioPMin = params.pMin;
        const inicioPMax = params.pMax;
        let corArr = [];
        let tamArr = [];
        if (inicioCor !== "0") {
          if (inicioCor.search("Branco") !== -1) {
            corArr.push("Branco");
          }
          if (inicioCor.search("Preto") !== -1) {
            corArr.push("Preto");
          }
          if (inicioCor.search("Cinza") !== -1) {
            corArr.push("Cinza");
          }
          if (inicioCor.search("Azul") !== -1) {
            corArr.push("Azul");
          }
          if (inicioCor.search("Rosa") !== -1) {
            corArr.push("Rosa");
          }
        }
        if (inicioTam !== "0") {
          if (inicioTam.search("BL") !== -1) {
            setBlFiltro(true);
            tamArr.push("BL");
          }
          if (inicioTam.search("P") !== -1) {
            setPFiltro(true);
            tamArr.push("P");
          }
          if (inicioTam.search("M") !== -1) {
            setMFiltro(true);
            tamArr.push("M");
          }
          if (inicioTam.search("G") !== -1) {
            setGFiltro(true);
            tamArr.push("G");
          }
          if (inicioTam.search("XG") !== -1) {
            setXgFiltro(true);
            tamArr.push("XG");
          }
        }
        if (inicioPMin !== "0") setPrecoMin(inicioPMin);
        if (inicioPMax !== "0") setPrecoMax(inicioPMax);

        const { data } = await axios.post(
          //A variável tem que se chamar necessariamente data aqui
          `http://localhost:3001/api/v1/anuncios/estampa/${params.pid}`,
          {
            tam: tamArr,
            cor: corArr,
            precoMin: params.pMin,
            precoMax: params.pMax,
          }
        );
        setProdutos(data.produtos);
      } else {
        const { data } = await axios.post(
          //A variável tem que se chamar necessariamente data aqui
          `http://localhost:3001/api/v1/anuncios/estampa/${params.pid}`,
          { tam, cor, precoMin, precoMax }
        );
        setProdutos(data.produtos);
      }
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

  const navegarCart = () => {
    Navigate("/carrinho");
  };

  const handleCarrinho = (p) => {
    let newArr = JSON.parse(sessionStorage.getItem("carrinho"));
    if (!newArr) newArr = carrinho;
    newArr.push({
      ...p,
      qtd: quantidade,
    });
    setCarrinho(newArr);
    sessionStorage.setItem("carrinho", JSON.stringify(newArr));
    setChange(true);
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

  useEffect(() => {
    inicioFiltro();
    getProdutos();
    setChange(false);
    // eslint-disable-next-line
  }, [change, precoMin, precoMax, passou, tam, cor, produto]);

  return (
    <Layout>
      <div>
        <div className="filtro">
          <h3
            style={{
              marginBottom: "0.8rem",
              marginTop: "0.8rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Filtro de produtos
          </h3>
          <div className="contentFiltro">
            <div>
              <h4>Tamanho</h4>
              <div className="gridOp">
                <label className="checkContainer">
                  Baby Look
                  <input
                    type="checkbox"
                    onChange={() => handleTamanhos("BL")}
                    defaultChecked={blFiltro}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkContainer">
                  Pequeno
                  <input
                    type="checkbox"
                    onClick={() => handleTamanhos("P")}
                    defaultChecked={pFiltro}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkContainer">
                  Médio
                  <input
                    type="checkbox"
                    onClick={() => handleTamanhos("M")}
                    defaultChecked={mFiltro}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkContainer">
                  Grande
                  <input
                    type="checkbox"
                    onClick={() => handleTamanhos("G")}
                    defaultChecked={gFiltro}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkContainer">
                  Extra Grande
                  <input
                    type="checkbox"
                    onClick={() => handleTamanhos("XG")}
                    defaultChecked={xgFiltro}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div>
              <h4>Cor</h4>
              <div className="gridOp">
                <label className="checkContainer">
                  Branco
                  <input
                    type="checkbox"
                    onClick={() => handleCores("Branco")}
                    defaultChecked={brancoFiltro}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkContainer">
                  Preto
                  <input
                    type="checkbox"
                    onClick={() => handleCores("Preto")}
                    defaultChecked={pretoFiltro}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkContainer">
                  Cinza
                  <input
                    type="checkbox"
                    onClick={() => handleCores("Cinza")}
                    defaultChecked={cinzaFiltro}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkContainer">
                  Azul
                  <input
                    type="checkbox"
                    onClick={() => handleCores("Azul")}
                    defaultChecked={azulFiltro}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkContainer">
                  Rosa
                  <input
                    type="checkbox"
                    onClick={() => handleCores("Rosa")}
                    defaultChecked={rosaFiltro}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
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
      </div>
      <div style={{ maxWidth: "80vw", margin: "1rem auto" }}>
        <Carousel
          className="carrossel"
          centerSlidePercentage={30}
          showThumbs={true}
          showStatus={false}
          centerMode
          showArrows={true}
        >
          {produtos.map((a) => (
            <div className="card">
              <div key={a.anuncioId} className="container">
                <img
                  src={a.imagemCorpo}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                ></img>
                {a.promocao ? (
                  <div style={{ display: "flex" }}>
                    <h3
                      style={{ color: "red", textDecoration: "line-through" }}
                    >
                      R${a.precoVenda}
                    </h3>
                    <h3 style={{ margin: "2rem 1rem 1rem 1rem" }}>-</h3>
                    <h3 style={{ color: "green" }}>
                      R${a.precoVenda - a.promocao}
                    </h3>
                  </div>
                ) : (
                  <h3>R${a.precoVenda}</h3>
                )}
                <div style={{ minWidth: "90%" }}>
                  <h4>Tamanho: {a.tamanho}</h4>
                  <h4>{a.marcaCamiseta}</h4>
                  <button
                    className="button1"
                    onClick={() => {
                      setProduto(a);
                    }}
                  >
                    Escolher Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {produto ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            maxWidth: "90vw",
            margin: "0 auto",
          }}
        >
          <div style={{ maxWidth: "500px", margin: "3rem 6rem 0 0" }}>
            <Carousel showArrows={false} emulateTouch showStatus={false}>
              <img
                style={{ maxWidth: "400px", maxHeight: "400px" }}
                src={produto.imagemFrente}
              />
              <img
                style={{ maxWidth: "400px", maxHeight: "400px" }}
                src={produto.imagemTras}
              />
              <img
                style={{ maxWidth: "400px", maxHeight: "400px" }}
                src={produto.imagemCorpo}
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
              <h4>{produto.marcaCamiseta}</h4>
              <h4>Tamanho: {produto.tamanho}</h4>
              <h4>Tecido: {produto.tecido}</h4>
              <h4>Cor do tecido: {produto.cor}</h4>
              <h4>Tipo de estampa: {produto.tipoEstampa}</h4>
              <h4>Dimensão da estampa: {produto.dimensao_estampa}</h4>
              {produto.promocao ? (
                <h2 style={{ color: "green" }}>
                  R${produto.precoVenda - produto.promocao}
                </h2>
              ) : (
                <h2>R${produto.precoVenda}</h2>
              )}
            </div>
            {produto.nomeEstampa === "Estampa Personalizada" ? (
              <div
              style={{
                maxWidth: "26rem",
                flexDirection: "column",
                alignContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              <button
                  style={{ margin: "4rem 2rem" }}
                  onClick={() => {
                    sessionStorage.setItem("prod", JSON.stringify(produto));
                    Navigate(`/prodPersonalizado`)
                  }}
                >
                  Adicionar estampa
                </button>
            </div>
            ) : (
              <div
                style={{
                  maxWidth: "26rem",
                  flexDirection: "column",
                  alignContent: "space-around",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    padding: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label htmlFor="numero" style={{ fontSize: "2rem" }}>
                    Quantidade
                  </label>
                  <input
                    type="number"
                    name="numero"
                    id="nummero"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                    style={{
                      maxWidth: "5rem",
                      minHeight: "3rem",
                      marginLeft: "3rem",
                      fontSize: "2rem",
                    }}
                  />
                </div>
                <button
                  style={{ margin: "1rem 0" }}
                  onClick={() => {
                    handleCarrinho(produto);
                    toast.success("Item adicionado ao carrinho", {
                      className: "toast-message",
                      position: "top-center",
                      autoClose: 1500,
                      theme: "dark",
                    });
                  }}
                >
                  Adicionar ao carrinho
                </button>
                <button
                  style={{ margin: "1rem 0" }}
                  onClick={() => {
                    handleCarrinho(produto);
                    navegarCart();
                  }}
                >
                  Comprar
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <h2>Escolha uma opção</h2>
        </div>
      )}
    </Layout>
  );
};

export default DetalheProduto;
