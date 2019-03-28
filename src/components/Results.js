import React from "react";
import "../styles/Results.css";

const Results = props => {
  let content = null;
  if (props.artist) {
    content = (
      <React.Fragment>
        <a className="result__a" href={props.url}>
          <img className="result__img" src={props.img} alt="Album artwork" />
          <h2 className="result__description">
            <p className="result__title">{props.title}</p>
            <p className="result__artist">By {props.artist}</p>
          </h2>
        </a>
      </React.Fragment>
    );
  }

  return <li className="result">{content}</li>;
};

export default Results;
