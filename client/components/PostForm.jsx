import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
  const [PostText, setPostText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation
  (ADD_POST, {
    refetchQueries: [
      QUERY_POSTS,
      'getPosts',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          PostText,
          PostAuthor: Auth.getProfile().data.username,
        },
      });

      setPostText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 1000) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

return (
    <div>


        
    </div>
)





};

export default PostForm;