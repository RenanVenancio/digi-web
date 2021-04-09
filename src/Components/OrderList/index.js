import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { FaCashRegister, FaFolderOpen } from "react-icons/fa";
import { Avatar, ButtonIcon, Card, Column, Pagination, Table } from "react-rainbow-components";
import { Link } from "react-router-dom";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";

function OrderList({ adminPerspective }) {
  const [orderListData, setOrderListData] = useState({
    content: [],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      unpaged: false,
      paged: true,
    },
    last: true,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 0,
    first: true,
    numberOfElements: 0,
    empty: false,
  });
  const [currentPage, setCurrentPage] = useState({ currentPage: 0 });
  const [loading, setLoading] = useState(true);
  const { company, clientCheckoutData } = useContext(ApplicationContext);

  useEffect(() => {
    if (company !== "") {
      if (adminPerspective) {
        Api.get(`${company}/order/?page=${currentPage.currentPage}&direction=DESC`).then(
          (response) => {
            setOrderListData(response.data);
            setLoading(false);
          }
        );
      } else {
        Api.get(
          `${company}/order/client/${clientCheckoutData.id}?page=${currentPage.currentPage}&direction=DESC`
        ).then((response) => {
          setOrderListData(response.data);
          setLoading(false);
        });
      }
    }
  }, [company, currentPage]);

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
        icon={<Avatar icon={<FaCashRegister />} />}
        title="Seus Pedidos"
        children={
          <div className="rainbow-m-bottom_xx-large">
            <Table
              isLoading={loading}
              pageSize={orderListData.numberOfElements}
              data={orderListData.content}
              keyField={"id"}
            >
              <Column width={80} header="#ID" field="id" />
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
              <Column
                width={60}
                component={({ row }) => (
                  <div className="rainbow-p-right_large">
                    <Link to={`${adminPerspective === false ? `/${company}/orders/order/${row.id}/` : `/${company}/admin/orders/order/${row.id}`}`}>
                      <ButtonIcon variant="neutral" icon={<FaFolderOpen />} />
                    </Link>
                  </div>
                )}
              />
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

OrderList.propTypes = {
  adminPerspective: PropTypes.bool,
};

OrderList.defaultProps = {
  adminPerspective: false,
};

export default OrderList;
