import React, { useState, useContext, useEffect } from "react";
import { FileSelector } from "react-rainbow-components";
import { Api, baseURL } from "../../Services/Api";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import nophoto from "../../Assets/nophoto.png";
import { Image, Col } from "./styles";

function FileUpload({ attachmentId, setAttachmentId }) {
  const [preview, setPreview] = useState();
  const { company } = useContext(ApplicationContext);

  useEffect(() => {
    if (attachmentId !== null && company !== null) {
      setPreview(`${baseURL}/${company}/attachments/${attachmentId}`);
    } else {
      setPreview(nophoto);
    }
  }, [attachmentId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attachmentId !== null) {
      updateFile();
    } else {
      sendFile();
    }
  };

  const extractAttachmentIdOfURL = (url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  };

  const sendFile = (fileToUpload) => {
    let formData = new FormData();
    formData.append("file", fileToUpload);
    Api.post(`/${company}/attachments/`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }).then((res) => {
      setAttachmentId(extractAttachmentIdOfURL(res.headers.location));
    });
  };

  const updateFile = (fileToUpload) => {
    let formData = new FormData();
    formData.append("file", fileToUpload);
    Api.post(`/${company}/attachments/${attachmentId}`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }).then((res) => {
      setAttachmentId(extractAttachmentIdOfURL(res.headers.location));
    });
  };

  const handleImagePreview = (e) => {
    let imageBase64 = nophoto;
    console.log(e);
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

  const formStyles = {
    maxWidth: 160,
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} style={formStyles}>
      <Col>
        <Image src={preview} alt="image_preview" />
        <FileSelector
          style={selectorStyles}
          onChange={(value) => handleImagePreview(value[0])}
        />
      </Col>
    </form>
  );
}

export default FileUpload;
