import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";

const EditarProduto = () => {
  const Navigate = useNavigate();
  const params = useParams();

  const [id, setId] = useState("");
  const [nome_estampa, setNome] = useState("");
  const [dimensoes, setDimensoes] = useState([]);
  const [imgEstampa, setImgEstampa] = useState("");

  const [sku, setSku] = useState("");
  const [dimensao_estampa, setDimensao_estampa] = useState("");
  const [tipo_estampa, setTipo_estampa] = useState("");
  const [tecido_camiseta, setTecido_camiseta] = useState("");
  const [cor_camiseta, setCor_camiseta] = useState("");
  const [tamanho_camiseta, setTamanho_camiseta] = useState("");
  const [marca_camiseta, setMarca_camiseta] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo_lote, setCusto_lote] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [imgFrente, setImgFrente] = useState("");

  const [fornecedores, setFornecedores] = useState([]);

  const getSKU = async () => {
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/produtos/dados/sku/${params.pid}`
      );
      setId(data.produto._id);
      setNome(data.produto.nome_estampa);
      setDimensoes(data.produto.dimensoes);
      setImgEstampa(data.produto.imgEstampa);
      setDimensao_estampa(data.produto.SKUs.dimensao_estampa);
      setTipo_estampa(data.produto.SKUs.tipo_estampa);
      setTecido_camiseta(data.produto.SKUs.tecido_camiseta);
      setCor_camiseta(data.produto.SKUs.cor_camiseta);
      setSku(data.produto.SKUs.sku);
      setTamanho_camiseta(data.produto.SKUs.tamanho_camiseta);
      setMarca_camiseta(data.produto.SKUs.marca_camiseta);
      setCusto_lote(data.produto.SKUs.custo_lote);
      setFornecedor(data.produto.SKUs.fornecedor);
      setQuantidade(data.produto.SKUs.quantidade)
      setImgFrente(data.produto.SKUs.imgFrente);
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
      const res = await axios.put(`http://localhost:3001/api/v1/produtos/editarSKU/${params.pid}`, {
        sku,
        dimensao_estampa,
        tipo_estampa,
        tecido_camiseta,
        cor_camiseta,
        tamanho_camiseta,
        marca_camiseta,
        quantidade,
        custo_lote,
        fornecedor,
        imgFrente,
      });

      if (res && res.data.success) {
        toast.success(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
        setTimeout(() => {
          Navigate("/auth-login/auth-gerente/produtos");
        }, 2000);
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

  function imgToBase64(img, text) {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      if (text === "frente") setImgFrente(reader.result);
    };
  }

  useEffect(() => {
    listarFornecedores();
    getSKU();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="cad">Editar SKU</h1>
      <div className="form-group" style={{
            
            display: "flex",
            alignItems: "center",
            maxWidth: "80vw",
            justifyContent: "center",
            margin: "0 auto",
            
          }}>
            <img
            width={80}
            height={80}
            src={imgEstampa}
            style={{ marginLeft: "2rem" }}
          />
        <div
          style={{borderTopRightRadius: "2rem", borderBottomRightRadius: "2rem", background: "#ccc", minWidth: "80%", display: "flex", alignContent: "flex-start"}}
        >
          <h3 style={{margin: "2.85rem 1rem"}}>{nome_estampa}</h3>
        </div>
        
      </div>
      <div className="forms formComLabel1">
        <form onSubmit={handleSubmit}>
          <div className="group-image" style={{ display: "flex", flexFlow: "column", alignItems: "flex-end" }}>
            <img
              width={200}
              height={200}
              src={imgFrente}
              style={{ marginRight: "4rem" }}
            />
            <input
              className="image"
              accept="image/*"
              type="file"
              onChange={(e) => imgToBase64(e.target.files[0], "frente")}
              style={{maxWidth: "27.8rem", marginTop: "1rem"}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              name="sku"
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dimencao_estampa">Dimensão da estampa</label>
            <select
              name="dimencao_estampa"
              id="dimencao_estampa"
              value={dimensao_estampa}
              onChange={(e) => setDimensao_estampa(e.target.value)}
              required
            >
              <option value="">-- Selecionar --</option>
              {dimensoes?.map((f) => (
                <option value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tipo_estampa">Tipo de estampa</label>
            <input
              type="text"
              name="tipo_estampa"
              id="tipo_estampa"
              placeholder="Tipo da estampa"
              value={tipo_estampa}
              onChange={(e) => setTipo_estampa(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tecido_camiseta">Tecido da camiseta</label>
            <input
              type="text"
              name="tecido_camiseta"
              id="tecido_camiseta"
              value={tecido_camiseta}
              onChange={(e) => setTecido_camiseta(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cor_camiseta">Cor da camiseta</label>
            <select
              name="cor_camiseta"
              id="cor_camiseta"
              value={cor_camiseta}
              onChange={(e) => setCor_camiseta(e.target.value)}
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
            <label htmlFor="tamanho_camiseta">Tamanho da camiseta</label>
            <select
              name="tamanho_camiseta"
              id="tamanho_camiseta"
              value={tamanho_camiseta}
              onChange={(e) => setTamanho_camiseta(e.target.value)}
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
            <label htmlFor="marca_camiseta">Marca da camiseta</label>
            <input
              type="text"
              name="marca_camiseta"
              id="marca_camiseta"
              value={marca_camiseta}
              onChange={(e) => setMarca_camiseta(e.target.value)}
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
            <label htmlFor="custo_lote">Custo do lote</label>
            <input /*Adicionar mascara */
              type="number"
              name="custo_lote"
              id="custo_lote"
              placeholder="R$00.00"
              value={custo_lote}
              onChange={(e) => setCusto_lote(e.target.value)}
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
            <label></label>
            <button type="submit">Editar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditarProduto;
