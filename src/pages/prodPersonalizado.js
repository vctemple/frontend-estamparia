import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Layout from "../components/layout/layout.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/detalheItens.css";
import { RiCheckboxCircleFill, RiCloseCircleFill} from "react-icons/ri";
import { set } from "date-fns";

const ProdPersonalizado = () => {
  const Navigate = useNavigate();
  const params = useParams();
  const [produto, setProduto] = useState({});
  const [quantidade, setQuantidade] = useState("1");
  const [carrinho, setCarrinho] = useState([]);
  const [estampaPersnFrente, setEstampaPersnFrente] = useState("");
  const [estampaPersnTras, setEstampaPersnTras] = useState("");
  const [change, setChange] = useState(false);
  const [camisetaLisa, setCamisetaLisa] = useState({});
  const [posicaoEstampaTras, setPosicaoEstampaTras] = useState("0");

  const navegarCart = () => {
    Navigate("/carrinho");
  };

  const getProduto = async () => {
    const prod = JSON.parse(sessionStorage.getItem("prod"));
    setProduto(prod);
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/camisetas/getCamiseta/${prod.cor}`
      );
      setCamisetaLisa(data.camiseta);
      console.log(data.camiseta);
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

  function posicao (){
    switch (posicaoEstampaTras){
      case "0":
        return "30px";
      case "1":
        return "120px";
      case "2":
        return "250px";
    }
  }
  
  function imgToBase64(img, text) {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      if (text === "frente") setEstampaPersnFrente(reader.result);
      if (text === "tras") setEstampaPersnTras(reader.result);
    };
  }

  const handleCarrinho = (p) => {
    let newArr = JSON.parse(sessionStorage.getItem("carrinho"));
    if (!newArr) newArr = carrinho;
    newArr.push({
      ...p,
      qtd: quantidade,
      estampaPersnFrente,
      estampaPersnTras,
      posicaoEstampaTras,
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

  useEffect(() => {
    getProduto();
    setChange(false);
    // eslint-disable-next-line
  }, [change]);

  return (
    <Layout>
      <div>
        <div className="form-group">
          <div style={{ marginLeft: "5rem", display: "flex", flexDirection: "column" }}>
          <h3 style={{marginLeft: "4rem"}}>Estampa frente</h3>
            <img
              width={200}
              height={200}
              src={estampaPersnFrente}
              style={{ marginLeft: "2rem" }}
            />
            <input
              className="image"
              accept="image/*"
              type="file"
              onChange={(e) => imgToBase64(e.target.files[0], "frente")}
            />
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
          <h3 style={{marginLeft: "4rem"}}>Estampa costas</h3>
            <img
              width={200}
              height={200}
              src={estampaPersnTras}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            maxWidth: "90vw",
            margin: "0 auto",
          }}
        >
          <div style={{ maxWidth: "500px", margin: "3rem 6rem 0 0", border: "1px solid #302c2c", borderRadius: "1rem" }}>
            <Carousel
              showArrows={false}
              emulateTouch
              showStatus={false}
              centerMode
              showThumbs={false}
            >
              <div className="container">
                <figure className="sobreposicao">
                  <img
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    src={camisetaLisa.img_frente}
                  />
                  <img
                    className="estampa"
                    style={{ maxWidth: "140px", maxHeight: "140px" }}
                    src={estampaPersnFrente}
                  />
                </figure>
              </div>
              <div className="container">
                <figure className="sobreposicao">
                  <img
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    src={camisetaLisa.img_tras}
                  />
                  <img
                    className="estampa"
                    style={{ maxWidth: "140px", maxHeight: "140px", top: posicao() }}
                    src={estampaPersnTras}
                  />
                </figure>
              </div>
            </Carousel>
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div
              style={{
                backgroundColor: "#ddd",
                borderRadius: "2rem",
                padding: "1rem 2rem 1rem",
                marginTop: "3.5rem",
              }}
            >
              <h4>Tamanho: {produto.tamanho}</h4>
              <h4>Tecido: {produto.tecido}</h4>
              <h4>Cor do tecido: {produto.cor}</h4>
              <h4>Tipo de estampa: {produto.tipoEstampa}</h4>
              <h4 style={{display: "flex", alignItems: "center"}}>Estampa na frente &nbsp;{estampaPersnFrente ? (
                <RiCheckboxCircleFill size="20px"/>
              ) : (<RiCloseCircleFill size="20px"/>)}</h4>
                
              <h4 style={{display: "flex", alignItems: "center"}}>Estampa nas costas &nbsp;{estampaPersnTras ? (
                <RiCheckboxCircleFill size="20px"/>
              ) : (<RiCloseCircleFill size="20px"/>)}</h4>
              {estampaPersnTras ? (<div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="posicao" style={{ fontSize: "1.5rem" }}>
                  <b>Posição da estampa nas costas</b>
                </label>
                <select
              name="posicao"
              id="posicao"
              value={posicaoEstampaTras}
              onChange={(e) => setPosicaoEstampaTras(e.target.value)}
              style={{width: "auto", margin: "0 1rem", padding: 0}}
            >
              <option value="0">Alto</option>
              <option value="1">Centro</option>
              <option value="2">Baixo</option>
            </select>
              </div>) : (<></>)}
            </div>

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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProdPersonalizado;
