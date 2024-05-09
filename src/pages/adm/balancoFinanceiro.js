import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";
import "../../styles/card.css";
import format from "date-fns/format";
import fluxoFinancasPDF from "../../components/reports/fluxoFinancas.js";

const BalancoFinanceiro = () => {
  const [descricao_movimento, setDescricao] = useState("");
  const [valor_movimento, setValor] = useState("");
  const [flag, setFlag] = useState(false);
  const [financas, setFinancas] = useState([]);
  const [valNegativo, setValNegativo] = useState(true);
  const [entradaFin, setEntradaFin] = useState();
  const [saidaFin, setSaidaFin] = useState();
  const [saldoPeriodoFin, setSaldoPeriodoFin] = useState();
  const [dataInicio, setDataInicio] = useState(
    format(Date.now() - 6 * 24 * 60 * 60 * 1000, "yyyy-MM-dd")
  );
  const [dataFim, setDataFim] = useState(format(Date.now(), "yyyy-MM-dd"));

  const calcElemBalanco = (balanco) => {
    let saldoPeriodo = 0;
    let totalEntradas = 0;
    let totalSaidas = 0;

    balanco.map((m) => {
      if (m.valor_movimento > 0) totalEntradas += m.valor_movimento;
      else totalSaidas += m.valor_movimento;
      saldoPeriodo += m.valor_movimento;
    });

    setEntradaFin(totalEntradas.toFixed(2));
    setSaidaFin(totalSaidas.toFixed(2));
    setSaldoPeriodoFin(saldoPeriodo.toFixed(2));
  };

  const listarMovimento = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/financas/", {
        dataInicio,
        dataFim,
      });
      setFinancas(res.data.balanco[0]);
      calcElemBalanco(res.data.balanco[0].movimento);
      setDescricao("");
      setValor("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/financas/inserirValor`,
        {
          descricao_movimento,
          valor_movimento,
          valNegativo,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
      } else {
        toast.error(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error("Algo deu errado", {
        className: "toast-message",
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      });
    }
    setFlag(true);
  };

  function dataBr(data) {
    let newData = Date.parse(data);
    return format(newData, "dd/MM/yyyy");
  }

  useEffect(() => {
    listarMovimento();
    setFlag(false);
    //eslint-disable-next-line
  }, [flag, dataInicio, dataFim]);

  return (
    <Layout>
      <h1 className="cad">Balanço financeiro</h1>
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
          <table style={{ width: "auto"}}>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {financas.movimento?.map((m) => (
                <tr key={m._id}>
                  <td>{m.descricao_movimento}</td>
                  {m.valor_movimento > 0 ? (
                    <td style={{ color: "blue" }}>
                      {m.valor_movimento.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  ) : (
                    <td style={{ color: "red" }}>
                      {m.valor_movimento.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  )}

                  <td>{dataBr(m.data_movimento)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card3">
            <h5>
              Entrada:{" "}
              {parseFloat(entradaFin).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h5>
            <h5>
              Saida:{" "}
              {parseFloat(saidaFin).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h5>
            <h5>
              Balanço:{" "}
              {parseFloat(saldoPeriodoFin).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h5>
          </div>
          <button
            onClick={() =>
              fluxoFinancasPDF(
                financas.movimento,
                financas.saldo,
                dataInicio,
                dataFim,
                entradaFin,
                saidaFin,
                saldoPeriodoFin
              )
            }
            style={{ margin: "1rem auto", minHeight: "3rem" }}
          >
            Gerar relatório
          </button>
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
          <div
            className="card2"
            style={{
              display: "flex",
              justifyContent: "center",
              flexFlow: "column",
              marginBottom: 0,
              borderRadius: "1rem",
            }}
          >
            <p style={{ fontSize: "15px" }}>
              <b>Saldo:</b>
            </p>
            {financas.saldo > 0 ? (
              <h3 style={{ textAlign: "center", color: "blue", margin: 0 }}>
                {parseFloat(financas.saldo).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            ) : (
              <h3 style={{ textAlign: "center", color: "red", margin: 0 }}>
                {parseFloat(financas.saldo).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            )}
          </div>
          <div className="forms">
            <form onSubmit={handleSubmit}>
              <div className="content-radio">
                <label>
                  <input
                    type="radio"
                    value={true}
                    checked={valNegativo === true}
                    onChange={(e) => setValNegativo(true)}
                  />
                  Despesa
                </label>
                <label>
                  <input
                    type="radio"
                    value={false}
                    checked={valNegativo === false}
                    onChange={(e) => setValNegativo(false)}
                  />
                  Receita
                </label>
              </div>
              <div className="form-group">
                <label
                  htmlFor="descricao"
                  style={{
                    minWidth: "6rem",
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                >
                  Descrição{" "}
                </label>
                <input
                  type="text"
                  name="descricao"
                  id="descricao"
                  value={descricao_movimento}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="valor"
                  style={{ minWidth: "6rem", marginLeft: 0, marginRight: 0 }}
                >
                  Valor
                </label>
                <input
                  type="number"
                  name="valor"
                  id="valor"
                  value={valor_movimento}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label
                  style={{ minWidth: "6rem", marginLeft: 0, marginRight: 0 }}
                ></label>
                <button type="submit">Inserir</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BalancoFinanceiro;
