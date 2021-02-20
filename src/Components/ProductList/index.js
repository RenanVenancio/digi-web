import React, { useContext, useState, useEffect } from "react";
import {
  Table,
  Column,
  Card,
  Avatar,
  Pagination,
} from "react-rainbow-components";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import { FaBoxes } from "react-icons/fa";
import ProductImage from "../ProductImage";
import { Col, Price, Description, Titile } from "./styles";

function ProductList() {
  const [productListData, setProductListData] = useState([]);
  const [currentPage, setCurrentPage] = useState({ currentPage: 0 });
  const [loading, setLoading] = useState(true);
  const { company, authenticatedUser, globalSearch } = useContext(ApplicationContext);

  useEffect(() => {
    if (company !== "") {
      console.log(company);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authenticatedUser.token
            
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
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <>
      <Card
        style={cardStyle}
        icon={<Avatar icon={<FaBoxes />} />}
        title="Produtos"
        children={
          <div className="rainbow-m-bottom_xx-large">
            <Table
              isLoading={loading}
              pageSize={productListData.numberOfElements}
              data={productListData.content}
              keyField="id"
            >
              <Column header="#ID" field="id" width={80} />
              <Column
                width={130}
                component={({ row }) => <ProductImage id={row.attachment} />}
              />
              <Column
                header="Nome"
                component={({row}) => (
                  <Col padding={2}>
                    <Titile>{row.name}</Titile>
                    <Description>{row.description}</Description>
                    <Price>R${row.salePrice}</Price>
                  </Col>
                )}
              />
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
