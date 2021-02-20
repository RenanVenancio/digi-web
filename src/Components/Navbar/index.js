import React, { useContext } from "react";
import { Nav, Row } from "./styles";
import ShoppingBagButton from "../ShoppingBagButton";
import CompanyLogo from "../CompanyLogo";
import GlobalSearchInput from "../GlobalSearchInput";
import UserButton from "../UserButton";
import { Link } from "react-router-dom";
import { ApplicationContext } from "../../Contexts/ApplicationContext";

function Navbar() {
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
    </>
  );
}

export default Navbar;
