import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider'
import { Link } from 'react-router-dom'

import IssueForm from './IssueForm'
import Issue from './Issue'

function Public(props) {
    const { user: { username }, allIssues, getAllIssues } = useContext(UserContext)

    useEffect (() => {
        getAllIssues()
        console.log("USE EFFECT RAN!")
    }, [])

    return (
        <div className="content">
            <h1>Home</h1>
            <h3>Hi, {username[0].toUpperCase() + username.substring(1)}!</h3>
            <IssueForm type="issue" />
            <div className="issueList">
                {[...allIssues].reverse().map(issue => {
                    return (
                        <Link to={`/${issue._id}`} key={issue._id} className="issueLink">
                            <Issue {...issue} />
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}

export default Public;