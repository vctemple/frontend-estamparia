import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/carrinho.css";
import format from "date-fns/format";
import { NavLink } from "react-router-dom";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [dataInicio, setDataInicio] = useState(
    format(Date.now() - 6 * 24 * 60 * 60 * 1000, "yyyy-MM-dd")
  );
  const [dataFim, setDataFim] = useState(format(Date.now(), "yyyy-MM-dd"));

  const getPedidos = async () => {
    try {
      const { data } = await axios.post(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/pedidos/todosPedidos`,
        {
          dataInicio,
          dataFim,
        }
      );
      setPedidos(data.pedidos);
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

  function dataBr(data) {
    let newData = Date.parse(data);
    return format(newData, "dd/MM/yyyy");
  }

  useEffect(() => {
    getPedidos();
    //eslint-disable-next-line
  }, [dataInicio, dataFim]);

  return (
    <Layout>
      <h1>Todos os pedidos</h1>
      <div
        style={{
          width: "80vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div
          className="card2"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexFlow: "row",
            marginBottom: "2rem",
            borderRadius: "1rem",
            width: "35rem",
          }}
        >
          <label
            style={{
              fontSize: "1.5rem",
              minWidth: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            De
          </label>
          <input
            style={{
              maxWidth: "11rem",
              minHeight: "2.5rem",
              paddingLeft: "0.5rem",
            }}
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          <label style={{ minWidth: "2rem" }}></label>
          <label
            style={{
              fontSize: "1.5rem",
              minWidth: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            Até
          </label>
          <input
            style={{
              maxWidth: "11rem",
              minHeight: "2.5rem",
              paddingLeft: "0.5rem",
            }}
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>
        <div style={{ margin: "0 1rem", fontSize: "1.5rem", minWidth: "50%" }}>
          {pedidos?.map((p) => (
            <NavLink to={`/auth-login/detalhePedido/${p._id}`}>
              <div
                className="carrinho"
                style={{ borderRadius: "1rem", marginTop: "2rem" }}
              >
                <table className="tabela">
                  <tbody>
                    <tr key={p._id}>
                      <td>
                        <b>Pedido</b>
                        <p>{p._id}</p>
                      </td>
                      <td>
                        <b>Cliente</b>
                        <p>{p.usuario.email}</p>
                      </td>
                      <td>
                        <b>Data do pedido</b>
                        <p>{dataBr(p.createdAt)}</p>
                      </td>
                      <td>
                        <b>Status de pagamento</b>
                        <p>{p.status}</p>
                      </td>
                      <td>
                        <b>Total Pedido</b>
                        <p>
                          {parseFloat(p.totalPedido).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Pedidos;
