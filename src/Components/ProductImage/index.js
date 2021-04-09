import React, { useEffect } from "react";
import { baseURL } from "../../Services/Api";
import { Image } from "./styles";
import nophoto from "../../Assets/nophoto.png";

function ProductImage({ id, company }) {
  useEffect(() => {}, [id]);

  return <Image src={typeof(id) === "undefined" || id === null ? nophoto : `${baseURL}/${company}/attachments/${id}`} />;
}

export default ProductImage;
