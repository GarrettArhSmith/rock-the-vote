import { set } from 'mongoose';
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider'

function IssueForm(props) {
    const { _id, type } = props
    const { addIssue, addComment } = useContext(UserContext)

    const initInputs = type === "issue" ? { title: "", description: "" } : { comment: "" }
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
        type === "issue" ?
        addIssue(inputs) :
        addComment(inputs, _id)
        setInputs(initInputs)
    }

    return (
        <form type="submit" onSubmit={handleSubmit} className="issueForm">
            {type === "issue" && (
                <>
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text"
                        name="title"
                        value={inputs.title}
                        onChange={handleChange}
                        className="titleInput"
                        placeholder="Title..."
                    />
                </>
            )}
            <label htmlFor="text">{type === "issue" ? "Description" : "Comment"}</label>
            <textarea 
                type="text"
                name={type === "issue" ? "description" : "comment"}
                value={type === "issue" ? inputs.description : inputs.comment}
                onChange={handleChange}
                className="formTextArea"
                placeholder={type === "issue" ? "Description..." : "Comment..."}
            />
            <button>POST</button>
        </form>
    );
}

export default IssueForm;