import React from 'react';
import { Card, Container, Button, CardColumns } from 'reactstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../src/utils/queries';
import Auth from '../src/utils/auth';
import { removePostId } from '../src/utils/localStorage';

const SavedPosts = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  if (!userData?.email) {
    return (
      <h4>
        You need to be logged in!
      </h4>
    );
  }

  const handleDeletePost = (postId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    const updatedSavedPosts = userData.savedPosts.filter((post) => post.postId !== postId);

    const updatedUserData = {
      ...userData,
      savedPosts: updatedSavedPosts,
    };

    removePostId(postId);

    console.log('Deleted post:', postId, 'Updated userData:', updatedUserData);
  };

  if (loading) {
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
            ? `Viewing ${userData.savedPosts.length} saved ${
                userData.savedPosts.length === 1 ? 'post' : 'posts'
              }:`
            : 'You have no saved posts!'}
        </h2>
        <CardColumns>
          {userData.savedPosts.map((post) => {
            return (
              <Card key={post.postId} border='dark'>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <p className='small'>Authors: {post.authors}</p>
                  {post.link ? (
                    <Card.Text>
                      <a href={post.link} target='_blank' rel='noopener noreferrer'>
                        More Information
                      </a>
                    </Card.Text>
                  ) : null}
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeletePost(post.postId)}
                  >
                    Delete this Post
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};
export default SavedPosts;
