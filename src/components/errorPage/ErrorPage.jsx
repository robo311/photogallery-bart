import React from "react";
import { BiErrorAlt } from "react-icons/bi";

function ErrorPage({ error }) {
  console.log(error);
  return (
    <div className="error-page">
      <BiErrorAlt />
      {error.message}
    </div>
  );
}

export default ErrorPage;
