import React from "react";
import { Table, Column, ButtonIcon } from "react-rainbow-components";
import OrderSubtotal from "../OrderSubTotal";
import ProductImage from "../ProductImage";
import { TableFooter, Col, Row } from "./styles";

function OrderItens({ itens, total }) {
  return (
    <>
      <Table
        id="order-itens"
        keyField="id"
        isLoading={false}
        data={itens}
        emptyTitle="Sua sacola de compras está vazia."
        emptyDescription="Por enquanto :)"
        variant="default"
      >
        <Column
          width={160}
          component={({ row }) => <ProductImage id={row.attachment} />}
        />
        <Column
          header="Descrição"
          field="name"
          component={({ row }) => (
            <p>{`${row.quantity} X ${row.name}`}</p>
          )}
        />
        <Column header="Valor Unitário" field="salePrice" width={160} />
        <Column
          header="Total"
          width={160}
          style={{ "text-align": "center" }}
          component={({ row }) => (
            <p>
              {(row.quantity * row.salePrice).toLocaleString("pt-br", {
                minimumFractionDigits: 2,
              })}
            </p>
          )}
        />
      </Table>
      <TableFooter>
        <Row justify="end">
          <Col justify="flex-end">
            <Col>
              <Row>Total:</Row>
              <Row>
                <h1 style={{ fontSize: "1.5em" }}>
                  R$
                  {total.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                  })}
                </h1>{" "}
              </Row>
            </Col>
          </Col>
        </Row>
      </TableFooter>
    </>
  );
}

export default OrderItens;
