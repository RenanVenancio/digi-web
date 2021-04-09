import React from "react";

import CompanyForm from "../../Components/CompanyForm";

function Company(props) {
  return (
    <>
      <CompanyForm company={props.match.params.company} />
    </>
  );
}

export default Company;
