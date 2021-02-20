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
import { FaCashRegister } from "react-icons/fa";

function OrderList() {
  const [orderListData, setOrderListData] = useState([]);
  const [currentPage, setCurrentPage] = useState({ currentPage: 0 });
  const [loading, setLoading] = useState(true);
  const { company, authenticatedUser } = useContext(ApplicationContext);

  useEffect(() => {
    if (company !== "" &&  "authorization" in authenticatedUser) {
      console.log(authenticatedUser);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authenticatedUser.authorization.token !== null ? authenticatedUser.authorization.token : null
        },
      };
      Api.get(
        `${company}/order/?page=${currentPage.currentPage}`,
        options
      ).then((response) => {
        setOrderListData(response.data);
        setLoading(false);
      });
    }
  }, [company, currentPage]);

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
        icon={<Avatar icon={<FaCashRegister />} />}
        title="Seus Pedidos"
        children={
          <div className="rainbow-m-bottom_xx-large">
            <Table
              isLoading={loading}
              pageSize={orderListData.numberOfElements}
              data={orderListData.content}
              keyField="id"
            >
              <Column width={90} header="#ID" field="id" />
              <Column
                width={120}
                header="Data"
                component={({ row }) => (
                  <p>{new Date(row.creationDate).toLocaleDateString()}</p>
                )}
              />
              <Column header="Cliente" field="client.name" />
              <Column header="Endereço" field="address.street" />
              <Column header="Total" field="total" />
            </Table>
          </div>
        }
        footer={
          <Pagination
            className="rainbow-m_auto"
            pages={orderListData.totalPages}
            activePage={currentPage.currentPage + 1}
            onChange={handleOnChange}
          />
        }
      />
    </>
  );
}

export default OrderList;
