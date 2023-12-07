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
      
setPostData({ title: '', body: '' });
setCharacterCount(0);
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
  <div className="container">
      <h3 className="text-center mb-4">Journey Entry</h3>
      {Auth.loggedIn() ? (
        <div>
          <p className={`text-center mb-3 ${characterCount === 280 || error ? 'text-danger' : ''}`}>
            Character Count: {characterCount}/280
          </p>
          <form className="row g-3" onSubmit={handleFormSubmit}>
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                value={postData.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Body"
                name="body"
                value={postData.body}
                onChange={handleChange}
                rows={5}
              ></textarea>
            </div>
            <div className="col-12">
              <button className="btn btn-primary btn-block" type="submit">
                Add a New Adventure
              </button>
            </div>
            {error && (
              <div className="col-12 text-white bg-danger p-3">
                {error.message}
              </div>
            )}
          </form>
        </div>
      ) : (
        <p className="text-center">
          You need to be logged in to start your next log entry. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
        </p>
      )}
    </div>
  );
};

export default PostForm;