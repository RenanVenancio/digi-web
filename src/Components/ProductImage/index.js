import React, { useEffect } from "react";
import { baseURL } from "../../Services/Api";
import { Image } from "./styles";

function ProductImage({ id, company }) {
  useEffect(() => {}, [id]);

  return <Image src={`${baseURL}/${company}/attachments/${id}`} />;
}

export default ProductImage;
