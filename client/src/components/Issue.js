import React from 'react';
import Votes from './Votes'

function Issue(props) {
    const { title, description, _id, user: { username }, upVoters, downVoters } = props

    function handleClick(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div className="issue">
            <div className="issueContent">
                <h3>{title}</h3>
                <p className="author">Posted by {username}</p>
                <p className="description">{description}</p>
            </div>
            <Votes _id={_id} votes={{upVotes: upVoters, downVotes: downVoters}} postType="issue" />
        </div>
    );
}

export default Issue;