import React, { useState, useContext } from 'react';
import AuthForm from './AuthForm';
import { UserContext } from '../context/UserProvider'

function Auth(props) {
    const { signup, login, errMsg, resetErrMsg } = useContext(UserContext)

    const initInputs = {
        username: "",
        password: ""
    }
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(true)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)
    }
    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }

    function handleToggle() {
        setToggle(prev => !prev)
        resetErrMsg()
    }

    return (
        <div>
            {toggle ?
            <AuthForm
                handleChange={handleChange}
                handleSubmit={handleSignup}
                inputs={inputs}
                btnText="Sign Up"
                errMsg={errMsg}
            /> :
            <AuthForm
                handleChange={handleChange}
                handleSubmit={handleLogin}
                inputs={inputs}
                btnText="Login"
                errMsg={errMsg}
            />}
            <p 
                className="authToggle"
                onClick={handleToggle}
            >
                {toggle ? "Already a member?" : "Not a member?"}
            </p>
        </div>
    );
}

export default Auth;