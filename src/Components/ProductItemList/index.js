import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Image,
  Row,
  Titile,
  Col,
  Description,
  Price,
  Container,
} from "./styles";
import { Api, baseURL } from "../../Services/Api";
import { Spinner } from "react-rainbow-components";
import ModalProduct from "../../Components/ModalProduct";
import { ApplicationContext } from "../../Contexts/ApplicationContext";

export default function ProductItemList(props) {
  const [loading, setLoading] = useState(true);
  const [productIdForModal, setProductIdForModal] = useState();
  const [productList, setProductList] = useState({ content: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { globalSearch, setShowProductSearch } = useContext(ApplicationContext);
  function openModal(productId) {
    setProductIdForModal(productId);
    setModalIsOpen(!modalIsOpen);
  }

  useEffect(() => {
    loadProducts();
    setShowProductSearch(true);
  }, [globalSearch]);

  async function loadProducts() {
    await Api.get(
      `${props.company}/products/${props.category}&name=${globalSearch}`
    ).then((result) => {
      setProductList(result.data);
      setLoading(false);
    });
  }

  return (
    <Container>
      <Spinner size="large" variant="brand" isVisible={loading} />
      <ModalProduct
        isOpen={modalIsOpen}
        id={productIdForModal}
        company={props.company}
      />
      {productList.content.map((i) => (
        <Card onClick={() => openModal(i.id)} key={i.id}>
          <Col>
            <Row center>
              <Image
                src={`${baseURL}/${props.company}/attachments/${i.attachment}`}
              />
            </Row>
            <Col padding={10}>
              <Titile>{i.name}</Titile>
              <Description>{i.description}</Description>
              <Price>R${i.salePrice}</Price>
            </Col>
          </Col>
        </Card>
      ))}
    </Container>
  );
}
