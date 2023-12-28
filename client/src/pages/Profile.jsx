import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }


 
  return (
    <div className='max-w[1040px] flex h-screen'>
      <div className="w-full flex-1 bg-gradient-to-r from-[#6b6e70] via-[#86C232] to-[#86C232] text-[#86C232] relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(12, 10, 9, 0.8), rgba(12, 10, 9, 0.6)), url('https://i.pinimg.com/564x/00/fb/6b/00fb6ba65cb65b726f49b56f9f94aaff.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="px-4 py-3 w-full h-full flex flex-col items-center">
          <h2 className="text-3xl text-[#C5C6C7] mt-8 mb-4">
            Viewing {userParam ? `${user.username}'s` : 'your'} profile.
          </h2>
      
          <div className="overflow-y-auto">
            <PostList
              posts={user.posts}
              title={`${user.username}'s adventures...`}
              showTitle={false}
              showUsername={false}
              customStyles={{
                backgroundColor: '#f4f4f4',
                padding: '20px',
                borderRadius: '8px',
              }}
            />
          </div>
          {!userParam && (
          <div className='flex flex-wrap'>
          <PostForm />
        </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Profile;


