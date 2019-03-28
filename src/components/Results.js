import React from "react";
import "../styles/Results.css";

const Results = props => {
  let content = null;
  const { artist, url, img, title } = props;
  if (artist) {
    content = (
      <React.Fragment>
        <a className="result__a" href={url}>
          <img className="result__img" src={img} alt="Album artwork" />
          <h2 className="result__description">
            <p className="result__title">{title}</p>
            <p className="result__artist">By {artist}</p>
          </h2>
        </a>
      </React.Fragment>
    );
  }

  return <li className="result">{content}</li>;
};

export default Results;
