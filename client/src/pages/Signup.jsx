import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="d-flex justify-content-center align-items-center min-vh-50">
          <Card className="my-2 bg-primary text-white" style={{ width: '28rem' }}>
            <CardBody>
              <CardTitle tag="h5">Signup</CardTitle>
              <CardText>
                {data ? (
                  <p>
                    Success! You may now head <Link to="/" className="text-light">back to the homepage.</Link>
                  </p>
                ) : (
                  <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                      <Label for="exampleUsername" className="text-light">Username</Label>
                      <Input
                        id="exampleUsername"
                        name="username"
                        placeholder="Username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                        className="bg-light text-dark"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail" className="text-light">Email</Label>
                      <Input
                        id="exampleEmail"
                        name="email"
                        placeholder="Your email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="bg-light text-dark"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword" className="text-light">Password</Label>
                      <Input
                        id="examplePassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                        className="bg-light text-dark"
                      />
                    </FormGroup>
                    <Button color="light" type="submit">
                      Signup
                    </Button>
                  </Form>
                )}
    
                {error && <Alert color="danger">{error.message}</Alert>}
              </CardText>
            </CardBody>
          </Card>
        </main>
      );
    };

export default Signup;
