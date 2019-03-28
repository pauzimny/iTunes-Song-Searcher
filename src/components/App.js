import React, { Component } from "react";
import Header from "./Header.js";
import SearchForm from "./SearchForm.js";
import Results from "./Results.js";
import Footer from "./Footer.js";
import ResultsValue from "./ResultsValue.js";
import "../styles/App.css";

class App extends Component {
  state = {
    value: "",
    searchResult: [],
    search: false
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSongSearch = e => {
    e.preventDefault();
    const APIURL = `https://itunes.apple.com/search?term=${
      this.state.value
    }&entity=song&limit=100`;

    fetch(APIURL)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("Cannot connect with server");
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
        this.setState({ searchResult: response, search: true });
        console.log(this.state.searchResult);
      })
      .catch(error => console.log(error));
  };

  render() {
    const songs = this.state.searchResult.map(song => (
      <Results
        key={song.id}
        title={song.song}
        artist={song.artist}
        img={song.image}
        url={song.url}
      />
    ));

    return (
      <div className="wrapper">
        <Header />
        <SearchForm
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleSongSearch}
        />
        <ResultsValue
          value={this.state.searchResult.length}
          search={this.state.search}
        />
        <ul className="main results-container">{songs}</ul>
        <Footer />
      </div>
    );
  }
}

export default App;
