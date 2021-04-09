import React, { useContext, useEffect } from "react";

import { ApplicationContext } from "../../Contexts/ApplicationContext";

// import { Container } from './styles';

// RESPONSÁVEL POR ATUALIZAR O CONTEXTO GLOBAL DA APLICAÇÃO
function ContextLoader({ company }) {
  const {
    updateCheckoutProducts,
    setCompany,
    updateClientDataStorage,
  } = useContext(ApplicationContext);

  useEffect(() => {
    setCompany(company);
    updateCheckoutProducts(company);
    updateClientDataStorage();
  }, [company]);

  return null;
}

export default ContextLoader;
