import React from "react";
import { Application } from "react-rainbow-components";

import ApplicationProvider from "./Contexts/ApplicationContext";
import Routes from "./routes";
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
    <Application theme={theme} style={{height: "100%"}}>
      <ApplicationProvider>
        <GlobalStyle />
        <Routes />
      </ApplicationProvider>
    </Application>
  );
}

export default App;
