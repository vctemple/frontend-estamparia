import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/carrinho.css";
import format from "date-fns/format";

const Dashboard = () => {
  const [pedidos, setPedidos] = useState([]);

  const getPedidos = async () => {
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/pedidos/`
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
  };

  function statusPgto(status) {
    try {
      switch (status) {
        case 0:
          return "Não processado!";
        case 1:
          return "Erro no pagamento!";
        case 2:
          return "Cancelado!";
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
  }

  function tipoPgto(tipo) {
    try {
      switch (tipo) {
        case 0:
          return "Não definido!";
        case 1:
          return "PIX";
        case 2:
          return "Cartão de crédito";
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
  }

  useEffect(() => {
    getPedidos();
    //eslint-disable-next-line
  }, []);
  
  return (
    <Layout>
        <h1>dashboard</h1>
        <div style={{ margin: "0 1rem", fontSize: "1.5rem", width: "40%" }}>
            {pedidos?.map((p) => (
              <div className="carrinho">
                <table className="tabela">
                  <tbody>
                    <tr key={p._id} style={{}}>
                      <td>
                        <b>Email do usuário</b>
                        <p>{p.usuario.email}</p>
                      </td>
                      <td>
                        <b>Data do pedido</b>
                        <p>{dataBr(p.createdAt)}</p>
                      </td>
                      <td>
                        <b>Total do pedido</b>
                        <p>
                          {p.total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </td>
                      <td>
                        <b>Status do pagamento</b> <p>{statusPgto(p.status)}</p>
                      </td>
                      <td>
                        <b>Tipo de pagamento</b> <p>{tipoPgto(p.tipoPgto)}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        <div></div>
    </Layout>
    
  );
};

export default Dashboard