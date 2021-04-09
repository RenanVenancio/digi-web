import React, { createContext, useState } from "react";

import { Api } from "../Services/Api";
import Toast from "../Utils/Toast";

export const ApplicationContext = createContext();

const ApplicationProvider = ({ children }) => {
  const [company, setCompany] = useState("");
  const [authenticatedUser, setAutheticatedUser] = useState({});
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [checkoutProducts, setCheckoutProducts] = useState({ products: [] });
  const [clientCheckoutData, setClientCheckoutData] = useState({
    values: { name: "", phone: "", email: "" },
    errors: {},
  });
  const productStorageKey = `@digi-app/productsCheckout/`;
  const userStorageKey = `@digi-app/autheticatedUser/`;
  const clientStorageKey = `@digi-app/clientCheckoutData/`;

  async function login(email, password) {
    await Api.post("/login", { email, password })
      .then(async (result) => {
        localStorage.setItem(
          userStorageKey,
          JSON.stringify(result.headers.authorization)
        );
        Toast.fire({
          icon: "success",
          title: "Login efetuado com sucesso!",
        });
      })
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: "Usuário ou snha inválidos",
        });
      });
  }

  function logoff() {
    localStorage.removeItem(userStorageKey);
    loadUser();
  }

  async function loadUser() {
    console.log(localStorage.getItem(userStorageKey));
    if (localStorage.getItem(userStorageKey) !== null) {
      await Api.get(`/clients/`)
        .then((response) => {
          setAutheticatedUser(response.data);
        })
        .catch(() => {
          setAutheticatedUser({});
        });
    } else {
      return null;
    }
  }

  function setClientCheckoutDataStorage(data) {
    if (localStorage.getItem(clientStorageKey) === null) {
      localStorage.setItem(clientStorageKey, JSON.stringify(data));
    }
  }

  function updateClientDataStorage() {
    if (localStorage.getItem(clientStorageKey) !== null) {
      setClientCheckoutData(JSON.parse(localStorage.getItem(clientStorageKey)));
    }
  }

  function addProductInCheckout(product) {
    if (localStorage.getItem(productStorageKey + company) === null) {
      localStorage.setItem(
        productStorageKey + company,
        JSON.stringify({ products: [] })
      );
    }
    let currentProducts = JSON.parse(
      localStorage.getItem(productStorageKey + company)
    );
    let indexFound = currentProducts.products.findIndex(
      (i) => i.id === product.id
    );
    if (indexFound !== -1) {
      console.log(indexFound);
      let oldProduct = currentProducts.products[indexFound];
      oldProduct.quantity += product.quantity;
      currentProducts.products[indexFound] = oldProduct;
    } else {
      currentProducts.products.push(product);
    }
    localStorage.setItem(
      productStorageKey + company,
      JSON.stringify(currentProducts)
    );
    setCheckoutProducts(
      JSON.parse(localStorage.getItem(productStorageKey + company))
    );
  }

  function removeProductInCheckoutById(id) {
    let currentProducts = JSON.parse(
      localStorage.getItem(productStorageKey + company)
    );
    let newState = currentProducts.products.filter((i) => i.id !== id);
    localStorage.setItem(
      productStorageKey + company,
      JSON.stringify({ products: newState })
    );
    updateCheckoutProducts(company);
  }

  function removeAllProductInCheckout() {
    localStorage.removeItem(productStorageKey + company);
    setCheckoutProducts({ products: [] });
  }

  function updateCheckoutProducts(company) {
    let localStorageState = localStorage.getItem(productStorageKey + company);
    if (localStorageState !== null) {
      let localStorageJson = JSON.parse(localStorageState);
      if (company !== null && localStorageJson.products.length > 0) {
        setCheckoutProducts(
          JSON.parse(localStorage.getItem(productStorageKey + company))
        );
      } else if (company !== null && localStorageJson.products.length === 0) {
        //localStorage.removeItem(productStorageKey + company);
        setCheckoutProducts({ products: [] });
      }
    }
  }

  return (
    <ApplicationContext.Provider
      value={{
        login,
        logoff,
        loadUser,
        globalSearch,
        setGlobalSearch,
        checkoutProducts,
        addProductInCheckout,
        updateCheckoutProducts,
        showGlobalSearch,
        setShowGlobalSearch,
        company,
        setCompany,
        clientCheckoutData,
        setClientCheckoutData,
        removeProductInCheckoutById,
        removeAllProductInCheckout,
        authenticatedUser,
        setAutheticatedUser,
        setClientCheckoutDataStorage,
        updateClientDataStorage,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
