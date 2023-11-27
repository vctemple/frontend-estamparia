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
  }

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
      <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "3rem"}}>
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
        <div style={{ margin: "0 1rem", display: "flex", flexFlow: "column"}}>
          <iframe
            style={{
              background: "#21313C",
              border: "none",
              borderRadius: "2rem",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              marginBottom: "2rem"
            }}
            width={640}
            height={400}
            src="https://charts.mongodb.com/charts-estamparia-zbiei/embed/charts?id=655d2647-df21-40cb-8153-fa26aaabd2df&maxDataAge=300&theme=dark&autoRefresh=true"
          ></iframe>
          <iframe style={{
              background: "#f5f5f5",
              border: "none",
              borderRadius: "2rem",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            width={640}
            height={400} src="https://charts.mongodb.com/charts-estamparia-zbiei/embed/charts?id=655d2cc5-96b0-4ad2-8f83-8acd2b63ce99&maxDataAge=300&theme=light&autoRefresh=true"></iframe>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
