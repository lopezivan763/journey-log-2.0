const CommentList = ({ comments = [] }) => {
    if (!comments.length) {
      return <h3 className="text-center">No Comments Yet</h3>;
    }
    return (
      <>
        <h3 className="p-4 mb-4 text-light bg-primary rounded text-center">
          Comments
        </h3>
        <div className="row justify-content-center row-cols-1 row-cols-lg-2 g-4">
          {comments.map((comment) => (
            <div key={comment._id} className="col">
              <div className="card bg-dark text-light">
                <div className="card-header bg-primary text-dark">
                  <strong>{comment.commentAuthor}</strong> commented on{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="card-body" style={{ backgroundColor: '#333' }}>
                  <p className="card-text text-light">{comment.commentText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
    
export default CommentList;