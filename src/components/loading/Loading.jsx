import React from "react";
import { ClipLoader } from "react-spinners";

function Loading({ loading }) {
  return (
    <div className="loading-wrapper">
      <ClipLoader loading={loading} size={100} />
    </div>
  );
}

export default Loading;
