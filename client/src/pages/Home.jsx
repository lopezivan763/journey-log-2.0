import { useQuery } from "@apollo/client";
import PostList from "../components/PostList";
import { QUERY_POSTS } from "../utils/queries";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  const limitedPosts = posts.slice(0, 5);

  return (
    <div className="max-w[1040px] mx-auto">
      <div
        className="w-full px-4 flex justify-center bg-gradient-to-r from-[#6b6e70] via-[#86C232] to-[#86C232] text-[#86C232] relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(12, 10, 9, 0.8), rgba(12, 10, 9, 0.6)), url('https://i.pinimg.com/564x/00/fb/6b/00fb6ba65cb65b726f49b56f9f94aaff.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 4rem)",
        }}
      >
        <div className="px-4 py-3 w-full flex flex-col">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#C5C6C7]">
            <TypeAnimation
              sequence={[
                "Travel...",
                2000,
                "Experience...",
                2000,
                "Discover...",
                2000,
                "Log it...",
                2000,
              ]}
              wrapper="span"
              speed={50}
              style={{
                fontSize: "1em",
                paddingLeft: "5px",
                display: "inline-block",
              }}
              repeat={Infinity}
            />
          </h1>
          {loading ? <div>Loading...</div> : <PostList posts={limitedPosts} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
