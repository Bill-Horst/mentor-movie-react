import React from 'react';
import './genre-view.scss';

export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { genre } = this.props;

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
            </div>
        );
    }
}