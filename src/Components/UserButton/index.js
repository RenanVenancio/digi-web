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
  const { logoff, company, authenticatedUser, loadUser } = useContext(
    ApplicationContext
  );

  useEffect(() => {
    console.log(authenticatedUser)
  }, [authenticatedUser]);

  const handleLogoff = () => {
    logoff();
    loadUser();
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <>
      <LoginModal isOpen={modalIsOpen} />
      <ButtonMenu
        menuAlignment="right"
        menuSize="medium"
        buttonVariant="brand"
        icon={<FaUser size={26} />}
      >
        <RenderIf isTrue={"name" in authenticatedUser}>
          <RenderIf
            isTrue={
              authenticatedUser.isAdmin &&
              authenticatedUser.company.domain === company
            }
          >
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
            <MenuItem
              icon={<FaIdCard />}
              label="Usuários"
              onClick={openModal}
            />
            <Link
              to={`/${company}/products`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <MenuItem icon={<FaBoxes />} label="Proutos" />
            </Link>
            <MenuDivider variant="space" />
          </RenderIf>
          <MenuItem icon={<FaUserEdit />} label="Meus dados" />
          <MenuItem icon={<FaCartArrowDown />} label="Meus Pedidos" />
          <MenuItem icon={<FaPowerOff />} label="Sair" onClick={handleLogoff} />
        </RenderIf>
        <RenderIf isTrue={!("name" in authenticatedUser)}>
          <MenuItem
            icon={<FaStore />}
            label="Fazer Login"
            onClick={openModal}
          />
        </RenderIf>
      </ButtonMenu>
    </>
  );
}

export default UserButton;
