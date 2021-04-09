import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "react-rainbow-components";
import { Link } from "react-router-dom";

import digishop from "../../Assets/digishopcolor.png";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api, baseURL } from "../../Services/Api";
import DigiCard from "../DigiCard";
import Grid from "../Grid";

function CompanyList() {
  const [companies, setCompanies] = useState({
    content: [],
    totalPages: 1,
    number: 0,
  });

  const [currentPage, setCurrentPage] = useState({ currentPage: 0 });
  const { globalSearch } = useContext(ApplicationContext);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    await Api.get(
      `/companies?page=${currentPage.currentPage}&name=${globalSearch}`
    ).then((res) => {
      setCompanies(res.data);
    });
  };

  const handleOnChange = (event, page) => {
    setCurrentPage({ currentPage: page - 1 });
  };

  const getLogo = (company) => {
    if (typeof company.logo !== "undefined" && company.logo !== null) {
      return `${baseURL}/${company.domain}/attachments/${company.logo}`;
    } else {
      return digishop;
    }
  };

  return (
    <>
      <Grid>
        {companies.content.map((i) => (
          <Link
            key={i.id}
            to={`/${i.domain}/`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <DigiCard key={i.id} title={i.name} imageUrl={getLogo(i)} />
          </Link>
        ))}
      </Grid>
      <Pagination
        style={{ marginBottom: "0px !important", marginTop: "auto !important" }}
        className="rainbow-m_auto"
        pages={companies.totalPages}
        activePage={currentPage.currentPage + 1}
        onChange={handleOnChange}
      />
    </>
  );
}
export default CompanyList;
