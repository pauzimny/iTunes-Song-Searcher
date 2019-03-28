import React from "react";
import "../styles/ResultsValue.css";

const ResultsValue = props => {
  let info = null;
  const { value, search } = props;
  if (value === 0 && search) {
    info = <p className="results-value">Sorry, no matches found</p>;
  } else if (value > 0 && props.search) {
    info = <p className="results-value">Found {value} songs</p>;
  }
  return <div>{info}</div>;
};
export default ResultsValue;
