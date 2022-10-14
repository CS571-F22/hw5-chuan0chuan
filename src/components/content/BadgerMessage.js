import React from "react"

function BadgerMessage(props) {
    return <>
        <h2>{props.title}</h2>
        <i>{props.poster}</i>
        <p>{props.content}</p>
    </>
}

// TODO Make BadgerMessage a memoized component.
export default BadgerMessage;