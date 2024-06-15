import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";
import { UseAuth } from "../../context/auth.js";
import format from "date-fns/format";

const DetalhePedido = () => {
  const [pedido, setPedido] = useState({});
  const [auth] = UseAuth();
  const params = useParams();
  const [emailCliente, setEmailCliente] = useState("");
  const [dataPedido, setDataPedido] = useState("")

  const getPedido = async () => {
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/pedidos/detalhe/${params.pid}`
      );
      setPedido(data.pedido);
      setEmailCliente(data.pedido.usuario.email)
      setDataPedido(dataBr(data.pedido.createdAt))
      console.log(data);
      //   setPedido(data.pedido)
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

  function posicao (posicao){
    switch (posicao){
        case 0:
            return "Alto";
        case 1:
            return "Centro";
        case 2:
            return "Baixo";
    }
  }

  function dataBr(data) {
    let newData = Date.parse(data);
    return format(newData, "dd/MM/yyyy");
  }

  useEffect(() => {
    getPedido();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1>Pedido detalhado</h1>
      <div className="table">
        <table style={{ width: "auto" }}>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Status de pagamento</td>
              <td>{pedido.status}</td>
            </tr>
            <tr>
              <td>Valor total do carrinho</td>
              <td>{parseFloat(pedido.totalCarrinho).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}</td>
            </tr>
            <tr>
              <td>Empresa de transporte</td>
              <td>{pedido.freteEmpresa}</td>
            </tr>
            <tr>
              <td>Serviço escolhido</td>
              <td>{pedido.freteServico}</td>
            </tr>
            <tr>
              <td>Valor do frete</td>
              <td>{parseFloat(pedido.fretePreco).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}</td>
            </tr>
            <tr>
              <td>Valor total do pedido</td>
              <td>{parseFloat(pedido.totalPedido).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}</td>
            </tr>
            {auth.usuario.perfil === 1 ? (
              <tr>
                <td>Valor líquido</td>
                <td>{pedido.entradaPgtoLiq ? (parseFloat(pedido.entradaPgtoLiq).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })) : ("NÃO RECEBIDO")}</td>
              </tr>
            ) : (
              <></>
            )}
            <tr>
              <td>Email do cliente</td>
              <td>{emailCliente}</td>
            </tr>
            <tr>
              <td>Data</td>
              <td>{dataPedido}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table">
        <table style={{ width: "auto" }}>
          <thead>
            <tr><th colSpan={6}>Carrinho</th></tr>
            <tr>
              <th colSpan={2}>Item</th>
              <th>Estampa 1</th>
              <th>Estampa 2</th>
              <th>Posição trás</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {pedido.carrinho?.map((i) => (
              <tr key={i._id}>
                <td><img
                  width={50}
                  height={50}
                  src={i.anuncio.imgFrente_anuncio}
                  style={{ borderRadius: "10px" }}
                ></img></td>
                <td>{i.skusItem[0]}</td>
                {i.estampaPersnFrente ? (
                  <td><img
                    width={50}
                    height={50}
                    src={i.estampaPersnFrente}
                    style={{ borderRadius: "10px" }}
                  ></img></td>
                ) : (
                  <td>Padrão da loja</td>
                )}
                {i.estampaPersnTras ? (
                  <td><img
                    width={50}
                    height={50}
                    src={i.estampaPersnTras}
                    style={{ borderRadius: "10px" }}
                  ></img></td>
                ) : (
                  <td>Padrão da loja</td>
                )}
                {i.estampaPersnTras ? (
                  <td>{posicao(i.posicaoEstampaTras)}</td>
                ) : (
                  <td>Padrão da loja</td>
                )}
                <td>{i.qtd}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DetalhePedido;
