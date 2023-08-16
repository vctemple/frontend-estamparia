import { useState, useContext, createContext } from "react";

const AuthContexto = createContext();

const ProvideAuth = ({ children }) => {
    const [auth, setAuth] = useState({
        usuario: null,
        token: "",
    });
    return (
        <AuthContexto.Provider value={[auth, setAuth]}>
            {children}
        </AuthContexto.Provider>
    );
};

const useAuth = () => useContext(AuthContexto);

export { useAuth, ProvideAuth };