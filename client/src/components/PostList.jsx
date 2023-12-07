import { Link } from 'react-router-dom';

const PostList = ({
    posts,
    title,
    showTitle = true,
    showUsername = true,
}) => {
    if(!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row">
          {showTitle && (
            <h3 className="text-center mb-4">{title}</h3>
          )}
          {posts &&
            posts.map((post) => (
              <div key={post._id} className="col-lg-6 mb-4">
                <div className="card bg-dark text-dark">
                  <h4 className="card-header bg-primary text-dark p-2 m-0">
                    {showUsername ? (
                      <Link
                        className="text-dark"
                        to={`/profiles/${post.author}`}
                      >
                        {post.author} <br />
                        <span style={{ fontSize: '1rem' }}>
                          Made this post on {post.createdAt}
                        </span>
                      </Link>
                    ) : (
                      <span style={{ fontSize: '1rem' }}>
                        You made this post on {post.createdAt}
                      </span>
                    )}
                  </h4>
                  <div className="card-body bg-secondary p-2">
                    <h1 className="text-dark">{post.title}</h1>
                    <h4 className="text-light">{post.body}</h4>
                  </div>
                  <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/posts/${post._id}`}
                  >
                    Join the discussion on this journey.
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

export default PostList;