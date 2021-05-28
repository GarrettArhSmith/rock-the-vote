import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider'
import { Link } from 'react-router-dom'

import Issue from './Issue'

function Profile(props) {
    const { user: { username }, userIssues, getUserIssues } = useContext(UserContext)

    useEffect (() => {
        getUserIssues()
        console.log("USE EFFECT RAN in profile!")
    }, [])

    return (
        <div className="content">
            <h1>{username[0].toUpperCase() + username.substring(1)}'s Profile</h1>
            <div className="issueList">
                {[...userIssues].reverse().map(issue => (
                    <Link to={`/${issue._id}`} key={issue._id} className="issueLink">
                            <Issue {...issue} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Profile;