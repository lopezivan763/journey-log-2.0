import React from 'react';
import { Card, Container, Button, CardColumns } from "reactstrap"
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../src/utils/queries';
import Auth from '../src/utils/auth';
import { removePlaceId } from '../src/utils/localStorage';

const SavedPlaces = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {};

    if(!userData?.email) {
        return (
            <h4>
            You need to be logged in!
            </h4>
        );
    }
}

    const handleDeletePlace = async (placeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }

        try {
            await deletePlace({
                variables: {placeId: placeId},
                update: cache => {
                    const data = cache.readQuery({ query: QUERY_ME });
                    const userDataCache = data.me;
                    const savedPlacesCache = userDataCache.savedPlaces;
                    const updatedPlaceCache = savedPlacesCache.filter((place) => place.placeId !== placeId);
                    data.me.savedPlaces = updatedPlaceCache;
                    cache.writeQuery({ query: GET_ME, data: {data: {...data.me.savedPlaces}}})
                }
            });

            removePlaceId(placeId);
        } catch (err) {
            console.error(err);
        }
    };
    if(loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
        <div fluid className='text-light bg-dark'>
            <Container>
                <h1>Viewing saved places!</h1>
                </Container>
                </div>
                <Container>
                    <h2>
                        {userData.savedPlaces.length 
                        ? `Viewing ${userData.savedPlaces.length} saved ${userData.savedPlaces.length === 1 ? 'book' : 'books'}:`
                        : 'You have no saved places!'}
                        </h2>
                        <CardColumns>
                            {userData.savedPlaces.map((place) => {
                                return (
                                    <Card key={place.placeId} border='dark'>
                                        <Card.Body>
                                            <Card.Title>{place.title}</Card.Title>
                                            <p className='small'>Authors: {place.authors}</p>
                                            {place.link ? <Card.Text><a href={place.link} target="blank">More Information</a></Card.Text> : null}
                                            <Button className='btn-block btn-danger' onClick={() => handleDeletePlace(place.placeId)}>
                                                Delete this Place
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                );
                            }
                            )
                        }
                            
                            </CardColumns>
                            </Container>
                            </>
    )


export default SavedPlaces