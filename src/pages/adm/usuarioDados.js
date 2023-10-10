import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout.js";
import "../../styles/listas.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, NavLink } from "react-router-dom";
import { RiArrowLeftCircleFill } from "react-icons/ri";

const UsuarioDados = () => {
  const params = useParams();
  
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
  const [perfil, setPerfil] = useState("");
  const [ativo, setAtivo] = useState("");

  const getUsuario = async () => {
    try {
        const { data } = await axios.get( //A variável tem que se chamar necessariamente data aqui
            `http://localhost:3001/api/v1/auth/detalhe/${params.pid}`
        );
        setNome(data.usuario.nome);
        setEmail(data.usuario.email);
        setCpf(data.usuario.cpf);
        setDataNascimento(data.usuario.dataNascimento);
        setTelefone(data.usuario.telefone);
        setCEP(data.usuario.cep);
        setEndereco(data.usuario.endereco);
        setNumEnd(data.usuario.numEnd);
        setBairro(data.usuario.bairro);
        setComplementoEnd(data.usuario.complementoEnd);
        setCidade(data.usuario.cidade);
        setEstado(data.usuario.estado);
        setPerfil(data.usuario.perfil);
        setAtivo(data.usuario.ativo);
    } catch (e) {
        console.log(e);
      toast.error("Algo deu errado", {
        className: "toast-message",
      });
    }
  }

  const mostraPerfil = (perfil) => {
    switch (perfil){
      case 0 : return "Cliente";
      case 1 : return "Admin";
      case 2: return "Gerente";
    }
  }

  const mostraStatus = (s) => {
    if (s){
      return "Sim";
    }else{
      return "Não"
    }
  }

  useEffect(() => {
    getUsuario();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1>{nome}</h1>
      <div className="table">
        <table style={{ maxWidth: "5rem"}}>
          <thead>
            <tr>
              <th colSpan={"2"}>Dados</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Email</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>CPF</td>
              <td>{cpf}</td>
            </tr>
            <tr>
              <td>Data de Nascimento</td>
              <td>{dataNascimento}</td>
            </tr>
            <tr>
              <td>Telefone</td>
              <td>{telefone}</td>
            </tr>
            <tr>
              <td>CEP</td>
              <td>{cep}</td>
            </tr>
            <tr>
              <td>Endereço</td>
              <td>{endereco}</td>
            </tr>
            <tr>
              <td>Número</td>
              <td>{numEnd}</td>
            </tr>
            <tr>
              <td>Bairro</td>
              <td>{bairro}</td>
            </tr>
            <tr>
              <td>Complemento</td>
              <td>{complementoEnd}</td>
            </tr>
            <tr>
              <td>Cidade</td>
              <td>{cidade}</td>
            </tr>
            <tr>
              <td>Estado</td>
              <td>{estado}</td>
            </tr>
            <tr>
              <td>Perfil de usuário</td>
            <td>{mostraPerfil(perfil)}</td>
            </tr>
            <tr>
              <td>Ativo</td>
              <td>{mostraStatus(ativo)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{display: "flex", alignItems: "center", flexFlow: "column" }}>
        <NavLink style={{display: "flex", alignItems: "center"}} to={"/auth-login/auth-gerente/auth-adm/usuariosSistema"}>
          <RiArrowLeftCircleFill size="25px" className="icon"/>
          <h4 style={{padding: "0.3rem", marginTop: "1.5rem" }}>Voltar</h4> 
        </NavLink>
        
      </div>
      
    </Layout>
  );
};

export default UsuarioDados;
