import React, { useEffect, useContext } from "react";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
// import { Container } from './styles';

// RESPONSÁVEL POR ATUALIZAR O CONTEXTO GLOBAL DA APLICAÇÃO
function ContextLoader({ company }) {
  const { updateCheckoutProducts, setCompany,updateUserInState } = useContext(
    ApplicationContext
  );

  useEffect(() => {
    setCompany(company);
    updateCheckoutProducts(company);
    updateUserInState()
  }, [company]);

  return null;
}

export default ContextLoader;
