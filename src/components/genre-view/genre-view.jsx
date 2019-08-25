import React from 'react';
import { Link } from 'react-router-dom';
import './genre-view.scss';

export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { genre, genreMovies } = this.props;

        if (!genre) return null;

        return (
            <div className="genre-view">
                <div className="genre-name">
                    <div className="label">Name</div>
                    <div className="value">{genre.Name}</div>
                </div>
                <div className="genre-description">
                    <div className="label">Description</div>
                    <div className="value">{genre.Description}</div>
                </div>
                <div className="genre-movies">
                    <div className="label">Other movies with this genre:</div>
                    <div className="value">{genreMovies.map(m => <p key={m._id}>
                        <Link to={`/movies/${m._id}`}>
                            {m.Title}
                        </Link>
                    </p>)}</div>
                </div>
            </div>
        );
    }
}