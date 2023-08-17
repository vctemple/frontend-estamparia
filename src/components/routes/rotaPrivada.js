import { useState, useEffect } from "react";
import { UseAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { PacmanLoader } from "react-spinners";

export default function RotaPrivada () {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = UseAuth();

    useEffect(() => {
        const check = async() => {
            const res = await axios.get(`http://localhost:3001/api/v1/auth/auth-login`, 
            {
                headers:{
                    Authorization: auth?.token,
                },
            });
            if(res.data.ok){
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if(auth?.token){
            check();
        }
            
    }, [auth?.token]);

    return ok ? <Outlet/> : <PacmanLoader color="#800000" />
}