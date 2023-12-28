import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { QUERY_SINGLE_POST } from "../utils/queries";
import { REMOVE_POST } from "../utils/mutations";
import Auth from "../utils/auth";

const SinglePost = () => {
  const { postId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });

  const [removePost] = useMutation(REMOVE_POST);

  if (loading) {
    return <div>Loading...</div>;
  }

  const post = data?.post || {};

  const handleDelete = async () => {
    try {
      await removePost({
        variables: { postId: post._id },
      });
      window.location.href = "/me";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w[1040px] mx-auto">
      <div
        className="w-full flex-1 bg-gradient-to-r from-[#6b6e70] via-[#86C232] to-[#86C232] text-[#86C232] relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(12, 10, 9, 0.8), rgba(12, 10, 9, 0.6)), url('https://i.pinimg.com/564x/00/fb/6b/00fb6ba65cb65b726f49b56f9f94aaff.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 4rem)", 
        }}
      >
        <div className="px-4 py-3 w-full flex flex-col items-center">
          <div className="p-4 mb-6">
            <h3 className="text-xl font-bold mb-2 text-[#86c232]">
              {post.author} <br />
              <span className="text-sm text-[#a3a3a3]">
                had this adventure on {post.createdAt}
              </span>
            </h3>
            <div className=" p-4 mb-4">
              <blockquote>
                <h2 className="text-2xl mb-2 text-white">{post.title}</h2>
                <p className="text-lg p-4 rounded-md">{post.body}</p>
              </blockquote>
            </div>
            {Auth.loggedIn() && Auth.getProfile().data.username === post.author ? (
              <div className="flex justify-end">
                <button
                  onClick={handleDelete}
                  className="text-[#86C232] hover:text-white font-semibold py-3 px-4 mr-4 hover:bg-[#86C232] hover:border-[#86C232] rounded-lg"
                >
                  Delete Post
                </button>
              </div>
            ) : null}
            <div className="my-5">
              <CommentList comments={post.comments} />
            </div>
            <div className="p-4 rounded-lg">
              <CommentForm postId={post._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
