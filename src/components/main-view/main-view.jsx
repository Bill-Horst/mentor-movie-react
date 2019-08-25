import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { generateKeyPairSync } from 'crypto';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: null,
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://mentor-movie-api.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // onMovieClick(movie) {
    //     // this.setState({
    //     //     selectedMovieId: movie._id
    //     // });
    //     window.location.hash = '#' + movie._id;
    // }

    onLoggedIn(authData) {
        console.log(authData)
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    // onRegistered(registered) {
    //     this.setState({
    //         registered
    //     })
    // }

    returnToMainView() {
        this.setState({
            selectedMovie: null
        });
    }

    render() {
        const { movies, user } = this.state;

        if (!user) return <LoginView onLoggedIn={authData => this.onLoggedIn(authData)} />;

        if (!movies) return <div className="main-view" />;

        console.log(movies.filter(m => m.Director.Name === 'Jonathan Piggy'))

        return (
            <Router>
                <div className="main-view">
                    <Container>
                        <Row>
                            <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
                            <Route exact path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

                            <Route exact path="/genres/:name" render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} genreMovies={movies.filter(m => m.Genre.Name === match.params.name)}/>
                            }} />

                            <Route exact path="/directors/:name" render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} directorMovies={movies.filter(m => m.Director.Name === match.params.name)} />
                            }} />
                            
                        </Row>
                    </Container>
                </div>
            </Router>
        );
    }
}