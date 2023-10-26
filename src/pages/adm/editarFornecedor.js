import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";

const EditarFornecedor = () => {
  const Navigate = useNavigate();
  const params = useParams();
  
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCEP] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numEnd, setNumEnd] = useState("");
  const [bairro, setBairro] = useState("");
  const [complementoEnd, setComplementoEnd] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const getFornecedor = async () => {
    try {
        const { data } = await axios.get( //A variável tem que se chamar necessariamente data aqui
            `http://localhost:3001/api/v1/fornecedores/dados/${params.pid}`
        );
        setId(data.fornecedor._id)
        setNome(data.fornecedor.nome);
        setEmail(data.fornecedor.email);
        setCnpj(data.fornecedor.cnpj);
        setTelefone(data.fornecedor.telefone);
        setCEP(data.fornecedor.cep);
        setEndereco(data.fornecedor.endereco);
        setNumEnd(data.fornecedor.numEnd);
        setBairro(data.fornecedor.bairro);
        setComplementoEnd(data.fornecedor.complementoEnd);
        setCidade(data.fornecedor.cidade);
        setEstado(data.fornecedor.estado);
    } catch (e) {
        console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message",
      });
    }
  }
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/api/v1/fornecedores/${id}`, {
        nome,
        email,
        cnpj,
        telefone,
        cep,
        endereco,
        numEnd,
        bairro,
        complementoEnd,
        cidade,
        estado,
      });

      if (res && res.data.success) {
        toast.success(res.data.message, {
            className: "toast-message",
            position: "top-center",
                      autoClose: 1500,
                      theme: "dark"
          });
        setTimeout(() => {
          Navigate("/auth-login/auth-gerente/auth-adm/fornecedores");
        }, 2000);
      } else {
        toast.error(res.data.message, {
          className: "toast-message",
          position: "top-center",
                      autoClose: 1500,
                      theme: "dark"
        });
      }
    } catch (err) {
      toast.error("Algo deu errado", {
        className: "toast-message",
        position: "top-center",
                      autoClose: 1500,
                      theme: "dark"
      });
    }
  };

  useEffect(() => {
    getFornecedor();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="cad">Editar fornecedor</h1>

      <div className="forms">
        <form onSubmit={handleUpdate}>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="Cnpj">CNPJ</label>
            <input
              type="number"
              name="Cnpj"
              id="Cnpj"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="endereco">Rua</label>
            <input
              type="text"
              name="rua"
              id="rua"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              name="complemento"
              id="complemento"
              value={complementoEnd}
              onChange={(e) => setComplementoEnd(e.target.value)}
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label></label>
            <button type="submit">Editar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditarFornecedor;
