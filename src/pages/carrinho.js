import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout.js";
import "../styles/carrinho.css";
import "../styles/card.css";
import { toast } from "react-toastify";
import { UseAuth } from "../context/auth.js";
import {
  RiCloseCircleFill,
  RiShoppingCart2Fill,
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Carrinho = () => {
  const [cartItens, setCartItens] = useState([]);
  const [totalCart, setTotalCart] = useState();
  const [change, setChange] = useState(false);
  const [changeFrete, setChangeFrete] = useState(false);
  const [auth] = UseAuth();
  const [user, setUser] = useState({});
  const [frete, setFrete] = useState([]);
  const [selFrete, setSelFrete] = useState();
  const Navigate = useNavigate();

  const getUsuario = async () => {
    try {
      const storage = JSON.parse(sessionStorage.getItem("auth"));
      if (storage) {
        const { data } = await axios.get(
          //A variável tem que se chamar necessariamente data aqui
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
        theme: "dark",
      });
    }
  };

  const navegarLogin = () => {
    Navigate("/login");
  };

  const navegarCadastro = () => {
    Navigate("/cadastro");
  };

  const navegarUser = () => {
    Navigate("/auth-login/usuario");
  };

  const navegarPagamento = (pedido) => {
    Navigate(`/auth-login/pagamento/${pedido}`);
  };

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

  function defProdFrete(storage) {
    let produtos = [];
    storage.forEach((i) => {
      const produto = {
        id: i.anuncioId,
        width: 20,
        height: 20,
        length: 2,
        weight: 0.3,
        insurance_value: i.precoVenda,
        quantity: parseInt(i.qtd),
      };
      produtos.push(produto);
    });
    return produtos;
  }

  const calcularFrete = async (storage) => {
    try {
      if (cartItens?.length && auth?.usuario) {
        const produtos = defProdFrete(storage);
        const res = await axios.post(
          `http://localhost:3001/api/v1/pedidos/frete`,
          {
            produtos,
            cepUser: user.cep,
          }
        );
        console.log(res.data.array);
        if (res.data.array === undefined) setChange(true);
        setFrete(res.data.array);
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
    calcularFrete(storage);
    handleTotal();
    setSelFrete(null);
    setChange(false);
    // eslint-disable-next-line
  }, [cartItens?.length, change, frete?.length]);

  useEffect(() => {
    setChangeFrete(false);
  }, [changeFrete]);

  const handleQtd = (id, qtd) => {
    try {
      let newArr = cartItens;
      const index = newArr.findIndex((p) => {
        return p.anuncioId === id;
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
    if (cartItens?.length) {
      try {
        let total = 0;

        cartItens.forEach((p) => {
          if (p.promocao) {
            total = total + (p.precoVenda - p.promocao) * p.qtd;
          } else {
            total = total + p.precoVenda * p.qtd;
          }
        });
        setTotalCart(total);
      } catch (e) {
        console.log(e);
        toast.error("Algo deu errado", {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
      }
    }
  };

  function filterCarrinho() {
    let newArr = [];
    for (let i = 0; i < cartItens.length; i++) {
      console.log(cartItens[i]);
      const item = {
        anuncio: cartItens[i].anuncioId,
        skusItem: cartItens[i].skuAnuncio,
        qtd: cartItens[i].qtd,
        estampaPersnFrente: cartItens[i].estampaPersnFrente,
        estampaPersnTras: cartItens[i].estampaPersnTras,
        posicaoEstampaTras: cartItens[i].posicaoEstampaTras,
      };
      newArr.push(item);
    }
    return newArr;
  }

  const handlePedido = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/api/v1/pedidos/`, {
        usuario: user._id,
        carrinho: filterCarrinho(),
        totalCarrinho: totalCart,
        fretePreco: selFrete.custom_price,
        freteEmpresa: selFrete.company.name,
        freteServico: selFrete.name,
        totalPedido: soma(totalCart, selFrete.custom_price),
      });

      if (res && res.data.success) {
        toast.success(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
        sessionStorage.removeItem("carrinho");
        setTimeout(() => {
          navegarPagamento(res.data.pedidoNovo._id);
        }, 2000);
      } else {
        toast.error(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
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

  const selecionaFrete = (id) => {
    try {
      let arr = frete;
      arr.forEach((f) => {
        if (f.id === id) {
          f.selecionado = true;
          setSelFrete(f);
        } else f.selecionado = false;
      });
      setFrete(arr);
    } catch (e) {
      console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message",
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      });
    }
    setChangeFrete(true);
  };

  const removeItem = (id) => {
    try {
      const index = cartItens.findIndex((p) => {
        return p.anuncioId === id;
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

  function soma(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return a + b;
  }

  return (
    <Layout>
      {auth?.usuario && cartItens?.length ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>
            <RiShoppingCart2Fill /> de {user.nome}
          </h2>
        </div>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
      {cartItens?.length ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ margin: "0 3rem", fontSize: "1.2rem", width: "50%" }}>
            {cartItens?.map((p) => (
              <div className="carrinho">
                <table>
                  <tbody>
                    <tr key={p._id}>
                      <td>
                        <img
                          width={100}
                          height={100}
                          src={p.imagemFrente}
                          style={{ borderRadius: "10px" }}
                        ></img>
                      </td>
                      <td>{p.nomeEstampa}  <b>{p.marcaCamiseta}</b></td>
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
                          onChange={(e) =>
                            handleQtd(p.anuncioId, e.target.value)
                          }
                          required
                        />
                      </td>
                      <td>
                        <b>
                          {p.promocao
                            ? (p.precoVenda - p.promocao).toLocaleString(
                                "pt-BR",
                                {
                                  style: "currency",
                                  currency: "BRL",
                                }
                              )
                            : p.precoVenda.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                        </b>
                      </td>
                      <td>
                        <RiCloseCircleFill
                          size="25px"
                          className="icon"
                          onClick={() => removeItem(p.anuncioId)}
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
              className="card3"
              style={{
                display: "flex",
                justifyContent: "center",
                flexFlow: "column",
                marginBottom: "2rem",
                borderRadius: "1rem",
              }}
            >
              <h3 style={{ textAlign: "center" }}>Carrinho: {parseFloat(totalCart).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}</h3>
            </div>
            {auth?.usuario ? (
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className="card"
                  style={{ width: "30rem", marginBottom: "2rem" }}
                >
                  <h3>Endereço</h3>
                  <h4>{user.endereco}</h4>
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
                {frete?.map((f) =>
                  f.error ? (
                    <></>
                  ) : (
                    <div
                      className="card3"
                      style={{
                        width: "30rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <img
                          width={82}
                          height={23}
                          src={f.company.picture}
                        ></img>
                        <h4>{f.name}</h4>
                      </div>
                      <div>
                        <h4>R$ {f.custom_price}</h4>
                      </div>
                      <h4>{f.delivery_time} dias</h4>
                      {f.selecionado ? (
                        <RiCheckboxCircleFill size="20px" />
                      ) : (
                        <RiCheckboxBlankCircleLine
                          size="20px"
                          className="icon"
                          onClick={() => {
                            selecionaFrete(f.id);
                          }}
                        />
                      )}
                    </div>
                  )
                )}
                {selFrete != null ? (
                  <div
                    className="card3"
                    style={{
                      width: "30rem",
                      marginTop: "2rem",
                    }}
                  >
                    <h3 style={{ color: "blue" }}>
                      Total: R$ {parseFloat(soma(totalCart, selFrete.custom_price)).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
                    </h3>
                  </div>
                ) : (
                  <></>
                )}
                <button style={{ margin: "1rem 0" }} onClick={handlePedido}>
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
        </div>
      ) : (
        <div>
          <h2 style={{ textAlign: "center" }}>O carrinho está vazio!</h2>
        </div>
      )}
    </Layout>
  );
};

export default Carrinho;
