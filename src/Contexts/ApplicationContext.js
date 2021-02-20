import React, { useState, createContext } from "react";
import { Api } from "../Services/Api";

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
  const userStorageKey = `@digi-app/autheticatedUser/`;

  async function login(email, password) {
    Api.post("/login", { email, password }).then((result) => {
      localStorage.setItem(
        userStorageKey,
        JSON.stringify({ token: result.headers.authorization })
      );
      updateUserInState();
      console.log(result);
    });
  }

  function updateUserInState() {
    if (localStorage.getItem(userStorageKey) !== null) {
      let token = JSON.parse(localStorage.getItem(userStorageKey));
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
      };
      Api.get(`/clients/`, options).then((result) => {
        let userData = result.data;
        userData.authorization = token;
        setAutheticatedUser(result.data);
      });
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
        updateUserInState,
        authenticatedUser,
        setAutheticatedUser,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
