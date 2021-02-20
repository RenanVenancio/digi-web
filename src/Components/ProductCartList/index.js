import React, { useContext } from "react";
import { Table, Column, ButtonIcon } from "react-rainbow-components";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { FaTrash } from "react-icons/fa";
import OrderSubTotal from "../OrderSubTotal";
import ProductImage from "../ProductImage";
import { TableFooter, Col, Row } from "./styles";
import ProductCounter from "../ProductCounter";

export default function ProductCartList({ otherCosts }) {
  const { checkoutProducts, removeProductInCheckoutById } = useContext(
    ApplicationContext
  );

  function DeleteIcon(props) {
    const { row, onDeleteElement } = props;

    return (
      <ButtonIcon
        onClick={() => onDeleteElement(row.id)}
        buttonSize="small"
        icon={<FaTrash />}
      />
    );
  }

  function handleDeleteElement(id) {
    removeProductInCheckoutById(id);
  }

  return (
    <>
      <Table
        id="table-5"
        keyField="id"
        isLoading={false}
        data={checkoutProducts === undefined ? [] : checkoutProducts.products}
        emptyTitle="Sua sacola de compras está vazia."
        emptyDescription="Por enquanto :)"
        variant="default"
      >
        <Column
          width={160}
          component={({ row }) => <ProductImage id={row.attachment} />}
        />
        <Column header="Descrição" field="name" />
        <Column
          header="Quantidade"
          field="quantity"
          width={160}
          component={({ row }) => <ProductCounter product={row} />}
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
        <Column
          width={60}
          component={({ row }) => (
            <DeleteIcon row={row} onDeleteElement={handleDeleteElement} />
          )}
        />
      </Table>
      <TableFooter>
        <Row justify="end">
          <Col justify="flex-end">
            <OrderSubTotal otherCosts={otherCosts} />
          </Col>
        </Row>
      </TableFooter>
    </>
  );
}
