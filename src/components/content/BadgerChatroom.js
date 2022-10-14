import React, { useCallback, useContext, useEffect, useState } from "react"

import { BadgerAuthContext } from "../../context/BadgerAuthContext";

export default function BadgerChatroom(props) {

    const [authToken, setAuthToken] = useContext(BadgerAuthContext);

    const [messages, setMessages] = useState([]);

    const loadMessages = useCallback(() => {
        fetch(`https://coletnelson.us/cs571/f22/hw5/api/chatroom/${props.name}/messages`).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    }, [props]);

    useEffect(() => {
        loadMessages()
    }, [props, loadMessages]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
        }
        {
            messages.length > 0 ?
                <>
                    {
                        /* TODO: Complete displaying of messages. */
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}