import React, { useState } from 'react';
import './edit-user-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class EditUserView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            email: null,
            birthday: null,
            favoriteMovies: []
        }
    }

    componentDidMount() {
        axios.get(`https://mentor-movie-api.herokuapp.com/users/${localStorage.user}`, {
            headers: { Authorization: `Bearer ${localStorage.token}` }
        })
            .then(response => {
                this.setState({
                    username: response.data.Username,
                    email: response.data.Email,
                    birthday: response.data.Birthday,
                    favoriteMovies: response.data.FavoriteMovies
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {

        const { username, email, birthday, favoriteMovies } = this.state;
        const { removeFav } = this.props;

        const handleSubmit = (user) => {
            console.log(user);
            // change user's info here and pass it along to the put request
        }

        return (
            <Container>
                <h1>Edit your info and click 'Save Changes' to save the changes:</h1>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <p>Currently set at '{username}'. Enter a new value to change it.</p>
                        <Form.Control type="text" placeholder="Enter username"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <p>Currently set at '{email}'. Enter a new value to change it.</p>
                        <Form.Control type="email" placeholder="Enter email"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBirthdate">
                        <Form.Label>Birthday</Form.Label>
                        <p>Your birthday changed? It happens... Enter a new value to change it below.</p>
                        <Form.Control type="date" placeholder="Enter birthday in mm/dd/yyyy format"></Form.Control>
                    </Form.Group>
                    <h1>Movies:</h1>
                    <div className="value">
                        {this.props.movies.map(m => {
                            if (m._id === this.state.favoriteMovies.find(mf => mf === m._id)) {
                                return <div key={m._id}>
                                    <p>{m.Title}</p> <Button onClick={() => removeFav(m._id)}>X</Button>
                                </div>
                            }
                        })}
                    </div>
                    <Button variant="primary" type="button" onClick={handleSubmit}>Submit</Button>
                </Form>
            </Container>
        );
    }
}