import React, { useContext, useEffect, useState } from "react";
import { FaCar, FaMotorcycle, FaReceipt } from "react-icons/fa";
import { Avatar, Badge, Card, Input } from "react-rainbow-components";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import OrderItens from "../OrderItens";
import { Row } from "./styles";

function OrderDetailsForm({ id }) {
  const { company } = useContext(ApplicationContext);
  const [orderData, setOrderData] = useState({
    id: 1,
    observation: "",
    client: {
      id: 2,
      name: "",
      email: "",
      phone: "",
      address: [],
    },
    address: {
      id: "",
      street: "",
      neighborhood: "",
      complement: "",
      zipcode: "",
      city: "",
      state: "",
    },
    company: {
      id: "",
      domain: "",
      cpfCnpj: "",
      name: "",
      email: "",
      isActive: true,
      phones: [],
      addresses: [
        {
          id: 1,
          street: "",
          neighborhood: "",
          complement: "",
          zipcode: "",
          city: "",
          state: "",
        },
      ],
      creationDate: "",
      modifiedDate: null,
    },
    itens: [],
    discount: 0.0,
    freightCost: 0.0,
    delivery: true,
    paymentMethod: "",
    change: 0.0,
    creationDate: "",
    modifiedDate: null,
    total: 0.0,
  });

  useEffect(() => {
    loadData();
  }, [company, id]);

  const cardStyle = {
    marginLeft: "auto",
    marginRight: "auto",
  };

  const inputStyles = {
    flex: 1,
    paddingTop: "0px",
    paddingButton: "0px",
    fontWeight: "bold",
  };

  const inputLabelAlign = "left";

  const loadData = async () => {
    if (company !== "" && typeof id !== "undefined") {
      await Api.get(`${company}/order/${id}`).then((response) => {
        setOrderData(response.data);
      });
    }
  };

  return (
    <Card
      style={cardStyle}
      icon={<Avatar icon={<FaReceipt />} />}
      title="Dados do Pedido"
      children={
        <>
          <Row>
            <Input
              id="name"
              readOnly
              labelAlignment={inputLabelAlign}
              name="name"
              label="Nome"
              value={orderData.client.name}
              style={inputStyles}
              type="text"
              className="rainbow-p-around_medium"
            />
            <Input
              id="phone"
              readOnly
              labelAlignment={inputLabelAlign}
              name="phone"
              label="Telefone"
              value={orderData.client.phone}
              style={inputStyles}
              type="text"
              className="rainbow-p-around_medium"
            />
          </Row>
          <Row>
            {orderData.delivery ? (
              <Badge
                style={inputStyles}
                variant="brand"
                title="O pedido deve ser entregue no endereço do cliente."
                className="rainbow-m-around_medium"
              >
                <FaMotorcycle size="23" />
                Entrega Delivery
              </Badge>
            ) : (
              <Badge
                style={inputStyles}
                variant="warning"
                title="O cliente solicitou retirada no estabelecimento."
                className="rainbow-m-around_medium"
              >
                <FaCar size="23" />
                Retirada
              </Badge>
            )}
          </Row>
          <Row>
            <Input
              id="zipcode"
              readOnly
              labelAlignment={inputLabelAlign}
              name="zipcode"
              label="CEP"
              value={orderData.address.zipcode}
              style={inputStyles}
              type="text"
              className="rainbow-p-around_medium"
            />
            <Input
              id="city"
              readOnly
              labelAlignment={inputLabelAlign}
              name="city"
              label="Cidade"
              value={orderData.address.city + "-" + orderData.address.state}
              style={inputStyles}
              type="text"
              className="rainbow-p-around_medium"
            />
          </Row>
          <Row>
            <Input
              id="street"
              readOnly
              labelAlignment={inputLabelAlign}
              name="street"
              label="Endereço"
              value={orderData.address.street}
              style={inputStyles}
              type="text"
              className="rainbow-p-around_medium"
            />
            <Input
              id="complement"
              readOnly
              labelAlignment={inputLabelAlign}
              name="complement"
              label="Complemento"
              value={orderData.address.complement}
              style={inputStyles}
              type="text"
              className="rainbow-p-around_medium"
            />
          </Row>
          <Row>
            <Input
              id="paymentMethod"
              readOnly
              labelAlignment={inputLabelAlign}
              name="paymentMethod"
              label="Forma de Pagamento"
              value={
                orderData.paymentMethod === "CREDIT_CARD"
                  ? "CARTÃO"
                  : "DINHEIRO"
              }
              style={inputStyles}
              type="text"
              className="rainbow-p-around_medium"
            />
            {orderData.paymentMethod == !"CREDIT_CARD" ? (
              <Input
                id="change"
                readOnly
                labelAlignment={inputLabelAlign}
                name="change"
                label="Troco"
                value={orderData.change.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}
                style={inputStyles}
                type="text"
                className="rainbow-p-around_medium"
              />
            ) : null}

            {orderData.delivery ? (
              <Input
                id="freightCost"
                readOnly
                labelAlignment={inputLabelAlign}
                name="freightCost"
                label="Custo de Frete"
                value={orderData.freightCost}
                style={inputStyles}
                type="text"
                className="rainbow-p-around_medium"
              />
            ) : null}
          </Row>
            <OrderItens itens={orderData.itens} total={orderData.total}/>
        </>
      }
    />
  );
}

export default OrderDetailsForm;
