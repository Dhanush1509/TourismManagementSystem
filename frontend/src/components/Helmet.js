import React from "react";
import { Helmet } from "react-helmet";
const Meta = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      <meta name="keywords" content="Farm together" />
      <meta
        name="description"
        content="Read the inspirational stories of other farmers"
      />
    </Helmet>
  );
};

export default Meta;
