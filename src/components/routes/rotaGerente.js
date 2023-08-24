import { useState, useEffect } from "react";
import { UseAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

export default function RotaGerente() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = UseAuth();

  useEffect(() => {
    const check = async () => {
            if(auth.usuario.perfil === 2 || auth.usuario.perfil === 1){
                setOk(true);
            } else {
                setOk(false);  
            }
        }
    if (auth?.usuario) {
      check();
    }
  }, [auth?.usuario]);

  //Estilizar pacman
  return ok ? <Outlet /> : <PacmanLoader color="#800000" />;
}
