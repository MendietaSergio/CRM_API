import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
export const Messaje = () => {
  return (
    <div className="alert alert-success">
      <div className="info-login">
        <div>Usuario:</div>
        <div>crm@gmail.com</div>
        <div>
          <CopyToClipboard text={"crm@gmail.com"}>
            <i
              className="fas fa-copy"
              onClick={() => navigator.clicpboard.writeText("asde")}
            ></i>
          </CopyToClipboard>
        </div>
      </div>
      <div className="info-login">
        <div>Contraseña:</div>
        <div>1234</div>
        <div>
          <CopyToClipboard text={"1234"}>
            <i className="fas fa-copy"></i>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};
