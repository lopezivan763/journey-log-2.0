import React, { useState, useEffect} from 'react';
import { Container, Col, Form, Button, Card, CardColumns } from 'reactstrap';
import Auth from '../src/utils/auth';
import { savePlaceIds, getSavedPlacesIds } from '../src/utils/localStorage';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const SearchPosts = () => {
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedPostIds, setSavedPostIds] = useState(getSavedPlacesIds());

    useEffect(() => {
        return () => savePlaceIds(savedPostIds);
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

        const postData = items.map((post) => ({
            title: post.title,
            body: post.body,
            author: post.author,
            comments: post.comments,
        }));
        setSearchedPosts(postData);
        setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSavePost = async (postId) => {
        const postToSave = searchedPosts.find((post) => post.postId === postId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await savePlaceIds({
                variables: { newPost: {...postToSave} },
            });

            setSavedPostIds([...savedPostIds, postToSave.postId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <div fluid className='text-light bg-dark'>
            <Container>
                <h1>Search for Posts!</h1>
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
                                            {searchedPosts.length
                                            ? `Viewing ${searchedPosts.length} results:`
                                        : 'search for a post to begin'}
                                            </h2>
                                            <CardColumns>
                                                {searchedPosts.map((book) => {
                                                    return (
                                                        <Card key={post.postId} border='dark'>
                                                        <Card.Body>
                                                            <Card.Title>{post.title}</Card.Title>
                                                            <p className='small'>Author: {post.author}</p>
                                                            {Auth.loggedIn() && (
                                                                <Button
                                                                disabled={savedPostIds?.some(
                                                                    savedPostId => savedPostId === post.postId
                                                                )}
                                                                className='btn-block bt-info'
                                                                onClick={() => handleSavePost(post.postId)}
                                                                >
                                                                    {savedPostIds?.some(
                                                                        savedPostId => savedPostId === post.postId
                                                                    )
                                                                    ? "This post has already been saved!"
                                                                : "Save this post!"}
                                                                </Button>
                                                            )}
                                                        </Card.Body>
                                                        </Card>
                                                    );
                                                                    })}
                                                                    </CardColumns>
                                                                    </Container>
                                                                    </>

    );
};

export default SearchPlaces