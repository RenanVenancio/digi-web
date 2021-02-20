import React from "react";
import CompanyForm from "../../Components/CompanyForm";
import ContextLoader from "../../Components/ContextLoader";

function Company(props) {

  return (
    <>
      <ContextLoader company={props.match.params.company} />
      <CompanyForm company={props.match.params.company} />
    </>
  );
}

export default Company;
