import React from "react";
import { FileSelector } from "react-rainbow-components";
// import { Container } from './styles';

function AttachmentSubmit() {
  return (
    <div>
      <FileSelector
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        label="File selector"
        placeholder="Drag & Drop or Click to Browse"
        bottomHelpText="Select only one file"
        variant="multiline"
        onChange={formik.handleChange}
      />
    </div>
  );
}

export default AttachmentSubmit;
