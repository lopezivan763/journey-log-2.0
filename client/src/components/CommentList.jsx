const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3 className="text-center text-white">No Comments Yet</h3>;
  }

  return (
    <>
      <h3 className="p-4 mb-4 text-[#86c232] rounded-lg text-center">
        Comments
      </h3>
      <div className="flex flex-wrap h-full justify-center gap-4 p-12">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-[#0c0a09] text-white rounded-lg p-4 w-full sm:w-[45%] lg:w-[30%]"
          >
            <div className="mb-2 text-[#86c232]">
              <strong>{comment.commentAuthor}</strong> commented on{" "}
              <span style={{ fontSize: "0.825rem" }}>{comment.createdAt}</span>
            </div>
            <div style={{ backgroundColor: "#333" }} className="p-3 rounded-md">
              <p className="text-white">{comment.commentText}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
