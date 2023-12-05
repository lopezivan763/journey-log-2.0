import React from 'react';
import { Card, Container, Button, CardColumns } from "reactstrap"
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../src/utils/queries';
import Auth from '../src/utils/auth';
import { removePlaceId } from '../src/utils/localStorage';

const SavedPosts = () => {
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

    const handleDeletePost = async (postId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }

        try {
            await deletePost({
                variables: {postId: postId},
                update: cache => {
                    const data = cache.readQuery({ query: QUERY_ME });
                    const userDataCache = data.me;
                    const savedPostCache = userDataCache.savedPosts;
                    const updatedPostCache = savedPostCache.filter((place) => place.placeId !== placeId);
                    data.me.savedPosts = updatedPostCache;
                    cache.writeQuery({ query: GET_ME, data: {data: {...data.me.savedPosts}}})
                }
            });

            removePlaceId(postId);
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
                <h1>Viewing saved posts!</h1>
                </Container>
                </div>
                <Container>
                    <h2>
                        {userData.savedPosts.length 
                        ? `Viewing ${userData.savedPosts.length} saved ${userData.savedPosts.length === 1 ? 'post' : 'posts'}:`
                        : 'You have no saved posts!'}
                        </h2>
                        <CardColumns>
                            {userData.savedPosts.map((post) => {
                                return (
                                    <Card key={post.potId} border='dark'>
                                        <Card.Body>
                                            <Card.Title>{post.title}</Card.Title>
                                            <p className='small'>Authors: {post.authors}</p>
                                            {post.link ? <Card.Text><a href={post.link} target="blank">More Information</a></Card.Text> : null}
                                            <Button className='btn-block btn-danger' onClick={() => handleDeletePost(post.postId)}>
                                                Delete this Post
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


export default SavedPosts