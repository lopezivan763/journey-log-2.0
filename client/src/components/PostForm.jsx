import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

//bug fixed
const PostForm = () => {
  const [postData, setPostData] = useState({title: "", body: ""});

  const [characterCount, setCharacterCount] = useState(0);

  const [createPost, { error }] = useMutation
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
    console.log(postData);

    try {
      const { data } = await createPost({
        variables: {
          ...postData
        },
      });
console.log(data);
      //setPostText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (value.length <= 1000) {
     // setPostText(value);
      setPostData({
        ...postData,
        [name]:value,
      })
      setCharacterCount(value.length);
    }
  };

return (
  <div className='text-center'>
  <h3>Journey entry</h3>
  
  {Auth.loggedIn() ? (
    <>
      <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <textarea
            name="title"
            placeholder="Title"
            value={postData.title}
            className="form-input w-100"
            style={{ lineHeight: '1.5', resize: 'vertical' }}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-9">
          <textarea
            name="body"
            placeholder="Body"
            value={postData.body}
            className="form-input w-100"
            style={{ lineHeight: '1.5', resize: 'vertical' }}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add a new adventure
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            {error.message}
          </div>
        )}
      </form>
    </>
  ) : (
    <p>
      You need to be logged in to start your next log entry. Please{' '}
      <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
    </p>
  )}
</div>
)





};

export default PostForm;