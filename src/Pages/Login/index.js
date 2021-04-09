import React from "react";
import { Card } from "react-rainbow-components";

import CompanyLogo from "../../Components/CompanyLogo";
import LoginForm from "../../Components/LoginForm";

// import { Container } from './styles';

function Login(props) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        children={
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <CompanyLogo width={180} />
            </div>
            <LoginForm onRequestLogin={null} redirectTo="admin/dashboard/" />
          </>
        }
      />
    </div>
  );
}

export default Login;
