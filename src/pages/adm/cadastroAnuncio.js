import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";
import { RiCheckboxCircleFill } from "react-icons/ri";


const CadastroAnuncio = () => {
  const [SKUs_anuncio, setSKUs_anuncio] = useState([]);
  const [preco_venda, setPreco_venda] = useState("");
  const [promocao_anuncio, setPromocao_anuncio] = useState("");
  const [imgFrente_anuncio, setImgFrente_anuncio] = useState("");
  const [imgTras_anuncio, setImgTras_anuncio] = useState("");
  const [imgCorpo_anuncio, setImgCorpo_anuncio] = useState("");

  const [produtos, setProdutos] = useState([]);
  const [prodIdSelect, setProdIdSelect] = useState("");
  const [prodDataSelect, setProdDataSelect] = useState([]);
  const [flag, setFlag] = useState(false);

  const Navigate = useNavigate();

  const listarProdutos = async () => {
    try {
      const dados = await axios.get("http://localhost:3001/api/v1/produtos/");
      setProdutos(dados.data.produtos);
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

  const estampaSelecionada = (_id) => {
    setProdIdSelect(_id);
    const prodIndex = produtos.findIndex((idprod) => idprod._id === _id);
    setProdDataSelect(produtos[prodIndex].SKUs);
  };

  const handleSku = (sku) => {
    console.log(sku);
    let newArr = SKUs_anuncio;
    if (newArr) {
      const arrInd = newArr.findIndex((skuA) => skuA === sku);
      console.log(arrInd)
      if (arrInd > -1) {
        newArr.splice(arrInd, arrInd+1);
        setSKUs_anuncio(newArr);
      } else {
        newArr.push(sku);
        setSKUs_anuncio(newArr);
      }
    } else setSKUs_anuncio(sku);
    setFlag(true);
    console.log(newArr)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/anuncios/cadastroAnuncio`,
        {
          SKUs_anuncio,
          preco_venda,
          promocao_anuncio,
          imgFrente_anuncio,
          imgTras_anuncio,
          imgCorpo_anuncio,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message, {
          className: "toast-message",
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        });
        setTimeout(() => {
          Navigate("/auth-login/auth-gerente/anuncios/");
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

  function imgToBase64(img, text) {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      if (text === "frente") setImgFrente_anuncio(reader.result);
      if (text === "tras") setImgTras_anuncio(reader.result);
      if (text === "corpo") setImgCorpo_anuncio(reader.result);
    };
  }

  useEffect(() => {
    listarProdutos();
    setFlag(false);
    //eslint-disable-next-line
  }, [flag]);

  return (
    <Layout>
      <h1 className="cad">Cadastro de anúncio</h1>

      <div className="table">
        <table style={{ width: "auto" }}>
          <thead>
            <tr>
              <th style={{ border: 0, backgroundColor: "#fff" }}></th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Selecionado</th>
            </tr>
          </thead>
          <tbody>
            {produtos?.map((p) => (
              <tr key={p._id} onClick={() => estampaSelecionada(p._id)}>
                <img
                  width={50}
                  height={50}
                  src={p.imgEstampa}
                  style={{ borderRadius: "10px" }}
                ></img>

                <td>{p.nome_estampa}</td>
                <td>{p.descricao}</td>
                <td>
                  {p._id === prodIdSelect ? (
                    <RiCheckboxCircleFill size="25px" className="icon" />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table">
        <table style={{ width: "auto" }}>
          <thead>
            <tr>
              <th style={{ border: 0, backgroundColor: "#fff" }}></th>
              <th>SKU</th>
              <th>Dimensão</th>
              <th>Tipo da estampa</th>
              <th>Tecido da camisa</th>
              <th>Cor da camiseta</th>
              <th>Tamanho da camiseta</th>
              <th>Marca</th>
              <th>Fornecedor</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {prodDataSelect.map((s) => (
              <tr
                key={s.sku}
                onClick={() => {
                  handleSku(s.sku);
                }}
              >
                {!s.ativo_sku && s.quantidade > 0 ? (
                  <>
                    <img
                      width={50}
                      height={50}
                      src={s.imgFrente}
                      style={{ borderRadius: "10px" }}
                    ></img>
                    <td>{s.sku}</td>
                    <td>{s.dimensao_estampa}</td>
                    <td>{s.tipo_estampa}</td>
                    <td>{s.tecido_camiseta}</td>
                    <td>{s.cor_camiseta}</td>
                    <td>{s.tamanho_camiseta}</td>
                    <td>{s.marca_camiseta}</td>
                    <td>{s.fornecedor.nome}</td>
                    <td>{s.quantidade}</td>
                    {SKUs_anuncio.findIndex((sku) => sku === s.sku) > -1 ? (
                      <RiCheckboxCircleFill size="25px" className="icon" />
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {SKUs_anuncio.length > 0 ? (<div className="forms">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div style={{ marginLeft: "5rem" }}>
              <img
                width={200}
                height={200}
                src={imgFrente_anuncio}
                style={{ marginLeft: "2rem" }}
              />
              <input
                className="image"
                accept="image/*"
                type="file"
                onChange={(e) => imgToBase64(e.target.files[0], "frente")}
              />
            </div>
            <div>
              <img
                width={200}
                height={200}
                src={imgTras_anuncio}
                style={{ marginLeft: "2rem" }}
              />
              <input
                className="image"
                accept="image/*"
                type="file"
                onChange={(e) => imgToBase64(e.target.files[0], "tras")}
              />
            </div>
            <div>
              <img
                width={200}
                height={200}
                src={imgCorpo_anuncio}
                style={{ marginLeft: "2rem" }}
              />
              <input
                className="image"
                accept="image/*"
                type="file"
                onChange={(e) => imgToBase64(e.target.files[0], "corpo")}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="preco_venda">Preço de venda</label>
            <input
              type="number"
              name="preco_venda"
              id="preco_venda"
              placeholder="R$00.00"
              value={preco_venda}
              onChange={(e) => setPreco_venda(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="promocao_anuncio">Promoção</label>
            <input
              type="number"
              name="promocao_anuncio"
              id="promocao_anuncio"
              placeholder="R$00.00"
              value={promocao_anuncio}
              onChange={(e) => setPromocao_anuncio(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label></label>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>) : (<h3>Escolha um SKU Disponível</h3>)}
      
    </Layout>
  );
};

export default CadastroAnuncio;
