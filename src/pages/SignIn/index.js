import React from "react";
import "./styles.css";
import logo from "../../assets/StockLogo.png";

export default function SignIn() {
  return (
    <div className="login-container">
      <div className="login-content">
        <img src={logo} alt="logo" width="200" />
        <p>Entrar em meu estoque</p>
        <div className="form">
          <input placeholder="Email" />
          <input placeholder="Senha" />
          <button>Entrar</button>
        </div>

        <p>Não possui uma conta</p>
        <a href="/">Cadastre-se</a>
      </div>
    </div>
  );
}
