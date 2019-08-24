import React, { useState } from 'react';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    axios.post('https://mentor-movie-api.herokuapp.com/login', null, {params: {
    // axios.post('http://localhost:8080', {
      Username: username,
      Password: password
    }})
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });

    // props.onLoggedIn(username);
  };

  return (
    <Container>
      <h1>Existing user login page</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
}