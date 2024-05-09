import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";
import "../../styles/card.css";
import format from "date-fns/format";
import fluxoFinancasPDF from "../../components/reports/relatorioVendas.js";

const BalancoVendas = () => {
  const [flag, setFlag] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [receitaLiquida, setReceitaLiquida] = useState();
  const [totalItens, setTotalItens] = useState();
  const [anunciosMaisVendidos, setAnunciosMaisVendidos] = useState([]);
  const [dataInicio, setDataInicio] = useState(
    format(Date.now() - 6 * 24 * 60 * 60 * 1000, "yyyy-MM-dd")
  );
  const [dataFim, setDataFim] = useState(format(Date.now(), "yyyy-MM-dd"));

  const calcElemBalanco = (balanco) => {
    let anunciosMaisVendidos = [];
    let receitaLiquida = 0;
    let totalItens = 0;
    balanco.map((m) => {
      receitaLiquida += m.entradaPgtoLiq - m.fretePreco;
      m.carrinho.map((a) => {
        let deuBom = false;
        for (let i = 0; i < anunciosMaisVendidos.length; i++) {
          if (anunciosMaisVendidos[i][0] === a.anuncio._id) {
            anunciosMaisVendidos[i][1] += a.qtd;
            deuBom = true;
          }
        }
        if (!deuBom) anunciosMaisVendidos.push([a.anuncio._id, a.qtd]);
      });
    });
    anunciosMaisVendidos.forEach((a) => {
        totalItens += a[1]
    })
    setReceitaLiquida(receitaLiquida);
    setAnunciosMaisVendidos(anunciosMaisVendidos);
    setTotalItens(totalItens);
  };

  const listarPedidosFinalizados = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/pedidos/pedidosFinalizados",
        {
          dataInicio,
          dataFim,
        }
      );
      console.log(res.data.pedidos);
      setPedidos(res.data.pedidos);
      calcElemBalanco(res.data.pedidos);
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
    listarPedidosFinalizados();
    setFlag(false);
    //eslint-disable-next-line
  }, [flag, dataInicio, dataFim]);

  return (
    <Layout>
      <h1 className="cad">Balanço de Vendas</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        <div
          className="table"
          style={{
            margin: "1rem",
            borderRightStyle: "groove",
            padding: "1rem",
            borderRightColor: "#302c2c",
            display: "flex",
            flexDirection: "column",
            maxHeight: "80vh",
            justifyContent: "normal"
          }}
        >
          <table style={{ width: "auto" }}>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Anúncios</th>
                <th>Valor total</th>
                <th>Frete</th>
                <th>Receita líquida</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {pedidos?.map((m) => (
                <tr key={m._id}>
                  <td>{m._id}</td>
                  <td>
                    {m.carrinho.map((a) => (
                      <tr>
                        <td>
                          {a.anuncio._id} / Qtd: {a.qtd} /{" "}
                          {parseFloat(
                            a.anuncio.preco_venda - a.anuncio.promocao_anuncio
                          ).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>
                      </tr>
                    ))}
                  </td>
                  <td>
                    {parseFloat(m.totalCarrinho).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>
                    {m.freteEmpresa}/{m.freteServico}/
                    {parseFloat(m.fretePreco).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>
                    {parseFloat(m.entradaPgtoLiq - m.fretePreco).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </td>
                  <td>{dataBr(m.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div
            className="card2"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexFlow: "row",
              marginBottom: "2rem",
              borderRadius: "1rem",
            }}
          >
            <div style={{display: "flex"}}>
              <label
                style={{
                  fontSize: "1.5rem",
                  minWidth: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                De
              </label>
              <input
                style={{
                  maxWidth: "11.5rem",
                  minHeight: "2.5rem",
                  paddingLeft: "0.5rem",
                }}
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div style={{display: "flex"}}>
              <label
                style={{
                  fontSize: "1.5rem",
                  minWidth: "3rem",
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
          </div>
          <div className="card3">
            <h4>
              Total de Receita Líquida:{" "}
              {parseFloat(receitaLiquida).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h4>
          </div>
          <div
            className="card2"
            style={{
              display: "flex",
              flexFlow: "column",
              marginTop: "2rem",
              borderRadius: "1rem",
            }}
          >
            <h4 style={{ margin: "0 auto" }}>
              Anúncios mais vendidos do período
            </h4>
            <div
              className="table"
              style={{
                borderRightStyle: "groove",
                padding: "1rem",
                borderRightColor: "#302c2c",
                display: "flex",
                flexDirection: "column",
                marginRight: "2rem",
                marginTop: "1rem",
                marginBottom: "0rem",
              }}
            >
              <table style={{ width: "auto" }}>
                <thead>
                  <tr>
                    <th>Anúncios</th>
                    <th>Qtd</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                    {anunciosMaisVendidos.map((a) => (
                        <tr key={a[0]}>
                            <td>{a[0]}</td>
                            <td>{a[1]}</td>
                            <td>{((a[1]/totalItens)*100).toFixed(1)}%</td>
                        </tr>
                    ))}
                    <tr><td><b>Total de itens vendidos no período</b></td> 
                    <td><b>{totalItens}</b></td>
                    <td><b>100%</b></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center"}}><button
          onClick={() =>
            fluxoFinancasPDF(
              dataInicio,
              dataFim,
              pedidos,
              anunciosMaisVendidos,
              receitaLiquida,
              totalItens
            )
          }
          
          >
            Gerar relatório
          </button></div>
          
        </div>
      </div>
    </Layout>
  );
};

export default BalancoVendas;
