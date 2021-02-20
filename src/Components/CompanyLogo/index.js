import React, { useContext, useEffect, useState } from "react";
import { Api, baseURL } from "../../Services/Api";
import { Image } from "./styles";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import digishopwhite from "../../Assets/digishopwhite.png";

function CompanyLogo() {
  const { company } = useContext(ApplicationContext);
  const [companyData, setCompanyData] = useState({});
  useEffect(() => {
    if (company !== "") {
      Api.get(`${company}/companies/`).then((result) => {
        setCompanyData(result.data);
      });
    }
  }, [company]);
  return (
    <Image
      src={
        companyData.logo === undefined || companyData.logo === null
          ? digishopwhite
          : `${baseURL}/${company}/attachments/${companyData.logo}`
      }
    />
  );
}

export default CompanyLogo;
