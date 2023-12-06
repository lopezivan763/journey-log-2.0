

import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    return (
        <main>
        <div className="flex-row justify-center mx-auto">
          <div
            className="col-12 col-md-10 mb-3 p-3 mx-auto"
            style={{ border: '3px dotted #1a1a1a' }}
          >
            <PostForm />
          </div>
          <div className="col-12 col-md-8 mb-3 mx-auto">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <PostList
                posts={posts}
                title="Where will your journey take you?"
              />
            )}
          </div>
        </div>
      </main>
    );
            };
        
            export default Home;
