import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout.js";
import "../styles/carrinho.css";
import "../styles/card.css";
import { toast } from "react-toastify";
import { UseAuth } from "../context/auth.js";
import { RiCloseCircleFill, RiShoppingCart2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Carrinho = () => {
  const [cartItens, setCartItens] = useState([]);
  const [totalCart, setTotalCart] = useState("");
  const [change, setChange] = useState(false);
  const [auth] = UseAuth();
  const [user, setUser] = useState({});
  const Navigate = useNavigate();

  const getUsuario = async () => {
    try {
      const storage = JSON.parse(sessionStorage.getItem("auth"));   
      if (storage) {
        const { data } = await axios.get( //A variável tem que se chamar necessariamente data aqui
            `http://localhost:3001/api/v1/auth/detalhe/${storage.usuario._id}`
        );
        const newUser = data.usuario;
        setUser(newUser);
      }
    } catch (e) {
        console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message",
        position: "top-center",
                      autoClose: 1500,
                      theme: "dark"
      });
    }
  }
  
  const navegarLogin = () => {
    Navigate("/login");
  };

  const navegarCadastro = () => {
    Navigate("/cadastro");
  };

  const navegarUser = () => {
    Navigate("/auth-login/usuario")
  }

  const mostraTamanho = (tamanho) => {
    try {
      switch (tamanho) {
        case "BL":
          return "Baby Look";
        case "P":
          return "Pequeno";
        case "M":
          return "Médio";
        case "G":
          return "Grande";
        case "XG":
          return "Extra Grande";
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

  useEffect(() => {
    const storage = JSON.parse(sessionStorage.getItem("carrinho"));
    getUsuario();
    setCartItens(storage);
    handleTotal();
    setChange(false);
  }, [cartItens?.length, change]);

  const handleQtd = (id, qtd) => {
    try {
      let newArr = cartItens;
      const index = newArr.findIndex((p) => {
        return p._id === id;
      });
      newArr[index].qtd = qtd;
      sessionStorage.removeItem("carrinho");
      sessionStorage.setItem("carrinho", JSON.stringify(newArr));
      setChange(true);
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

  const handleTotal = () => {
    try {
      let total = 0;
      cartItens?.map((p) => {
        total = total + p.preco * p.qtd;
      });
      setTotalCart(
        total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      );
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

  function filterCarrinho (){
    
    let newArr = [];
    for (let i = 0; i < cartItens.length; i++){
      console.log(cartItens[i])
      const item = {produto: cartItens[i]._id, qtd: cartItens[i].qtd};
      newArr.push(item);
    }
    return newArr;
  }

  const handlePedido = async (e) => {
    e.preventDefault(); 
    const totalInt = parseInt(totalCart.slice(3))
    console.log(totalInt)
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/pedidos/`,
        {
          status: 0,
          tipoPgto: 0,
          usuario: user._id,
          carrinho: filterCarrinho(),
          total: totalInt
        }
      ); //status e pedidos hardcode para demonstração

      if (res && res.data.success) {
        toast.success(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark"
        });
        sessionStorage.removeItem("carrinho");
        
        setTimeout(() => {
          navegarUser()
        }, 2000);
      } else {
        toast.error(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark"
        });
      }
    } catch (e) {
      console.log(e)
      toast.error("Algo deu errado", {
        className: "toast-message",
        position: "top-center",
        autoClose: 1500,
        theme: "dark"
      });
    }
  }

  function removeDaLista(arr, index) {
    console.log(index);
    let newArr = [];
    for (let i = 0; i <= arr.length; i++) {
      if (i !== index && arr[i] !== undefined) {
        console.log(arr[i]);
        newArr.push(arr[i]);
      }
    }
    console.log(newArr);
    return newArr;
  }

  const removeItem = (id) => {
    try {
      const index = cartItens.findIndex((p) => {
        return p._id === id;
      });
      let newArr = removeDaLista(cartItens, index);
      sessionStorage.removeItem("carrinho");
      sessionStorage.setItem("carrinho", JSON.stringify(newArr));
      setChange(true);
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

  return (
    <Layout>
      {auth?.usuario && cartItens?.length ? <div style={{display: "flex", justifyContent: "center"}}><h2><RiShoppingCart2Fill/> de {user.nome}</h2></div> : <div style={{display: "none"}}></div>}
      {
        cartItens?.length ? <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ margin: "0 3rem", fontSize: "1.5rem", width: "50%" }}>
          {cartItens?.map((p) => (
            <div className="carrinho">
              <table>
                <tbody>
                  <tr key={p._id} style={{}}>
                    <td>
                      <img
                        width={100}
                        height={100}
                        src={p.imgFrente}
                        style={{ borderRadius: "10px" }}
                      ></img>
                    </td>
                    <td>{p.nome}</td>
                    <td>{p.marca}</td>
                    <td>
                      <b>Tamanho:</b> {mostraTamanho(p.tamanho)}
                    </td>
                    <td>
                      <b>Cor:</b> {p.cor}
                    </td>
                    <td>
                      <b>Quantidade </b>
                      <input
                        style={{ maxWidth: "4rem", minHeight: "2.5rem" }}
                        type="number"
                        defaultValue={p.qtd}
                        onChange={(e) => handleQtd(p._id, e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <b>
                        {p.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </b>
                    </td>
                    <td>
                      <RiCloseCircleFill
                        size="25px"
                        className="icon"
                        onClick={() => removeItem(p._id)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <div>
          <div
            className="carrinho"
            style={{
              display: "flex",
              justifyContent: "center",
              flexFlow: "column",
              marginBottom: "3rem",
              borderRadius: "1rem",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Total: {totalCart}</h3>
          </div>
          {auth?.usuario ? (
            <div style={{display: "flex", flexFlow: "column", alignItems: "center"}}>
              <div className="card" style={{ width: "30rem", marginBottom: "3rem"}}>
                <h3>Endereço</h3>
                <h4>Logradouro: {user.endereco}</h4>
                <h4>Numero: {user.numEnd}</h4>
                <h4>Bairro: {user.bairro}</h4>
                <h4>Complemento: {user.complementoEnd}</h4>
                <h4>CEP: {user.cep}</h4>
                <h4>Cidade: {user.cidade}</h4>
                <h4>Estado: {user.estado}</h4>
                <button
                  style={{ margin: "1rem 0" }}
                  onClick={() => {
                    navegarUser();
                  }}
                >
                  Editar Endereço
                </button>
              </div>
              <button
                style={{ margin: "1rem 0" }}
                onClick={handlePedido}
              >
                Finalizar Compra
              </button>
            </div>
          ) : (
            <div className="card">
              <h3 style={{ textAlign: "center" }}>
                Entre para finalizar a compra
              </h3>
              <button
                style={{ margin: "1rem 0" }}
                onClick={() => {
                  navegarLogin();
                }}
              >
                Login
              </button>
              <button
                style={{ margin: "1rem 0" }}
                onClick={() => {
                  navegarCadastro();
                }}
              >
                Se Cadastrar
              </button>
            </div>
          )}
        </div>
      </div> : <div><h2 style={{textAlign: "center"}}>O carrinho está vazio!</h2></div>
      }
      
    </Layout>
  );
};

export default Carrinho;
