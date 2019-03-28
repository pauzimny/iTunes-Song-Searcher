import React from "react";
import "../styles/SearchForm.css";

const SearchForm = props => {
  const { submit, value, change } = props;
  return (
    <form className="search-form" onSubmit={submit}>
      <p className="search-form__header">iTunes api example</p>
      <p className="search-form__form">
        <input
          className="search-form__input"
          type="text"
          value={value}
          onChange={change}
          placeholder="Search songs.."
        />
        <button className="search-form__button">Search</button>
      </p>
      <p className="search-form__instruction">
        Search by song title,author, song number,lyrics, catalog or copyright
        owner
      </p>
    </form>
  );
};

export default SearchForm;
