import PropTypes from "prop-types";
import React from "react";

import { Container } from "./styles";

function Grid({ children }) {
  return <Container>{children}</Container>;
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Grid;
