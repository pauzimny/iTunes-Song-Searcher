import React from "react";
import "../styles/ResultsValue.css";

const ResultsValue = props => {
  let info = null;
  if (props.value === 0 && props.search) {
    info = <p className="results-value">Sorry, no matches found</p>;
  } else if (props.value > 0 && props.search) {
    info = <p className="results-value">Found {props.value} songs</p>;
  }
  return <div>{info}</div>;
};
export default ResultsValue;
