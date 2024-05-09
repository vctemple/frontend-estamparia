import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";
import { RiCheckboxCircleFill } from "react-icons/ri";


const EditarAnuncio = () => {
  const [produtoEstampa, setProdutoEstampa] = useState({});
  const [preco_venda, setPreco_venda] = useState();
  const [promocao_anuncio, setPromocao_anuncio] = useState();
  const [imgFrente_anuncio, setImgFrente_anuncio] = useState("");
  const [imgTras_anuncio, setImgTras_anuncio] = useState("");
  const [imgCorpo_anuncio, setImgCorpo_anuncio] = useState("");


  const [flag, setFlag] = useState(false);

  const Navigate = useNavigate();
  const params = useParams();
  
  const getAnuncio = async () => {
    try {
      const dados = await axios.get(`http://localhost:3001/api/v1/anuncios/${params.pid}`);
      setPreco_venda(dados.data.anuncio.preco_venda);
      setPromocao_anuncio(dados.data.anuncio.promocao_anuncio);
      setImgFrente_anuncio(dados.data.anuncio.imgFrente_anuncio);
      setImgTras_anuncio(dados.data.anuncio.imgTras_anuncio);
      setImgCorpo_anuncio(dados.data.anuncio.imgCorpo_anuncio);
      setProdutoEstampa(dados.data.produtoCorreto);
        console.log(dados.data.produtoCorreto)
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
      const res = await axios.put(
        `http://localhost:3001/api/v1/anuncios/editar/${params.pid}`,
        {
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
    getAnuncio();
    setFlag(false);
    //eslint-disable-next-line
  }, [flag]);

  return (
    <Layout>
      <h1 className="cad">Editar anúncio</h1>

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
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                <img
                      width={50}
                      height={50}
                      src={produtoEstampa.imgFrente}
                      style={{ borderRadius: "10px" }}
                    ></img>
                    <td>{produtoEstampa.sku}</td>
                    <td>{produtoEstampa.dimensao_estampa}</td>
                    <td>{produtoEstampa.tipo_estampa}</td>
                    <td>{produtoEstampa.tecido_camiseta}</td>
                    <td>{produtoEstampa.cor_camiseta}</td>
                    <td>{produtoEstampa.tamanho_camiseta}</td>
                    <td>{produtoEstampa.marca_camiseta}</td>
                    <td>{produtoEstampa.quantidade}</td>
              </tr>
          </tbody>
        </table>
      </div>

      <div className="forms">
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
            <button type="submit">Editar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditarAnuncio;
