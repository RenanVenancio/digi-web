import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { FaChartPie } from "react-icons/fa";
import { Avatar, Card, Chart, Dataset } from "react-rainbow-components";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";

// import { Container } from './styles';

function DashboardChart({ startDate, endDate }) {
  const { company } = useContext(ApplicationContext);

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(async () => {
    await loadData();
  }, [company]);

  const loadData = async () => {
    if (company !== "") {
      await Api.get(
        `${company}/order/orderTotals?startDate=${startDate}&endDate=${endDate}`
      ).then((response) => {
        let labels = response.data.map((i) => i.day);
        setChartLabels(labels);

        let data = response.data.map((i) => i.value);
        setChartData(data);
      });
    }
  };

  return (
    <Card 
    
    icon={<Avatar icon={<FaChartPie />} />}
    title="Comparativo de Vendas"
      children={
        <Chart type="bar" labels={chartLabels}>
          <Dataset
            key="Vendas"
            title="Vendas"
            values={chartData}
            backgroundColor="#01b6f5"
          />
        </Chart>
      }
    />
  );
}

DashboardChart.propTypes = {
  startDate: PropTypes.number,
  endDate: PropTypes.number,
};

DashboardChart.defaultProps = {
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).setHours(
    0,
    0,
    0,
    0
  ),
  endDate: new Date().setHours(23, 59, 59, 999),
};

export default DashboardChart;
