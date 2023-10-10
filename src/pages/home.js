import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout.js";
import { UseAuth } from "../context/auth.js";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "../styles/grid.css";
import "../styles/card.css";

const Home = () => {
  const [auth, setAuth] = UseAuth();
  const [produtos, setProdutos] = useState([]);
  const [tam, setTam] = useState([]);
  const [cor, setCor] = useState([]);

  const listarProdutos = async () => {
    try {
      const dados = await axios.get("http://localhost:3001/api/v1/produtos/");
      setProdutos(dados.data.produtos);
    } catch (e) {
      console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message",
      });
    }
  };

  function removeDaLista (arr, e){
    let newArr = [];
    for(let i=0; i<=arr.length; i++){
      if(arr[i]!==e && arr[i] != undefined){
        newArr.push(arr[i]);
      }
    }
    console.log(newArr)
    return newArr;
  }
  
  const handleTamanhos = (t) => {
    const resultado = tam.includes(t);
    if (resultado){
      let arrNovo = removeDaLista(tam, t);
      setTam(arrNovo);
    } else {
      let novoArr = tam;
      novoArr.push(t);
      setTam(novoArr);
    }
  }

  const handleCores = (c) => {
    const resultado = cor.includes(c);
    if (resultado){
      let arrNovo = removeDaLista(cor, c);
      setCor(arrNovo);
    } else {
      let novoArr = cor;
      novoArr.push(c);
      setCor(novoArr);
    }
  }

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <Layout>
      <div>Banner</div>
      <div className="grid">
        <div className="filter">
          <div className="card2">
            <h3 style={{marginBottom: "2rem"}}>Filtro de produtos</h3>
            <div style={{marginBottom: "2rem"}}>
              <h4>Tamanho</h4>
              <label className="checkContainer">Baby Look
                <input type="checkbox" onChange={() => handleTamanhos("BL")}/>
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">Pequeno
                <input type="checkbox" onChange={() => handleTamanhos("P")}/>
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">Médio
                <input type="checkbox" onChange={() => handleTamanhos("M")}/>
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">Grande
                <input type="checkbox" onChange={() => handleTamanhos("G")}/>
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">Extra Grande
                <input type="checkbox" onChange={() => handleTamanhos("XL")}/>
                <span className="checkmark"></span>
              </label>
            </div>
            <div>
              <h4>Cor</h4>
              <label className="checkContainer">Branco
                <input type="checkbox" onChange={() => handleCores("Branco")}/>
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">Preto
                <input type="checkbox" onChange={() => handleCores("Preto")}/>
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">Cinza
                <input type="checkbox" onChange={() => handleCores("Cinza")}/>
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">Azul
                <input type="checkbox" onChange={() => handleCores("Azul")}/>
                <span className="checkmark"></span>
              </label>
              <label className="checkContainer">Rosa
                <input type="checkbox" onChange={() => handleCores("Rosa")}/>
                <span className="checkmark"></span>
              </label>
            </div>
            

          </div>
        </div>
        <div className="grid2">
          {produtos?.map((p) => (
            <div className="card">
              <div key={p._id} className="container">
                <NavLink>
                  <img src={p.imgFrente} width={250} height={250}/>
                </NavLink>
                <div style={{minWidth: "90%"}}>
                  <h3>{p.nome}</h3>
                  <h3>R${p.preco}</h3>
                  <h4>Tamanho: {p.tamanho}</h4>
                </div>
                <button className="button1">Adicionar ao carrinho</button>
                <button className="button2">Comprar</button>
              </div>
          </div>
          ))}
        
          
        </div>

      </div>
    </Layout>
  );
};

export default Home