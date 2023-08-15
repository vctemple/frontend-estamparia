import React from "react";
import Header from "./header.js";
import Footer from "./footer.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const layout = (props) => {
  return (
    <div>
        <Header/>
        <main>
          <ToastContainer/>
          {props.children}
        </main>
        <Footer/>
    </div>
  )
}

export default layout