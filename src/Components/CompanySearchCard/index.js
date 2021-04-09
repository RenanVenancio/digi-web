import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ButtonIcon, Card, Input } from "react-rainbow-components";
import { Link } from "react-router-dom";

import digishop from "../../Assets/digishopcolor.png";
import shopapp from "../../Assets/shop-app.svg";
import { Api } from "../../Services/Api";
import { Image, Row } from "./styles";

function CompanySearchCard() {
  const [searchValue, setSearchValue] = useState("");
  const [companies, setCompanies] = useState({ content: [] });

  const loadCompanies = async () => {
    await Api.get(`companies?domain=${searchValue}`).then((response) => {
      setCompanies(response.data);
    });
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const inputStyles = {
    flex: 1,
    padding: "20px",
    paddingRight: "2px",
  };

  return (
    <>
      <Card
        style={{ width: "500px", marginLeft: "auto", marginRight: "auto" }}
        children={
          <>
            <Row center>
              <Image src={digishop} width={150} />
            </Row>
            <Row>
              <Input
                style={inputStyles}
                value={searchValue}
                hideLabel
                onChange={handleChange}
                placeholder="seudominio.com"
                iconPosition="right"
              />
              <ButtonIcon
                icon={<FaSearch />}
                onClick={loadCompanies}
                style={{
                  marginTop: "20px",
                  marginLeft: "5px",
                  marginRight: "20px",
                }}
                variant="border-filled"
                tooltip="Buscar"
              />
            </Row>
          </>
        }
        footer={
          companies.content.length === 0 ? (
            <Image src={shopapp} width={200} height={200} />
          ) : (
            companies.content.map((item) => (
              <Link to={`/${item.domain}/admin/login/`}>
                <Card style={{ marginBottom: "3px" }} title={item.domain} />
              </Link>
            ))
          )
        }
      />
    </>
  );
}

export default CompanySearchCard;
