import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api, baseURL } from "../../Services/Api";
import DigiCard from "../DigiCard";
import Grid from "../Grid";

export default function CategoriesList() {
  const { company } = useContext(ApplicationContext);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    loadCaregories();
  }, [company]);

  async function loadCaregories() {
    if (company !== "") {
      await Api.get(`${company}/product/categories/`).then((result) => {
        setCategoriesList(result.data);
      });
    }
  }

  return (
    <Grid>
      {categoriesList.map((i) => (
        <Link
          key={i.id}
          to={`productsearch?category=${i.id}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <DigiCard
            key={i.id}
            title={i.name}
            imageUrl={`${baseURL}/${i.company}/attachments/${i.attachment}`}
          />
        </Link>
      ))}
    </Grid>
  );
}
