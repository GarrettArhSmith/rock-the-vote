import React, { useState } from 'react';
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserProvider(props) {
    const initUserState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        userIssues: [],
        errMsg: ""
    }
    const [userState, setUserState] = useState(initUserState)
    const [allIssues, setAllIssues] = useState([])
    const [issueComments, setIssueComments] = useState([])

    function signup(credentials) {
        axios.post("/auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prev => ({...prev, token, user}))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post("/auth/login", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                getAllIssues()
                getUserIssues()
                setUserState(prev => ({...prev, token, user}))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState(initUserState)
        window.location.reload()
    }

    function handleAuthErr(errMsg) {
        let finalErrMsg
        if(errMsg === "User validation failed: username: Path `username` is required., password: Path `password` is required.") {
            finalErrMsg = "Missing username or password."
        }
        else finalErrMsg = errMsg
        setUserState(prev => ({...prev, errMsg: finalErrMsg}))
    }

    function resetErrMsg() {
        setUserState(prev => ({...prev, errMsg: ""}))
    }

    function getAllIssues() {
        userAxios.get("/api/issue")
            .then(res => setAllIssues(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserIssues() {
        userAxios.get("/api/issue/user")
            .then(res => setUserState(prevUserState => ({
                ...prevUserState,
                userIssues: res.data
            })))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addIssue(newIssue) {
        userAxios.post("/api/issue", newIssue)
            .then(res => {
                setAllIssues(prev => [...prev, res.data])
                setUserState(prev => ({...prev, userIssues: [...prev.userIssues, res.data]}))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getIssueComments(issueId) {
        userAxios.get(`/api/comment/issue/${issueId}`)
            .then(res => setIssueComments(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addComment(newComment, issueId) {
        userAxios.post(`/api/comment/${issueId}`, newComment)
            .then(res => setIssueComments(prev => [...prev, res.data]))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addVote(issueId, postType, direction) {
        userAxios.put(`/api/vote/${direction}/add/${postType}/${issueId}`)
            .then(res => console.log())
            .catch(err => console.log(err.response.data.errMsg))
    }
    function deleteVote(issueId, postType, direction) {
        userAxios.put(`/api/vote/${direction}/delete/${postType}/${issueId}`)
            .then(res => console.log())
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                addIssue,
                getAllIssues,
                getUserIssues,
                allIssues,
                addComment,
                getIssueComments,
                issueComments,
                resetErrMsg,
                vote: { addVote, deleteVote }
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;