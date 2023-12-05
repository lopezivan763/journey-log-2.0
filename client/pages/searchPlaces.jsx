import React, { useState, useEffect} from 'react';
import { Container, Col, Form, Button, Card, CardColumns } from 'reactstrap';
import Auth from '../src/utils/auth';
import { savePlaceIds, getSavedPlacesIds } from '../src/utils/localStorage';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const SearchPlaces = () => {
    const [searchedPlaces, setSearchedPlaces] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedPlaceIds, setSavedPlaceIds] = useState(getSavedPlacesIds());

    useEffect(() => {
        return () => savePlaceIds(savedPlaceIds);
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }
        try {
            const response = await fetch(
                ``
        );

        if (!response.ok) {
            throw new Error('something went wrong!');
        }
        const { items } = await response.json();

        const placeData = items.map((place) => ({
            title: place.title,
            body: place.body,
            author: place.author,
            comments: place.comments,
        }));
        setSearchedPlaces(placeData);
        setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSavePlace = async (placeId) => {
        const placeToSave = searchedPlaces.find((place) => place.placeId === placeId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await savePlaceIds({
                variables: { newPlace: {...placeToSave} },
            });

            setSavedPlaceIds([...savedPlaceIds, placeToSave.placeId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <div fluid className='text-light bg-dark'>
            <Container>
                <h1>Search for Places!</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                            name='searchInput'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type='text'
                            size='lg'
                            placeholder='Search for a book'
                            />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                    Submit Search 
                                    </Button>
                                    </Col>
                                    </Form.Row>
                                    </Form>
                                    </Container>
                                    </div>
                                    
                                    <Container>
                                        <h2>
                                            {searchedPlaces.length
                                            ? `Viewing ${searchedPlaces.length} results:`
                                        : 'search for a place to begin'}
                                            </h2>
                                            <CardColumns>
                                                {searchedPlaces.map((book) => {
                                                    return (
                                                        <Card key={place.placeId} border='dark'>
                                                        <Card.Body>
                                                            <Card.Title>{place.title}</Card.Title>
                                                            <p className='small'>Author: {place.author}</p>
                                                        </Card.Body>
                                                        </Card></CardColumns></Container></>
    )
}