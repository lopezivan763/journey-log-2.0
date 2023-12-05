// Boiler plate Login 
import Auth from '../utils/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

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
        <main>
            <Card
                className="my-2"
                color="primary"
                inverse
                style={{
                    width: '18rem'
                }}
            >
                <CardHeader>
                    Header
                </CardHeader>
                <CardBody>
                    <CardTitle tag="h5">
                        Signup
                    </CardTitle>
                    <CardText>
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (

                            <Form onSubmit={handleFormSubmit}>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                        Email
                                    </Label>
                                    <Input
                                        className="form-input"
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="Your email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">
                                        Password
                                    </Label>
                                    <Input
                                        className="form-input"
                                        id="examplePassword"
                                        name="password"
                                        placeholder="######"
                                        type="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <Button color="primary"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Form>
                        )}

                        {error && (
                            <Alert color="danger">
                                {error.message}
                            </Alert>
                        )}
                    </CardText>
                </CardBody>
            </Card>
        </main>
    );
};

export default Login;