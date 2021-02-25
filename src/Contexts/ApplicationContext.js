import React, { useState, createContext } from "react";
import { Api } from "../Services/Api";
import Toast from "../Utils/Toast";

export const ApplicationContext = createContext();

const ApplicationProvider = ({ children }) => {
  const [company, setCompany] = useState("");
  const [authenticatedUser, setAutheticatedUser] = useState({});
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [checkoutProducts, setCheckoutProducts] = useState({ products: [] });
  const [clientCheckoutData, setClientCheckoutData] = useState({
    values: { name: "", phone: "", email: "" },
    errors: {},
  });
  const productStorageKey = `@digi-app/productsCheckout/`;
  const userStorageKey = `@digi-app/autheticatedUserToken/`;

  async function login(email, password) {
    Api.post("/login", { email, password })
      .then((result) => {
        localStorage.setItem(
          userStorageKey,
          JSON.stringify(result.headers.authorization)
        );
        loadUser();
      })
      .catch((error) => {
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

  function loadUser() {
    if (localStorage.getItem(userStorageKey) !== null) {
      Api.get(`/clients/`)
        .then((response) => {
          setAutheticatedUser(response.data);
        })
        .catch(() => {
          setAutheticatedUser({});
        });
    } else {
      setAutheticatedUser({});
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
        showProductSearch,
        setShowProductSearch,
        company,
        setCompany,
        clientCheckoutData,
        setClientCheckoutData,
        removeProductInCheckoutById,
        authenticatedUser,
        setAutheticatedUser,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
