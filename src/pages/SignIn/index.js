import React, { useState, useContext, useEffect } from "react";
import "./styles.css";
import logo from "../../assets/StockLogo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/contexts/authContext";

export default function SignIn({ history }) {
  const { signIn, isUserLogged } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isUserLogged) {
      history.push("/home");
    }
  }, [isUserLogged]);

  const login = async (event) => {
    event.preventDefault();
    await signIn(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img src={logo} alt="logo" width="200" />
        <p>Entrar em meu estoque</p>
        <form className="form" onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button type="submit">Entrar</button>
        </form>

        <p>Não possui uma conta</p>
        <Link to="/signup">Cadastre-se</Link>
      </div>
    </div>
  );
}
