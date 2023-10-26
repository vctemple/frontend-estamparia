import React from "react";
import Layout from "../components/layout/layout.js";

function carrinho() {
  let newArr = JSON.parse(sessionStorage.getItem("carrinho"));
  
  return (
    <Layout>
        <h3>{newArr.length}</h3>
    </Layout>
  )
}

export default carrinho