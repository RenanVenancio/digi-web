import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Image, Card, Titile, Container } from "./styles";
import { Api, baseURL } from "../../Services/Api";
import { Link } from "react-router-dom";
import { ApplicationContext } from "../../Contexts/ApplicationContext";

export default function CategoriesList() {
  const { company } = useContext(ApplicationContext);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    loadCaregories();
  }, [company]);

  async function loadCaregories() {
    if(company !== "") {
      await Api.get(`${company}/product/categories/`).then(
        (result) => {
          setCategoriesList(result.data);
        }
      );
    }
  }

  return (
    <Container>
      {categoriesList.map((i) => (
        <Link
          key={i.id}
          to={`productsearch?category=${i.id}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Card>
            <Col>
              <Row center>
                <Image
                  src={`${baseURL}/${i.company}/attachments/${i.attachment}`}
                />
              </Row>
              <Col padding={10}>
                <Row>
                  <Titile>{i.name}</Titile>
                </Row>
              </Col>
            </Col>
          </Card>
        </Link>
      ))}
    </Container>
  );
}
