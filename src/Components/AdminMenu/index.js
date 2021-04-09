import React, { useContext, useState } from "react";
import { FaBoxes, FaCashRegister, FaChartPie, FaPowerOff, FaStore } from "react-icons/fa";
import { VerticalItem, VerticalNavigation, VerticalSection } from "react-rainbow-components";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import CompanyLogo from "../CompanyLogo";
import { Row } from "./styles";

// import { Container } from './styles';

function AdminMenu({ children }) {
  const [selectedItem, setSelectedItem] = useState();
  const [leftContentMargin, setLeftContentMargin] = useState(160);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const { company, logoff } = useContext(ApplicationContext);
  const handleOnSelect = (event, item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
    Swal.fire({
      title: `Deseja realmente sair?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        logoff();
        setRedirectLogin(true);
      } else if (result.isDenied) {
      }
    });
  };

  return (
    <Row style={{ height: "100%" }}>
      {redirectLogin ? (
        <Redirect to={{ pathname: `/${company}/admin/login/` }} />
      ) : (
        ""
      )}
      <VerticalNavigation
        style={{
          overflow: "hidden",
          backgroundColor: "#fff",
          position: "fixed",
          height: "100%",
          width: "150px",
          zIndex: "99999",
        }}
        compact
        selectedItem={selectedItem}
        onSelect={handleOnSelect}
      >
        <VerticalSection>
          <Row
            center
            style={{ marginBottom: "10px", borderBottom: "solid 1px #e8e8e8" }}
          >
            <CompanyLogo width="100px" />
          </Row>
          <Link
            to={`/${company}/admin/dashboard/`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <VerticalItem
              name="item-1"
              label="Dashboard"
              icon={<FaChartPie />}
            />
          </Link>
          <Link
            to={`/${company}/admin/products/`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <VerticalItem name="item-2" label="Produtos" icon={<FaBoxes />} />
          </Link>
          <Link
            to={`/${company}/admin/company/edit/`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <VerticalItem name="item-3" label="Empresa" icon={<FaStore />} />
          </Link>
          <Link
            to={`/${company}/admin/orders/`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <VerticalItem
              name="item-4"
              label="Pedidos"
              icon={<FaCashRegister />}
            />
          </Link>
          <VerticalItem
            name="item-5"
            label="Sair"
            onClick={handleLogout}
            icon={<FaPowerOff />}
          />
        </VerticalSection>
      </VerticalNavigation>

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
          margin: "10px",
          marginLeft: leftContentMargin,
          float: "right",
          overflow: "vertical",
        }}
      >
        {children}
      </div>
    </Row>
  );
}

export default AdminMenu;
