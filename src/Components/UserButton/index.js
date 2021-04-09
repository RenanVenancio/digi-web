import React, { useContext, useEffect, useState } from "react";
import { FaCartArrowDown, FaUser, FaUserEdit } from "react-icons/fa";
import { ButtonMenu, MenuItem } from "react-rainbow-components";
import { Link } from "react-router-dom";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import LoginModal from "../LoginModal";

function UserButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { company, authenticatedUser } = useContext(
    ApplicationContext
  );

  useEffect(() => {}, [authenticatedUser]);

  const onRequestCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <LoginModal isOpen={modalIsOpen} onRequestClose={onRequestCloseModal} />
      <ButtonMenu
        menuAlignment="right"
        menuSize="medium"
        buttonVariant="brand"
        icon={<FaUser size={26} />}
      >
        <Link
          to={`
              ${company == "" ? `/users/user` : `/${company}/users/user`}
            `}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <MenuItem icon={<FaUserEdit />} label="Meus dados" />
        </Link>
        <Link
          to={`/${company}/orders`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <MenuItem icon={<FaCartArrowDown />} label="Meus Pedidos" />
        </Link>
      </ButtonMenu>
    </>
  );
}

export default UserButton;
