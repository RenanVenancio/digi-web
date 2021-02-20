import React, { useContext, useEffect, useState } from "react";
import {
  ButtonMenu,
  MenuItem,
  RenderIf,
  MenuDivider,
} from "react-rainbow-components";
import {
  FaUser,
  FaStore,
  FaPowerOff,
  FaCartArrowDown,
  FaCashRegister,
  FaIdCard,
  FaBoxes,
  FaUserEdit,
} from "react-icons/fa";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import LoginModal from "../LoginModal";
import { Link } from "react-router-dom";

function UserButton() {
  const { authenticatedUser, updateUserInState, company } = useContext(
    ApplicationContext
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(!modalIsOpen);
  }

  useEffect(() => {
    updateUserInState();
  }, []);

  return (
    <>
      <LoginModal isOpen={modalIsOpen} />
      {authenticatedUser.name}
      <ButtonMenu
        menuAlignment="right"
        menuSize="medium"
        buttonVariant="inverse"
        icon={<FaUser size={26} />}
      >
        {" "}
        <MenuItem icon={<FaStore />} label="LOGA" onClick={openModal} />
        <RenderIf isTrue={authenticatedUser.isAdmin && authenticatedUser.company === company}>
          <Link
            to={`/${company}/company/edit`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <MenuItem icon={<FaStore />} label="Gerenciar empresa" />
          </Link>
          <Link
            to={`/${company}/orders`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <MenuItem icon={<FaCashRegister />} label="Painel de Vendas" />
          </Link>
          <MenuItem icon={<FaIdCard />} label="Usuários" onClick={openModal} />
          <Link
            to={`/${company}/products`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <MenuItem icon={<FaBoxes />} label="Proutos" />
          </Link>
          <MenuDivider variant="space" />
        </RenderIf>
        <MenuItem
          icon={<FaUserEdit />}
          label="Meus dados"
          onClick={openModal}
        />
        <MenuItem icon={<FaCartArrowDown />} label="Meus Pedidos" />
        <MenuItem icon={<FaPowerOff />} label="Sair" />
      </ButtonMenu>
    </>
  );
}

export default UserButton;
