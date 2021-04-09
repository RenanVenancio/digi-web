import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import CardDashboard from "../CardDashboard";

// import { Container } from './styles';

function OrderStatusCard({ status, startDate, endDate, title, icon }) {
  const { company } = useContext(ApplicationContext);
  const [cardData, setCardData] = useState(0);

  useEffect(async () => {await loadData()}, [company]);

  const loadData = async () => {
    if (company !== "") {
      await Api.get(`${company}/order/countStatus?status=${status}&startDate=${startDate}&endDate=${endDate}`).then(
        (response) => {
          setCardData(response.data.count);
        }
      );
    }
  };

  return <CardDashboard title={title} icon={icon} value={cardData} />;
}

OrderStatusCard.propTypes = {
  satus: PropTypes.number,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.object,
};

OrderStatusCard.defaultProps = {
  satus: 0,
  startDate: new Date().setHours(0,0,0,0),
  endDate: new Date().setHours(23,59,59,999),
  title: "Pedidos",
  icon: {},
};

export default OrderStatusCard;
