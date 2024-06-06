import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "ChatterBox",
  description = "this is the Chat App called ChatterBox",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;