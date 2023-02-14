import React from "react";

function Snackbar({ text, fade }) {
  return <div className={fade ? "snackbar fade" : "snackbar"}>{text}</div>;
}

export default Snackbar;
