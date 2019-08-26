import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { generateKeyPairSync } from 'crypto';
import Button from 'react-bootstrap/Button';
import { EditUserView } from '../edit-user-view/edit-user-view';

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

    onLoggedIn(authData) {
        console.log(authData)
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    returnToMainView() {
        this.setState({
            selectedMovie: null
        });
    }

    removeFavorite(id) {
        console.log('deleting movie with id: ', id)
        axios.delete(`https://mentor-movie-api.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            console.log(`deleted movie from db with id ${id}`)
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { movies, user } = this.state;

        if (!user) return <LoginView onLoggedIn={authData => this.onLoggedIn(authData)} />;

        if (!movies) return <LoginView onLoggedIn={authData => this.onLoggedIn(authData)} />;

        return (
            <Router>
                <div className="main-view">
                    <h1>Signed in as {user}</h1>
                    <Link to={`/logout`}><Button>Log out</Button></Link>
                    <Link to={`/users/edit`}><Button>Edit your user info</Button></Link>
                    <Link to={`/`}>Movies</Link>
                    <Container>
                        <Row>
                            <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
                            <Route exact path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

                            <Route exact path="/genres/:name" render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} genreMovies={movies.filter(m => m.Genre.Name === match.params.name)} />
                            }} />

                            <Route exact path="/directors/:name" render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} directorMovies={movies.filter(m => m.Director.Name === match.params.name)} />
                            }} />

                            <Route exact path="/users/edit" render={ () => {
                                return <EditUserView user={user} movies={movies} removeFav={fav => this.removeFavorite(fav)}/>
                            }} />

                            <Route exact path="/logout" render={() => {
                                localStorage.setItem('user', null);
                                localStorage.setItem('token', null);
                            }} />

                        </Row>
                    </Container>
                </div>
            </Router>
        );
    }
}