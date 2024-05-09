import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import Layout from "../components/layout/layout.js";
import { toast } from "react-toastify";
import axios from "axios";
import { UseAuth } from "../context/auth";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../styles/card.css";
import { useParams, useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';

const PaymentForm = () => {
  const params = useParams();
  const Navigate = useNavigate();
  const [auth] = UseAuth();
  const [idUser, setIdUser] = useState();
  const [infoPedido, setInfopedido] = useState({});
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const getPedido = async () => {
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/pedidos/detalhe/${params.pid}`
      );
      setInfopedido(data.pedido);
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

  const navegarUser = () => {
    Navigate("/auth-login/usuario");
  };

  useEffect(() => {
    const cartao = JSON.parse(sessionStorage.getItem("cartao"));
    const idUsuario = JSON.parse(sessionStorage.getItem("auth"));
    getPedido();
    setIdUser(idUsuario.usuario._id);

    // eslint-disable-next-line
  }, []);

  const handleFinalizar = async (e) => {
    e.preventDefault();
    try {
      const valMes = state.expiry.slice(0, 2);
      const valAno = "20" + state.expiry.slice(2, 4);
      const totalPedido = infoPedido.totalPedido
      console.log(valMes, "/", valAno);
      const res = await axios.post(
        `http://localhost:3001/api/v1/pedidos/finalizarPagamento`,
        {
          numeroCartao: state.number,
          valMes,
          valAno,
          nomeCartao: state.name,
          ccvCartao: state.cvc,
          pedidoID: infoPedido._id,
          totalPedido,
          idUser,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
        sessionStorage.removeItem("carrinho")
        setTimeout(() => {
          navegarUser();
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

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div>
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />

          <div className="forms">
            <form onSubmit={handleFinalizar}>
              <div className="form-group">
                <label htmlFor="number">Número cartão</label>
                <input
                  type="number"
                  name="number"
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Nome impresso</label>
                <input
                  type="name"
                  name="name"
                  placeholder="Seu nome"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiry">Validade</label>
                <InputMask
                  name="expiry"
                  maskPlaceholder="-"
                  mask="99/99"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvc">CCV</label>
                <input
                  type="number"
                  name="cvc"
                  placeholder="xxx"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="form-group">
                <label></label>
                <button type="submit">Realizar Pagamento</button>
              </div>
            </form>
          </div>
        </div>
        <div className="card" style={{ alignItems: "flex-start" }}>
          <h4>
            <u>id do pedido:</u> {infoPedido._id}
          </h4>
          <h4>
            <u>Total do pedido:</u> R$ {parseFloat(infoPedido.totalPedido).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </h4>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentForm;
