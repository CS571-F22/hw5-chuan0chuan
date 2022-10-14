import React, { useContext } from 'react';

import { BadgerAuthContext } from '../../context/BadgerAuthContext';

export default function BadgerRegister() {
    const [authToken, setAuthToken] = useContext(BadgerAuthContext);

    // TODO Create the register component.

    return <>
        <h1>Register</h1>
    </>
}