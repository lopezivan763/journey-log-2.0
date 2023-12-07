import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Card, CardBody, Button, CardTitle, CardText, Form,FormGroup, Label, Input, Alert } from "reactstrap"



const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="d-flex justify-content-center align-items-center min-vh-50">
          <Card className="my-2 bg-primary text-white" style={{ width: '28rem' }}>
            <CardBody>
              <CardTitle tag="h5">Login</CardTitle>
              <CardText>
                {data ? (
                  <p>
                    Success! You may now head <Link to="/" className="text-light">back to the homepage.</Link>
                  </p>
                ) : (
                  <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                      <Label for="exampleEmail" className="text-light">Email</Label>
                      <Input
                        id="exampleEmail"
                        name="email"
                        placeholder="Email"
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
                      Login
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

export default Login;