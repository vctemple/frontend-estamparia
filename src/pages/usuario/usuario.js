import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import { UseAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";
import "../../styles/carrinho.css";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";

const Usuario = () => {
  const [auth, setAuth] = UseAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCEP] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numEnd, setNumEnd] = useState("");
  const [bairro, setBairro] = useState("");
  const [complementoEnd, setComplementoEnd] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [imagem, setImagem] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [historico, setHistorico] = useState([]);
  const Navigate = useNavigate();

  const getUsuario = async () => {
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/auth/detalhe/${auth.usuario._id}`
      );

      setNome(data.usuario.nome);
      setEmail(data.usuario.email);
      setCpf(data.usuario.cpf);
      setDataNascimento(
        data.usuario.dataNascimento.substring(
          0,
          data.usuario.dataNascimento.indexOf("T")
        )
      );
      setTelefone(data.usuario.telefone);
      setCEP(data.usuario.cep);
      setEndereco(data.usuario.endereco);
      setNumEnd(data.usuario.numEnd);
      setBairro(data.usuario.bairro);
      setComplementoEnd(data.usuario.complementoEnd);
      setCidade(data.usuario.cidade);
      setEstado(data.usuario.estado);
      setImagem(data.usuario.imagem);
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

  const getHistorico = async () => {
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/pedidos/${auth.usuario._id}`
      );
      setHistorico(data.pedidosUser);
      console.log(historico);
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

  function imgToBase64(img) {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => setImagem(reader.result);
  }

  const handleEditarDados = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3001/api/v1/auth/editarDados/${auth.usuario._id}`,
        {
          nome,
          email,
          cpf,
          dataNascimento,
          telefone,
          cep,
          endereco,
          numEnd,
          bairro,
          complementoEnd,
          cidade,
          estado,
          imagem,
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
  };

  const handleDelete = async () => {
    await axios
      .put("http://localhost:3001/api/v1/auth/delete/" + auth.usuario._id)
      .then(setAuth({
        ...auth,
        usuario: null,
        token: "",
      }))
      .then(sessionStorage.removeItem("auth"))
      .then(sessionStorage.removeItem("carrinho"))
      .then(Navigate("/"))
      .catch((err) => {
        toast.error(err.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark"
        });
      });
  };

  const handleSenha = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3001/api/v1/auth/editarSenha/${auth.usuario._id}`,
        {
          senhaAntiga,
          senhaNova
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
        setSenhaAntiga("");
        setSenhaNova("");
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
  };


  useEffect(() => {
    getUsuario();
    getHistorico();
    //eslint-disable-next-line
  }, []);

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

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", flexFlow: "column" }}>
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              marginBottom: "5rem",
            }}
          >
            <img
              width={150}
              height={150}
              src={imagem}
              style={{ marginLeft: "1rem" }}
            />
            <input
              className="image"
              accept="image/*"
              type="file"
              onChange={(e) => imgToBase64(e.target.files[0])}
            />
          </div>
          <div
            className="forms"
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: "2rem",
              marginTop: "0",
            }}
          >
            <form onSubmit={handleSenha}>
              <h4 style={{ display: "flex", justifyContent: "center" }}>Alterar Senha</h4>
              <div className="edit-group">
                <label htmlFor="senhaAntiga">Senha Antiga</label>
                <input
                  type="password"
                  name="senhaAntiga"
                  id="senhaAntiga"
                  value={senhaAntiga}
                  onChange={(e) => setSenhaAntiga(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="senhaNova">Nova Senha</label>
                <input
                  type="password"
                  name="senhaNova"
                  id="senhaNova"
                  value={senhaNova}
                  onChange={(e) => setSenhaNova(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label></label>
                <button type="submit">Alterar</button>
              </div>
            </form>
          </div>
          <div
            className="forms"
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: "2rem",
              marginTop: "3rem",
            }}
          >
            <button style={{ margin: "1rem 1rem" }} onClick={() => {handleDelete()}}>
              Excluir Perfil
            </button>
          </div>
        </div>
        <div>
          <div
            className="forms"
            style={{
              marginTop: "0",
              backgroundColor: "#f5f5f5",
              borderRadius: "2rem",
            }}
          >
            <form onSubmit={handleEditarDados}>
              <div className="edit-group">
                <label htmlFor="Nome">Nome</label>
                <input
                  type="text"
                  name="Nome"
                  id="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="user@user.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="Cpf">CPF</label>
                <input
                  type="number"
                  name="Cpf"
                  id="Cpf"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="aniversario">Aniversário</label>
                <input
                  type="date"
                  name="aniversario"
                  id="aniversario"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="Tel">Telefone</label>
                <input
                  type="number"
                  name="Tel"
                  id="Tel"
                  placeholder="00 90000 0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="cep">CEP</label>
                <input
                  type="number"
                  name="cep"
                  id="cep"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCEP(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="street">Rua</label>
                <input
                  type="text"
                  name="rua"
                  id="rua"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="numero">Número</label>
                <input
                  type="number"
                  name="numero"
                  id="nummero"
                  value={numEnd}
                  onChange={(e) => setNumEnd(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="bairro">Bairro</label>
                <input
                  type="text"
                  name="bairro"
                  id="bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="complemento">Complemento</label>
                <input
                  type="text"
                  name="complemento"
                  id="complemento"
                  value={complementoEnd}
                  onChange={(e) => setComplementoEnd(e.target.value)}
                />
              </div>
              <div className="edit-group">
                <label htmlFor="city">Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </div>
              <div className="edit-group">
                <label htmlFor="estado">Estado</label>
                <select
                  name="estado"
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option value="">-- Selecionar --</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                  <option value="DF">Distrito Federal</option>
                </select>
              </div>
              <div className="edit-group">
                <label></label>
                <button type="submit">Editar</button>
              </div>
            </form>
          </div>
        </div>
        {auth?.usuario.perfil ? (
          <div style={{ display: "none" }}></div>
        ) : (
          <div style={{ margin: "0 1rem", fontSize: "1.5rem", width: "40%" }}>
            {historico?.map((p) => (
              <div className="carrinho">
                <table className="tabela">
                  <tbody>
                    <tr key={p._id} style={{}}>
                      <td>
                        <b>ID do pedido</b>
                        <p>{p._id}</p>
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
        )}
      </div>
    </Layout>
  );
};

export default Usuario;
