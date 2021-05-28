import React, { useContext } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Auth from './components/Auth'
import Public from './components/Public'
import Profile from './components/Profile'
import IssuePage from './components/IssuePage'
import { UserContext } from './context/UserProvider'

function App() {
    const { token, logout, user } = useContext(UserContext)

    return (
        <div className="App">
            <Nav logout={logout} token={token} {...user} />
            <Switch>
                <Route exact path="/">
                    {token ? <Public /> : <Auth />}
                </Route>
                <Route path="/profile">
                    {token ? <Profile /> : <Auth />}
                </Route>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Route path="/:issueId">
                    <IssuePage />
                </Route>
            </Switch>
        </div>
    );
}

export default App;