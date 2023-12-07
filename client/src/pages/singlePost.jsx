import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_POST } from '../utils/queries';

const SinglePost = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { postId } = useParams();
  
    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
      // pass URL parameter
      variables: { postId: postId },
    });
  
    const post = data?.post || {};
  
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card bg-primary text-light border-rounded">
              <h3 className="card-header p-2">
                {post.author} <br />
                <span style={{ fontSize: '1rem' }}>
                  had this adventure on {post.createdAt}
                </span>
              </h3>
              <div className="card-body p-4 bg-dark rounded text-primary py-4">
                <blockquote className="p-4">
                  <h2>{post.title}</h2>
                  <h4 className="text-dark bg-light"style={{ border: '1px dotted #1a1a1a' }}>{post.body}</h4>
                </blockquote>
              </div>
              <div className="my-5">
                <CommentList comments={post.comments} />
              </div>
              <div className="m-3 p-4 bg-dark text-light">
                <CommentForm postId={post._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SinglePost;
  