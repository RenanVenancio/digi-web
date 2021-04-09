import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { FaBoxOpen, FaCheck, FaMoneyBill } from "react-icons/fa";
import { Avatar } from "react-rainbow-components";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import CardDashboard from "../CardDashboard";
import { Row } from "./styles";

function DashboardCardList({ startDate, endDate }) {
  const { company } = useContext(ApplicationContext);
  const [cardsData, setCardsData] = useState({
    open: 0,
    finished: 0,
    totals: 0,
    sent: 0,
    open: 0,
  });
  useEffect(async () => {
    await loadData();
  }, [company]);
  const loadData = async () => {
    if (company !== "") {
      await Api.get(
        `${company}/order/orderStatistics?startDate=${startDate}&endDate=${endDate}`
      ).then((response) => {
        setCardsData(response.data);
      });
    }
  };

  return (
    <Row align={"space-between"}>
      <CardDashboard
        title={"Vendas"}
        icon={<Avatar icon={<FaMoneyBill />} />}
        value={
          "R$" +
          cardsData.totals.toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })
        }
      />
      <CardDashboard
        title={"Pedidos Abertos"}
        icon={<Avatar icon={<FaBoxOpen />} />}
        value={cardsData.open}
      />
      <CardDashboard
        title={"Pedidos Finalizados"}
        icon={<Avatar icon={<FaCheck />} />}
        value={cardsData.finished}
      />
    </Row>
  );
}

DashboardCardList.propTypes = {
  startDate: PropTypes.number,
  endDate: PropTypes.number,
};

DashboardCardList.defaultProps = {
  startDate: new Date().setHours(0, 0, 0, 0),
  endDate: new Date().setHours(23, 59, 59, 999),
};

export default DashboardCardList;
