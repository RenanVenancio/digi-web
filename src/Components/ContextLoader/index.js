import React, { useEffect, useContext } from "react";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
// import { Container } from './styles';

// RESPONSÁVEL POR ATUALIZAR O CONTEXTO GLOBAL DA APLICAÇÃO
function ContextLoader({ company }) {
  const { updateCheckoutProducts, setCompany, loadUser } = useContext(
    ApplicationContext
  );

  useEffect(() => {
    console.log(company)
    loadUser();
    setCompany(company);
    updateCheckoutProducts(company);
  }, [company]);

  return null;
}

export default ContextLoader;
