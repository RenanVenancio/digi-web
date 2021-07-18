import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-rainbow-components";

import empty from "../../Assets/empty.svg";
import ModalProduct from "../../Components/ModalProduct";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api, baseURL } from "../../Services/Api";
import BackgroundImage from "../BackgroundImage";
import DigiCard from "../DigiCard";
import Grid from "../Grid";
import { Card, Col, Container, Description, Image, Price, Row, Titile } from "./styles";

export default function ProductItemList(props) {
  const [loading, setLoading] = useState(true);
  const [productIdForModal, setProductIdForModal] = useState();
  const [productList, setProductList] = useState({ content: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { globalSearch, setShowGlobalSearch } = useContext(ApplicationContext);
  function openModal(productId) {
    setProductIdForModal(productId);
    setModalIsOpen(!modalIsOpen);
  }

  useEffect(() => {
    loadProducts();
    setShowGlobalSearch(true);
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
    <>
      {productList.content.length === 0 && !loading ? (
        <BackgroundImage asset={empty} text="Nada encontrado :(" />
      ) : (
        <Grid>
          <Spinner size="large" variant="brand" isVisible={loading} />
          <ModalProduct
            isOpen={modalIsOpen}
            id={productIdForModal}
            company={props.company}
          />
          {productList.content.map((i) => (
            <DigiCard
              onClick={() => openModal(i.id)}
              key={i.id}
              title={i.name}
              description={i.description}
              price={i.salePrice}
              promotionalPrice={i.promotionalValue}
              imageUrl={`${baseURL}/${props.company}/attachments/${i.attachment}`}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
