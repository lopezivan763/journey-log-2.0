import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addComment({
                variables: {
                    postId,
                    commentText,
                    commentAuthor: Auth.getProfile().data.username,
                },
            });

            setCommentText('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'commentText' && value.length <= 500) {
            setCommentText(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div>
            <h4>Comment Section</h4>

            {Auth.loggedIn() ? (
                <>
                    <p
                        className={`m-0 ${characterCount === 500 || error ? 'text-danger' : ''
                            }`}
                    >
                        Character Count: {characterCount}/500
                        {error && <span className="ml-2">{error.message}</span>}
                    </p>
                    {/* <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          > */}
                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <Label for="exampleText">
                                Text Area
                            </Label>
                            <Input
                                id="exampleText"
                                name="text"
                                type="textarea"
                            placeholder="Add your comment..."
                            value={commentText}
                            style={{ lineHeight: '1.5', resize: 'vertical' }}
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <Button>
                            Add Comment
                        </Button>
                </Form>
        </>
    ) : (
        <p>
            You need to be logged in to comment on a post. Please{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
    )
}
    </div >

    )
};
export default CommentForm;