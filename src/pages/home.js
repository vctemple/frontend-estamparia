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
              <label class="checkContainer">Baby Look
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkContainer">Pequeno
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkContainer">Médio
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkContainer">Grande
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkContainer">Extra Grande
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
            </div>
            <div>
              <h4>Cor</h4>
              <label class="checkContainer">Branco
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkContainer">Preto
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkContainer">Cinza
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkContainer">Azul
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkContainer">Rosa
                <input type="checkbox" />
                <span class="checkmark"></span>
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