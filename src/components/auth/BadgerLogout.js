import React, { useContext, useEffect } from 'react';

import { BadgerAuthContext } from '../../context/BadgerAuthContext';

export default function BadgerLogout() {

    const [authToken, setAuthToken] = useContext(BadgerAuthContext);

    useEffect(() => {
        setAuthToken(undefined);
    }, [setAuthToken]);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}