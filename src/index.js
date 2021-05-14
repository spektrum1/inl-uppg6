import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';


class SortByAlphaButton extends React.Component {

  sortAlphabetic() {
    const movies = this.props.movies;
    movies.sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      return 0;
    });
    this.props.updateList(movies);
  }

  render() {
    return (
      <button id="sort-alphabetic" className="btn btn-primary" onClick={this.sortAlphabetic.bind(this)}>
        Sortera Alfabet
      </button>
    );
  }
}

class SortByRatingButton extends React.Component {

  sortRating() {
    const movies = this.props.movies;
    movies.sort(function (a, b) {
      return b.rating - a.rating;
    });
    this.props.updateList(movies);
  }

  render() {
    return (
      <button id="sort-grade" className="btn btn-primary" onClick={this.sortRating.bind(this)}>
        Sortera Betyg
      </button>
    );
  }
}

function Stars(rating) {
  let stars = [];
  for (var i = 0; i < parseInt(rating.value); i++) {
    stars.push(<img src="images/star.png" alt="Star"></img>);
  }
  return stars;
}

class Movie extends React.Component {
  remove() {
    this.props.remove(this.props.movie.title);
  }

  render() {
    return (
      <li key={this.props.movie.title}> {this.props.movie.title}
        <img src="images/delete.png" alt="Delete movie" className="delete-movie" onClick={this.remove.bind(this)}></img>
        <Stars value={this.props.movie.rating} />
      </li>
    );
  }
}

class MovieList extends React.Component {
  render() {
    return (
      <ul id="movie-list">
        {this.props.movies.map((movie) => (
          <Movie key={movie.title} movie={movie} remove={this.props.remove}></Movie>
        ))}
      </ul>
    )
  }
}

class AddMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      rating: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.title && this.state.rating > 0) {
      this.props.addMovie(this.state.title, this.state.rating);
      this.setState({
        title: '',
        rating: ''
      });
    } else {
      alert("You must enter a title and rating.");
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <legend>Lägg till en film</legend>
        <label htmlFor="title">Titel:</label>
        <input type="text" value={this.state.title} onChange={this.handleChange} name="title" className="form-control"></input>
        <label htmlFor="rating">Betyg:</label>
        <select type="text" name="rating" value={this.state.rating} onChange={this.handleChange} className="form-control">
          <option value="0">Välj betyg här...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input type="submit" className="btn btn-success mt-3" value="Spara film" />
      </form>
    );
  }
}



class As6 extends React.Component {

  constructor(props) {
    super(props);
    this.state = { movies: [] };
    this.addMovie = this.addMovie.bind(this);
    this.updateMovieList = this.updateMovieList.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    
  }

  addMovie(title, rating) {
    let updatedMovies = this.state.movies.concat({title: title, rating: rating});
    this.updateMovieList(updatedMovies);
  }

  updateMovieList(movies) {
    this.setState({
      movies: movies
    });
  }

  deleteMovie(title) {
    let updatedMovies = this.state.movies.filter((movie) => movie.title !== title);
    this.updateMovieList(updatedMovies);
  }

  render() {
    return (
      <div className="row container-fluid">
        <div className="xs-col-12">

          <h1> Min Filmlista </h1>

          <AddMovieForm addMovie={this.addMovie} />

          <h2> Inlagda Filmer </h2>

          <MovieList movies={this.state.movies} remove={this.deleteMovie} />

          <SortByAlphaButton movies={this.state.movies} updateList={this.updateMovieList} />

          <SortByRatingButton movies={this.state.movies} updateList={this.updateMovieList} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <As6 />,
  document.getElementById('root')
);

