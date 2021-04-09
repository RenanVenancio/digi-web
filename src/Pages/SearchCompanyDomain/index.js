import React from "react";

import CompanySearchCard from "../../Components/CompanySearchCard";

// import { Container } from './styles';

function SearchCompanyDomain() {
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center",  height: "100vh" }}> 
      <CompanySearchCard />
    </div>
  );
}

export default SearchCompanyDomain;
