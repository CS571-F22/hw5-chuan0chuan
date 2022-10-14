import React, { useContext } from 'react';

import { BadgerAuthContext } from '../../context/BadgerAuthContext';

export default function BadgerLogin() {
    const [authToken, setAuthToken] = useContext(BadgerAuthContext);

    // TODO Create the login component.

    return <>
        <h1>Login</h1>
    </>
}