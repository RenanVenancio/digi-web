import React, { useContext, useEffect } from "react";

import CategoriesList from "../../Components/CategoriesList";
import { ApplicationContext } from "../../Contexts/ApplicationContext";

export default function Main(props) {
  const { setCompany } = useContext(ApplicationContext);

  useEffect(() => {
    setCompany(props.match.params.company);
  }, [props, setCompany]);

  return (
    <>
      <CategoriesList company={props.match.params.company} width={800} />
    </>
  );
}
