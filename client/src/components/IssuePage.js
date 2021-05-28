import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserProvider';

import Issue from './Issue';
import IssueForm from './IssueForm'
import Comment from './Comment'

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function IssuePage(props) {
    const { issueId } = useParams()

    const { issueComments, getIssueComments } = useContext(UserContext)
    const [issue, setIssue] = useState(false)

    function getOneIssue() {
        userAxios.get(`/api/issue/${issueId}`)
            .then(res => setIssue(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }
    
    useEffect(() => {
        getOneIssue()
        getIssueComments(issueId)
    }, [])

    return (
        <div className="content">
            {issue && <Issue {...issue} />}
            <IssueForm type="comment" _id={issueId} />
            <div className="issueList">
                {[...issueComments]?.reverse()?.map(comment => (
                    <Comment key={comment._id} {...comment} />
                ))}
            </div>
        </div>
    );
}

export default IssuePage;