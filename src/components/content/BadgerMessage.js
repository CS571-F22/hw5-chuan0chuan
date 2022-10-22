import React, {memo, useContext} from "react"
import { Button } from "react-bootstrap";
import { BadgerUserContext } from '../../context/BadgerUserContext';
import {useCallback} from "react";
function BadgerMessage(props) {
    const [username, setUsername] = useContext(BadgerUserContext);
    const id = useCallback(() => {
            props.handleDelete(props.id);
        }
    , [props]);

    if(props.poster.match(username) && username !== undefined){
    return <>
        <h2>{props.title}</h2>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        <Button variant="danger" onClick={id}> Delete Post</Button>
    </>}
    else{
        return <>
        <h2>{props.title}</h2>
        <i>{props.poster}</i>
        <p>{props.content}</p>
    </>
    }
}

// TODO Make BadgerMessage a memoized component.
export default memo(BadgerMessage);