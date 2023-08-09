import React from "react";
import Header from "./header.js";
import Footer from "./footer.js"

const layout = (props) => {
  return (
    <div>
        <Header/>
        <main>
            {props.children}
        </main>
        <Footer/>
    </div>
  )
}

export default layout