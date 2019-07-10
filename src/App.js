import React, { Component } from "react";
import "./App.css";
import Movie from "./Movie";

class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {};

  componentDidMount() { // render가 완료된 후에 _getMovies()를 호출하여 Api를 받아온다
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return (
        <Movie
          title={movie.title_english}
          poster={movie.large_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      );
    });
    return movies;
  };

  _getMovies = async () => {  // 비동기로 await하여 _callApi()호출
    const movies = await this._callApi(); //_callApi() 하여 받아온 json을 movies에 저장
    this.setState({
      movies //movies: movies
    });
  };

  _callApi = () => {
    return fetch(  //promise -> then -> catch
      "https://yts.lt/api/v2/list_movies.json?sort_by=download_count"
    ) 
      .then(res => res.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
