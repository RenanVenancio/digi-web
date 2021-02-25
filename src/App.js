import React from "react";
import Routes from "./routes";
import { Application } from "react-rainbow-components";
import ApplicationProvider from "./Contexts/ApplicationContext";
import GlobalStyle from "./Styles/GlobalStyle";

function App() {
  const theme = {
    rainbow: {
      palette: {
        brand: "#01B6F5",
      },
    },
  };

  return (
    <Application theme={theme}>
      <GlobalStyle />
      <ApplicationProvider>
        <Routes />
      </ApplicationProvider>
    </Application>
  );
}

export default App;
