import { Link } from 'react-router-dom';

const PostList = ({ posts, showUsername = true}) => {
  const limitedPosts = posts.slice(0, 10);

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div className='max-w[1040px] h-full'>
      <div className=" flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {limitedPosts.map((post) => (
            <div key={post._id} className="background-color: transparent rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
              <div className="p-4">
                <h4 className="font-bold mb-2">
                  {showUsername ? (
                    <Link className="font-bold" 
                    to={`/profiles/${post.author}`}>
                      {post.author} <br />
                      <span className="text-sm text-[#a3a3a3]">
                        Made this post on {post.createdAt}
                      </span>
                    </Link>
                  ) : (
                    <span className="text-sm text-white">
                      You made this post on {post.createdAt}
                    </span>
                  )}
                </h4>
                <h1 className="text-xl font-bold text-white mb-2">
                  {post.title}</h1>
                <p>{post.body}</p>
                <Link
                  className="block mt-4 py-2 px-4 text-white text-center border border-[#66c232] hover:bg-[#66c232] hover:text-[#0a0a0a] transition duration-300"
                  to={`/posts/${post._id}`}
                >
                  Join Xperience
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
};

export default PostList;
