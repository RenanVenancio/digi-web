import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import CompanyLogo from "../CompanyLogo";
import GlobalSearchInput from "../GlobalSearchInput";
import ShoppingBagButton from "../ShoppingBagButton";
import UserButton from "../UserButton";
import { Nav, Row } from "./styles";

function Navbar({ children }) {
  const { company } = useContext(ApplicationContext);
  return (
    <>
      <Nav>
        <Link
          to={"/" + company + "/"}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <CompanyLogo />
        </Link>
        <Row>
          <GlobalSearchInput />
          <UserButton />
          <Link
            to={`/${company}/finish`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ShoppingBagButton />
          </Link>
        </Row>
      </Nav>
      <div className="ppp" style={{ paddingTop: "85px", paddingLeft: "20px", paddingRight: "20px", paddingBottom: "20px" }}>{children}</div>
    </>
  );
}

export default Navbar;
