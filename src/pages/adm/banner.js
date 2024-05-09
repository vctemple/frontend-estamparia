import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.js";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/auth.css";
import { UseAuth } from "../../context/auth.js";
import { RiCheckboxCircleFill } from "react-icons/ri";


const Banner = () => {
  
  const [img_banner, setImg_banner] = useState("");

  const getBanner = async () => {
    try {
      const { data } = await axios.get(
        //A variável tem que se chamar necessariamente data aqui
        `http://localhost:3001/api/v1/banner/getBanner/663516d49906828873d816dd`
      );
      console.log(data);
      setImg_banner(data.banner.img_banner)
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/api/v1/banner/editarBanner/663516d49906828873d816dd`, {
      img_banner
      });

      if (res && res.data.success) {
        toast.success(res.data.message, {
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
      if (text === "banner") setImg_banner(reader.result);
    };
  }
  
  useEffect(() => {
    getBanner()
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="cad">Banner</h1>
      <div className="forms">
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <div style={{ marginLeft: "5rem" }}>
              <img
                width={800}
                height={200}
                src={img_banner}
                style={{ marginLeft: "2rem" }}
              />
              <input
                className="image"
                accept="image/*"
                type="file"
                onChange={(e) => imgToBase64(e.target.files[0], "banner")}
              />
            </div>
            
          </div>

          <div className="form-group">
            <label></label>
            <button type="submit">Atualizar banner</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Banner;
