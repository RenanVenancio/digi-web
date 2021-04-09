import React, { useContext, useEffect, useState } from "react";
import { FaBoxes, FaEdit, FaPlus } from "react-icons/fa";
import { Avatar, ButtonIcon, Card, Column, Pagination, Table } from "react-rainbow-components";
import { Link } from "react-router-dom";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import ProductImage from "../ProductImage";
import { Col, Description, Price, Titile } from "./styles";

function ProductList() {
  const [productListData, setProductListData] = useState({
    content: [],
    last: true,
    totalPages: 1,
    totalElements: 3,
    number: 0,
    size: 24,
    first: true,
    numberOfElements: 0,
    empty: false,
  });
  const [currentPage, setCurrentPage] = useState({ currentPage: 0 });
  const [loading, setLoading] = useState(true);

  const {
    company,
    authenticatedUser,
    globalSearch,
    setShowGlobalSearch,
  } = useContext(ApplicationContext);

  useEffect(() => {
    if (company !== "") {
      setShowGlobalSearch(true);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authenticatedUser.token,
        },
      };
      Api.get(
        `${company}/products/?page=${currentPage.currentPage}&name=${globalSearch}`,
        options
      ).then((response) => {
        setProductListData(response.data);
        setLoading(false);
      });
    }
  }, [company, currentPage, globalSearch]);

  const handleOnChange = (event, page) => {
    setCurrentPage({ currentPage: page - 1 });
  };

  const cardStyle = {
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <>
      <Card
        style={cardStyle}
        className="rainbow-p-bottom_xx-large"
        icon={<Avatar icon={<FaBoxes />} />}
        title="Produtos"
        actions={
          <Link to={`/${company}/admin/products/product/`}>
            <ButtonIcon
              variant="border"
              tooltip="Cadastrar um novo item"
              icon={<FaPlus />}
            />
          </Link>
        }
        children={
          <div className="rainbow-m-bottom_xx-large">
            <Table
              keyField="id"
              isLoading={loading}
              pageSize={productListData.numberOfElements}
              data={productListData.content}
            >
              <Column header="#ID" field="id" width={80} />
              <Column
                width={130}
                component={({ row }) => <ProductImage id={row.attachment} />}
              />
              <Column
                header="Nome"
                component={({ row }) => (
                  <Col>
                    <Titile>{row.name}</Titile>
                    <Description style={{paddingTop: "0px"}}>{row.description}</Description>
                    <Price>R${row.salePrice}</Price>
                  </Col>
                )}
              />
              <Column
                width={60}
                component={({ row }) => (
                  <div className="rainbow-p-right_large">
                    <Link to={`/${company}/admin/products/product/${row.id}`}>
                      <ButtonIcon variant="neutral" icon={<FaEdit />} />
                    </Link>
                  </div>
                )}
              ></Column>
            </Table>
          </div>
        }
        footer={
          <Pagination
            className="rainbow-m_auto"
            pages={productListData.totalPages}
            activePage={currentPage.currentPage + 1}
            onChange={handleOnChange}
          />
        }
      />
    </>
  );
}

export default ProductList;
