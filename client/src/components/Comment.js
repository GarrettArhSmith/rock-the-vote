import React from 'react';
import Votes from './Votes'

function Comment(props) {
    const { user: { username }, comment, _id, upVoters, downVoters } = props

    return (
        <div className="issue">
            <div className="issueContent">
                <p className="author">Posted by {username}</p>
                <p className="description">{comment}</p>
            </div>
            <Votes _id={_id} votes={{upVotes: upVoters, downVotes: downVoters}} postType="comment" />
        </div>
    );
}

export default Comment;