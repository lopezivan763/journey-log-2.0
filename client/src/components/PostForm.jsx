import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const PostForm = () => {
  const [createPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [QUERY_POSTS, 'getPosts', QUERY_ME, 'me'],
  });
  const [postData, setPostData] = useState({ title: '', body: '' });
  const [characterCount, setCharacterCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
 
 
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const { data } = await createPost({
        variables: { ...postData },
        refetchQueries: [{ query: QUERY_POSTS }, { query: QUERY_ME }],
      });
  
      setPostData({ title: '', body: '' });
      setCharacterCount(0);
      closeModal();
    } catch (err) {
      console.error(err.message); 
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (value.length <= 1000) {
      setPostData({ ...postData, [name]: value, });
      setCharacterCount(value.length);
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

 

  return (
    <div>
      {!modalIsOpen && (
        <button className='flex flex-wrap text-white m-4 p-4 border border-[#86c232] hover:pointer hover:bg-[#86C232] hover:text-[#0c0a09]' onClick={openModal}>
          Create log entry
        </button>
      )}

      {modalIsOpen && (
        <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="modal bg-[#0c0a09] rounded-lg overflow-hidden shadow-lg">
            <div className="flex justify-between items-center p-4">
              <h3 className="text-white text-2xl">Journey Entry</h3>
              <button onClick={closeModal} className="text-white text-2xl focus:outline-none">&times;</button>
            </div>
            <div className="p-6">
              {Auth.loggedIn() ? (
                <div>
                  <p className={`text-center mb-3 ${characterCount === 280 ? 'text-red-500' : ''}`}>
                    Character Count: {characterCount}/280
                  </p>
                  <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
                    <div className="mb-4">
                      <input
                        type="text"
                        className="rounded border border-[#86C232] text-white bg-[#0c0a09] w-full py-2 px-4 focus:outline-none focus:border-[#86C232] placeholder-gray-400"
                        placeholder="Title"
                        name="title"
                        value={postData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <textarea
                        className="rounded border border-[#86C232] bg-[#0c0a09] text-white w-full py-2 px-4 focus:outline-none focus:border-[#86C232] placeholder-gray-400"
                        placeholder="Body"
                        name="body"
                        value={postData.body}
                        onChange={handleChange}
                        rows={5}
                      ></textarea>
                    </div>
                    <div>
                      <button className="text-white flex-auto  items-center py-3 px-9 border border-[#86C232] hover:bg-[#86C232] hover:text-[#0c0a09]" type="submit">
                        Post
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
                <p className="text-center text-[#6B6E70]">
                  You need to be logged in to start your next log entry. Please{' '}
                  <Link to="/login" className="text-[#86C232] hover:underline">
                    login
                  </Link>{' '}
                  or{' '}
                  <Link to="/signup" className="text-[#86C232] hover:underline">
                    signup
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
