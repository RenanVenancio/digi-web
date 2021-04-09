import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-rainbow-components";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";

// import { Container } from './styles';

function AddressList() {
  const [addressList, setAddressList] = useState([]);
  const { authenticatedUser } = useContext(ApplicationContext);

  useEffect(() => {
    if (
      !(
        authenticatedUser === null ||
        typeof authenticatedUser === "undefined" ||
        Object.keys(authenticatedUser).length === 0
      )
    ) {
      Api.get(`/adresses/`).then((response) => {
        setAddressList(response.data);
      });
    }
  }, []);

  return (
    <>
      {addressList.map((i) => (
        <Card
          key={i.id}
          style={{ margin: "10px" }}
          title={i.street}
          footer={
            <>
              <div className="rainbow-align-content_space-between">
                <p>{i.zipcode}</p>
                <p>
                  {i.city} - {i.state}
                </p>
                <p>{i.neighborhood}</p>
              </div>
              <div className="rainbow-align-content_space-between">
                <p>{i.complement}</p>
              </div>
            </>
          }
        ></Card>
      ))}
    </>
  );
}

export default AddressList;
