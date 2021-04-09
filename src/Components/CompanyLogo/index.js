import React, { useContext, useEffect, useState } from "react";

import digishop from "../../Assets/digishopcolor.png";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api, baseURL } from "../../Services/Api";
import { Image } from "./styles";

function CompanyLogo({ width }) {
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
      width={width}
      src={
        companyData.logo === undefined || companyData.logo === null
          ? digishop
          : `${baseURL}/${company}/attachments/${companyData.logo}`
      }
    />
  );
}

export default CompanyLogo;
