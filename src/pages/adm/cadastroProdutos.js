import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";

const CadastroProduto = () => {
  const [nome, setNome] = useState("");
  const [tecido, setTecido] = useState("");
  const [estampa, setEstampa] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [cor, setCor] = useState("");
  const [preco, setPreco] = useState("");
  const [custo, setCusto] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [marca, setMarca] = useState("");
  const [imgFrente, setImgFrente] = useState("");
  //   const [imgTras, setImgTras] = useState("");
  //   const [imgCorpo, setImgCorpo] = useState("");

  const [fornecedores, setFornecedores] = useState([]);

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/api/v1/produtos/`, {
        nome,
        tecido,
        estampa,
        quantidade,
        tamanho,
        cor,
        preco,
        custo,
        fornecedor,
        marca,
        imgFrente,
      });

      console.log("fornecedor");
      console.log(fornecedor);

      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          Navigate("/auth-login/auth-gerente/produtos");
        }, 2000);
      } else {
        toast.error(res.data.message, {
          className: "toast-message",
        });
      }
    } catch (err) {
      toast.error("Algo deu errado", {
        className: "toast-message",
      });
    }
  };

  const listarFornecedores = async () => {
    try {
      const dados = await axios.get(
        "http://localhost:3001/api/v1/fornecedores/"
      );
      setFornecedores(dados.data.fornecedores);
    } catch (e) {
      console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message",
      });
    }
  };

  function imgToBase64(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImgFrente(reader.result);
    };
  }

  useEffect(() => {
    listarFornecedores();
  }, []);

  return (
    <Layout>
      <h1 className="cad">Cadastro de produto</h1>
      <img width={200} height={200} src={imgFrente} />
      <div className="forms">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input accept="image/*" type="file" onChange={imgToBase64} />
          </div>
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
            <label htmlFor="tecido">Tecido</label>
            <input
              type="text"
              name="tecido"
              id="tecido"
              placeholder="Tipo do tecido"
              value={tecido}
              onChange={(e) => setTecido(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="estampa">Estampa</label>
            <input
              type="text"
              name="estampa"
              id="estampa"
              placeholder="Tipo da estampa"
              value={estampa}
              onChange={(e) => setEstampa(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantidade">Quantidade</label>
            <input
              type="number"
              name="quantidade"
              id="quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tamanho">Tamanho</label>
            <select
              name="tamanho"
              id="tamanho"
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
              required
            >
              <option value="">-- Selecionar --</option>
              <option value="BL">Baby Look</option>
              <option value="P">Pequeno</option>
              <option value="M">Médio</option>
              <option value="G">Grande</option>
              <option value="XG">Extra Grande</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cor">Cor</label>
            <select
              name="cor"
              id="cor"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              required
            >
              <option value="">-- Selecionar --</option>
              <option value="Branco">Branco</option>
              <option value="Preto">Preto</option>
              <option value="Cinza">Cinza</option>
              <option value="Azul">Azul</option>
              <option value="Rosa">Rosa</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="preco">Preço</label>
            <input /*Adicionar mascara */
              type="number"
              name="preco"
              id="preco"
              placeholder="R$00.00"
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="custo">Custo</label>
            <input /*Adicionar mascara */
              type="number"
              name="custo"
              id="custo"
              placeholder="R$00.00"
              value={custo}
              onChange={(e) => setCusto(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fornecedor">Fornecedor</label>
            <select
              name="fornecedor"
              id="fornecedor"
              value={fornecedor}
              onChange={(e) => setFornecedor(e.target.value)}
              required
            >
              <option value="">-- Selecionar --</option>
              {fornecedores?.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="marca">Marca</label>
            <input
              type="text"
              name="marca"
              id="marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CadastroProduto;
