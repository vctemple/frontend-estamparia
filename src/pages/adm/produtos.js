import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout.js';
import "../../styles/listas.css";
import axios from "axios";
import { toast } from "react-toastify";
import {BiBlock} from 'react-icons/bi';

const ProdutosPage = () => {
  const [Produtos, setProdutos] = useState([]);
    
  const listarProdutos = async () => {
    try {
      const dados = await axios.get("http://localhost:3001/api/v1/produtos/");
      setProdutos(dados.data.produtos);
    } catch (e) {
      console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message"
      });
    }
  };
  
  useEffect(() => {
    listarProdutos();
  }, []);

  // const handleDelete = async (id) => {
  //   await axios.delete("http://localhost:3001/deleteUser/" + id)
  //   .then(res => {
  //     toast.success(res.data.message, {
  //       className: "toast-message"
  //     })
  //   })
  //   .catch(err => {
  //     toast.error(err.message, {
  //       className: "toast-message"
  //     })
  //   })
  // }

  return (
    <Layout>
        <h1>Lista de Produtos</h1>
        <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th style={{ border:0, backgroundColor:"#fff" }}></th>
                            <th>Nome</th>
                            <th>Tecido</th>
                            <th>Estampa</th>
                            <th>Quantidade</th>
                            <th>Tamanho</th>
                            <th>Cor</th>
                            <th>Preço</th>
                            <th>Custo</th>
                            <th>Fornecedor</th>
                            <th>Marca</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          Produtos?.map((p) =>  (
                            <tr key={p._id}>

                                <img width={50} height={50} src={p.imgFrente} style={{borderRadius:"10px"}}></img>

                              <td>{p.nome}</td>
                              <td>{p.tecido}</td>
                              <td>{p.estampa}</td>
                              <td>{p.quantidade}</td>
                              <td>{p.tamanho}</td>
                              <td>{p.cor}</td>
                              <td>{p.preco}</td>
                              <td>{p.custo}</td>
                              <td>{p.fornecedor.nome}</td>
                              <td>{p.marca}</td>
                              {/* <td className='tableicon' ><BiBlock size='25px' className='deleteicon' title='Deletar usuário' onClick={() => handleDelete(o.ID_User)}/></td> */}
                            </tr>
                          ))
                        }
                    </tbody>   
                </table>
            </div>
        
    </Layout>
  )
}

export default ProdutosPage;