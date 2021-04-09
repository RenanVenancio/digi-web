import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { FileSelector } from "react-rainbow-components";

import nophoto from "../../Assets/nophoto.png";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api, baseURL } from "../../Services/Api";
import { Col, Image } from "./styles";

function FileUpload({ attachmentId, setAttachmentId }) {
  const [preview, setPreview] = useState();
  const { company } = useContext(ApplicationContext);

  useEffect(() => {
    setFilePreview();
  }, [attachmentId, company]);

  const setFilePreview = () => {
    if (company !== "") {
      if (attachmentId === null || typeof attachmentId === "undefined") {
        setPreview(nophoto);
      } else {
        setPreview(`${baseURL}/${company}/attachments/${attachmentId}`);
      }
    }
  };

  const extractAttachmentIdOfURL = (url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  };

  const sendFile = (fileToUpload) => {
    let formData = new FormData();
    formData.append("file", fileToUpload);
    if (attachmentId === null) {
      Api.post(`/${company}/attachments/`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }).then((res) => {
        setAttachmentId(extractAttachmentIdOfURL(res.headers.location));
      });
    } else {
      Api.put(`/${company}/attachments/${attachmentId}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }).then((res) => {
        setAttachmentId(extractAttachmentIdOfURL(res.headers.location));
      });
    }
  };

  const handleImagePreview = (e) => {
    let imageBase64 = nophoto;
    if (e !== undefined) {
      imageBase64 = URL.createObjectURL(e);
      setPreview(imageBase64);
      sendFile(e);
    } else {
      setPreview(nophoto);
    }
  };

  const selectorStyles = {
    maxWidth: 160,
  };

  return (
    <Col center>
      <Image src={preview} alt="image_preview" />
      <FileSelector
        placeholder="Imagem"
        style={selectorStyles}
        onChange={(value) => handleImagePreview(value[0])}
      />
    </Col>
  );
}

FileUpload.propTypes = {
  attachmentId: PropTypes.any,
  setAttachmentId: PropTypes.func,
};

FileUpload.defaultProps = {
  attachmentId: null,
};

export default FileUpload;
