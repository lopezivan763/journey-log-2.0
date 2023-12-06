import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Button, CardTitle, CardText, Form,FormGroup, Label, Input } from "reactstrap"


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
                                    <Label for="exampleUsername">
                                        Username
                                    </Label>
                                    <Input
                                    className="form-input"
                                        id="exampleUsername"
                                        name="username"
                                        placeholder="Your username"
                                        type="text"
                                        value={formState.name}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
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
                                    Signup
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

export default Signup;
