import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

const CommentForm = ({ postId }) => {
  const [commentData, setCommentData] = useState({ commentText: '' });
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addComment({
        variables: {
          postId: postId,
          ...commentData,
        },
      });
      console.log(data);
      setCommentData({ commentText: '' }); 
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value.length <= 280) {
      setCommentData({
        ...commentData,
        [name]: value,
      });
      setCharacterCount(value.length);
    }
  };

  return (
    <div className='max-w-[500px] mx-auto bg-[#0c0a09] p-4 text-[#86c232] rounded-lg'>
      {/* <h4 className='text-xl font-bold mb-2'>Comment Experience</h4> */}
      {Auth.loggedIn() ? (
        <>
          <p className={`text-sm mb-2 ${characterCount === 280 || error ? 'text-red-500' : ''}`}>
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form className="flex flex-col items-start" onSubmit={handleFormSubmit}>
            <textarea
              name="commentText"
              placeholder="Add your comment..."
              value={commentData.commentText}
              className="bg-[#0c0a09] border border-[#86c232] text-[#86c232] rounded-md p-2 w-full mb-2 resize-none focus:outline-none focus:ring focus:border-[#86c232]"
              style={{ lineHeight: '1.5', minHeight: '80px' }}
              onChange={handleChange}
            />
            <button className="bg-[#86c232] border border-[#86c232] text-[#0c0a09] rounded-md p-2 w-full hover:bg-transparent hover:text-[#86c232] transition-colors duration-300" type="submit">
              Add Comment
            </button>
          </form>
        </>
      ) : (
        <p className="text-sm text-white">
          You need to be logged in to share your experience. Please{' '}
          <Link to="/login" className="text-[#86c232] hover:underline">
            login
          </Link> or{' '}
          <Link to="/signup" className="text-[#86c232] hover:underline">
            signup
          </Link>.
        </p>
      )}
    </div>
  );
};

export default CommentForm;
