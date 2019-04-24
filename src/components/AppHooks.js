import React, { useState } from "react";
import Header from "./Header.js";
import SearchForm from "./SearchForm.js";
import Results from "./Results.js";
import Footer from "./Footer.js";
import ResultsValue from "./ResultsValue.js";
import Pagination from "./Pagination.js";
import "../styles/App.css";

const App = () => {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState(false);
  const [nextClick, setNextClick] = useState(false);
  const [startResult, setStartResult] = useState(9);
  const [endResult, setEndResult] = useState(18);

  const handleInputChange = e => {
    setValue(e.target.value);
  };

  const handleSongSearch = e => {
    e.preventDefault();
    const APIURL = `https://itunes.apple.com/search?term=${value}&entity=song&limit=100`;

    fetch(APIURL)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("Cannot connect with server");
      })
      .then(response => response.json())
      .then(data => {
        let response = [];
        data.results.forEach(result => {
          const search = {
            id: result.trackId,
            artist: result.artistName,
            song: result.trackName,
            image: result.artworkUrl100,
            url: result.trackViewUrl
          };
          response.push(search);
        });
        setSearchResult(response);
        setSearch(true);
        setValue("");
      })
      .catch(error => console.log(error));
  };

  const handleClickNext = () => {
    if (endResult < searchResult.length) {
      setNextClick(true);
      setStartResult(startResult + 9);
      setEndResult(endResult + 9);
    }
  };

  const handleClickPrev = () => {
    if (endResult > 9) {
      setNextClick(true);
      setStartResult(startResult - 9);
      setEndResult(endResult - 9);
    }
  };

  const songs = searchResult.map(song => (
    <Results
      key={song.id}
      title={song.song}
      artist={song.artist}
      img={song.image}
      url={song.url}
    />
  ));

  const page = songs.slice(0, 9);

  const nextpage = searchResult.map(song => (
    <Results
      key={song.id}
      title={song.song}
      artist={song.artist}
      img={song.image}
      url={song.url}
    />
  ));
  const next = nextpage.slice(startResult, endResult);

  return (
    <div className="wrapper">
      <Header />
      <SearchForm
        value={value}
        change={handleInputChange}
        submit={handleSongSearch}
      />
      <ResultsValue value={searchResult.length} search={search} />
      <ul className="main results-container">{nextClick ? next : page}</ul>
      {searchResult.length > 9 ? (
        <Pagination
          clickNext={() => handleClickNext()}
          clickPrev={() => handleClickPrev()}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default App;
