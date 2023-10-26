import { useState, useEffect, useContext, createContext } from "react";

//CRIAÇÃO DE CONTEXTO PARA PERSISTÊNCIA DE DADOS DO USUÁRIO LOGADO
//Estrutura do contexto
const AuthContexto = createContext();
const ProvideAuth = ({ children }) => {
    const [auth, setAuth] = useState({
        usuario: null,
        token: "",
    });
 
    //Função para persistir os dados sempre que a página é atualizada
    useEffect(() => { 
        const contexto = sessionStorage.getItem("auth");
        if(contexto) {
            const contextoParsed = JSON.parse(contexto);
            setAuth({
                ...auth,
                usuario: contextoParsed.usuario,
                token: contextoParsed.token,
            });
        }

        //Comando necessário para para a atualização constante o ESlint no browser
        /*eslint-disable-next-line*/
    }, []);
    
    //Retorno do componente
    return (
        <AuthContexto.Provider value={[auth, setAuth]}>
            {children}
        </AuthContexto.Provider>
    );
};

//Para consumo do contexto
const UseAuth = () => useContext(AuthContexto);

export { UseAuth, ProvideAuth };