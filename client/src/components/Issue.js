import React, { useState } from 'react';
import Votes from './Votes'
import styled from 'styled-components'

const ReadMore = styled.span`
    color: mediumblue;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`

function Issue(props) {
    const { title, description, _id, user, upVoters, downVoters } = props
    const [expanded, setExpanded] = useState(false)

    // function handleClick(e) {
    //     e.preventDefault()
    //     e.stopPropagation()
    // }

    function handleExpand(e) {
        e.preventDefault()
        setExpanded(prev => !prev)
    }

    return (
        <div className="issue">
            <div className="issueContent">
                <h3>{title}</h3>
                <p className="author">Posted by {user?.username}</p>
                <p className="description">
                    {description.length > 450 && !expanded ? 
                    <>
                        {description.substring(0, 449) + "... "}
                        <ReadMore onClick={handleExpand}>read more</ReadMore>
                    </> : 
                        description.length > 450 ? 
                    <>
                        {description} <ReadMore onClick={handleExpand}>read less</ReadMore>
                    </> : 
                    description
                    }
                </p>
            </div>
            <Votes _id={_id} votes={{upVotes: upVoters, downVotes: downVoters}} postType="issue" />
        </div>
    );
}

export default Issue;