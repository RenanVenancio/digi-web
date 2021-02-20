import React, { useContext, useState, useEffect } from "react";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import { Card } from "react-rainbow-components";
import { FaLocationArrow, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Row, Col } from "./styles";

function CompanyLocation() {
  const { company } = useContext(ApplicationContext);
  const [companyData, setCompanyData] = useState({
    id: 2,
    domain: "",
    cpfCnpj: "",
    name: "",
    email: "",
    isActive: null,
    address: {
      id: null,
      street: "",
      neighborhood: "",
      complement: "",
      zipcode: "",
      city: "",
      state: "",
      deliveryArea: null,
    },
    user: null,
    phones: [],
  });

  useEffect(() => {
    loadCompany();
  }, [company]);

  async function loadCompany() {
    await Api.get(`${company}/companies/`).then((result) => {
      console.log(result.data);
      setCompanyData(result.data);
    });
  }

  return (
    <div className="rainbow-m-around_large">
      <Card icon={<FaLocationArrow />} title={companyData.name}>
        <div className="rainbow-p-around_xx-large rainbow-align-content_start rainbow-flex_column">
          <Row>
            <Col center width="30px">
              <FaMapMarkerAlt size="16" />
            </Col>
            <Row>
              <Col>
                <p>{`${companyData.address.street} ${companyData.address.neighborhood} - ${companyData.address.city}-${companyData.address.state}`}</p>
                <p>{companyData.address.complement}</p>
              </Col>
            </Row>
          </Row>
          <Row marginTop={10}>
            <Col center width="30px">
              <FaPhone size="16" />
            </Col>
            <Row>
              <Col>
                {companyData.phones.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </Col>
            </Row>
          </Row>
        </div>
      </Card>
    </div>
  );
}

export default CompanyLocation;
