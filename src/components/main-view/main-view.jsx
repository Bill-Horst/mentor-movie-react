import React from 'react';
import axios from 'axios';
import './main-view.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: null,
            selectedMovie: null,
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

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

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
        const { movies, selectedMovie, user, registered } = this.state;

        // if (!user && !registered) return <RegistrationView onRegistered={registered => this.onRegistered(registered)} />;

        if (!user) return <LoginView onLoggedIn={authData => this.onLoggedIn(authData)} />;

        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                <Container>
                    <Row>
                        {selectedMovie
                            ? <MovieView movie={selectedMovie} returnToMain={button => this.returnToMainView()} />
                            : movies.map(movie => (
                                <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                            ))
                        }
                    </Row>
                </Container>

            </div>
        );
    }
}