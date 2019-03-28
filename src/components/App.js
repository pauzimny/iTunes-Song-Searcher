import React, { Component } from "react";
import Header from "./Header.js";
import SearchForm from "./SearchForm.js";
import Results from "./Results.js";
import Footer from "./Footer.js";
import ResultsValue from "./ResultsValue.js";
import Pagination from "./Pagination.js";
import "../styles/App.css";

class App extends Component {
  state = {
    value: "",
    searchResult: [],
    search: false,
    nextClick: false,
    next: [],
    startResult: 9,
    endResult: 18
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
        this.setState({ searchResult: response, search: true, value: "" });
      })
      .catch(error => console.log(error));
  };

  handleClickNext = () => {
    if (this.state.endResult < this.state.searchResult.length) {
      this.setState({ nextClick: true });
      this.setState(prevState => ({
        startResult: prevState.startResult + 9
      }));
      this.setState(prevState => ({
        endResult: prevState.endResult + 9
      }));
    }
  };

  handleClickPrev = () => {
    if (this.state.endResult > 9) {
      this.setState({ nextClick: true });
      this.setState(prevState => ({
        startResult: prevState.startResult - 9
      }));
      this.setState(prevState => ({
        endResult: prevState.endResult - 9
      }));
    }
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

    const page = songs.slice(0, 9);

    const nextpage = this.state.searchResult.map(song => (
      <Results
        key={song.id}
        title={song.song}
        artist={song.artist}
        img={song.image}
        url={song.url}
      />
    ));
    const next = nextpage.slice(this.state.startResult, this.state.endResult);

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
        <ul className="main results-container">
          {this.state.nextClick ? next : page}
        </ul>
        {this.state.searchResult.length > 9 ? (
          <Pagination
            clickNext={this.handleClickNext}
            clickPrev={this.handleClickPrev}
          />
        ) : null}
        <Footer />
      </div>
    );
  }
}

export default App;
