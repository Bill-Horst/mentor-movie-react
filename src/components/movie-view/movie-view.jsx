import React from 'react';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <div className="movie-title">
          <div className="label">Title</div>
          <div className="value">{movie.Title}</div>
        </div>
        <div className="movie-description">
          <div className="label">Description</div>
          <div className="value">{movie.Description}</div>
        </div>
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-genre">
          <div className="label">Genre</div>
          <div className="value">
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button>{movie.Genre.Name}</Button>
            </Link>
          </div>
        </div>
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value">
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button>{movie.Director.Name}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}