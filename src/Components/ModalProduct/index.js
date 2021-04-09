import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button, ButtonIcon, Input, Modal, Spinner } from "react-rainbow-components";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api, baseURL } from "../../Services/Api";
import { Container, FooterContainer, Image, QuantityContainer, Row, Subtotal } from "./styles";

function ModalProduct(props) {
  const { addProductInCheckout } = useContext(ApplicationContext);
  const [isOpen, setIsopen] = useState(true);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  function handleOnClose() {
    setIsopen(false);
  }

  useEffect(() => {
    loadProducts(props.id);
  }, [props.id]);

  useEffect(() => {
    setIsopen(!isOpen);
  }, [props.isOpen]);

  function changeQuantity(value) {
    if (quantity + value > 0) {
      setQuantity(quantity + value);
    }
  }

  async function loadProducts(id) {
    if (!(id === undefined)) {
      await Api.get(`${props.company}/products/${id}`).then((result) => {
        setProduct(result.data);
      });
    }
  }

  function saveInStorage() {
    let newProduct = product;
    product["quantity"] = quantity;
    addProductInCheckout(newProduct);
    setIsopen(!isOpen);
    setQuantity(1);
  }

  return (
    <Modal
      isOpen={isOpen}
      size="large"
      onRequestClose={handleOnClose}
      title={product.name}
      footer={
        <FooterContainer>
          <QuantityContainer style>
            <ButtonIcon
              variant="brand"
              icon={<FaChevronLeft />}
              onClick={() => changeQuantity(-1)}
            />
            <Input value={quantity} />
            <ButtonIcon
              variant="brand"
              icon={<FaChevronRight />}
              onClick={() => changeQuantity(1)}
            />
          </QuantityContainer>
          <Subtotal>
            <small>R$</small>
            {(quantity * product.salePrice).toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </Subtotal>
          <Button
            label="Colocar no carrinho"
            variant="brand"
            onClick={() => saveInStorage()}
          />
        </FooterContainer>
      }
    >
      <Container>
        <Row>
          <Image
            src={
              product.attachment === undefined ? (
                <Spinner />
              ) : (
                `${baseURL}/${product.company}/attachments/${product.attachment}`
              )
            }
          />
        </Row>
        <p>{product.description}</p>
      </Container>
    </Modal>
  );
}

export default ModalProduct;
