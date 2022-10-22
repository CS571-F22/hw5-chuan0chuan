import React, { useCallback, useContext, useEffect, useState } from "react"
import BadgerMessage from './BadgerMessage';
import { Button, Form } from 'react-bootstrap';
import { BadgerAuthContext } from "../../context/BadgerAuthContext";

export default function BadgerChatroom(props) {

    const [authToken, setAuthToken] = useContext(BadgerAuthContext);
    const [messages, setMessages] = useState([]);
    const [messages1, setMessages1] = useState("");
    const [messages2, setMessages2] = useState("");
    const loadMessages = useCallback(() => {
        fetch(`https://coletnelson.us/cs571/f22/hw5/api/chatroom/${props.name}/messages`).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    }, [props]);

    useEffect(() => {
        loadMessages()
    }, [props, loadMessages]);

//TODO use controlled component
function handleCreatpost(){
    //before fetching, check user has entered title and content
    if(messages1 === "" || messages2 === ""){
        alert("You must provide both a title and content!");
    }
    else{
    //fetch the infor within this url,only if user has entered both title and content
    fetch(`https://www.coletnelson.us/cs571/f22/hw5/api/chatroom/${props.name}/messages`,{
        method: "POST",
        headers:{
            "Content-Type" : "application/json", "Authorization": "Bearer " + authToken
        },
        body: 
        //below is JS object, need be changed to json,service only accpect json
        JSON.stringify(
        {
            title: messages1, //assign value to title
            content: messages2 //assign value to content
        })
    }).then(res =>{
        //IF res.status is 401
        if(res.status === 401){
            alert("You must be logged in to post!");
        }
        if(res.status === 200) {
            return res.json();
        }
    }).then(json =>{
        if (json.msg) { 
        alert(json.msg)
        loadMessages()
    } })
}
}
//TODO if BadgerMessage.Poster equal username, can do delete method.
function Delete(msid){
    //fetch the information within this url, after users input their username and password
    fetch(`https://coletnelson.us/cs571/f22/hw5/api/chatroom/${props.name}/messages/${msid}`,{
        method: "DELETE" ,
        headers :{
            "Authorization": "Bearer " + authToken
        },
    }).then(res =>{
        //console.log(props.id+"!!!!");
        if(res.status === 401){
            alert("You must be logged in to post!");
        }
        if(res.status === 200) {
    return res.json()
        }
    }).then(json =>{
        if (json.msg) { 
            alert(json.msg)
            loadMessages()
        }
    })
}
    return <>
        <h1>{props.name} Chatroom</h1>
        {   
        /* TODO: Allow an authenticated user to create a post. */
                <Form>
                    <Form.Label htmlFor="postTitle">Post Title</Form.Label>
                    <Form.Control value={messages1} id ="postTitle" onChange={(e)=> setMessages1(e.target.value)}></Form.Control>
                    <Form.Label htmlFor="postContent">Post Content</Form.Label>
                    <Form.Control value={messages2} id ="postContent"  onChange={(e)=> setMessages2(e.target.value)}></Form.Control>
                    <Button onClick = {handleCreatpost}>Create Post</Button>
                </Form>
        }

        {
            messages.length > 0 ?
                <>
                    {
                        /* TODO: Complete displaying of messages. */
                        messages.map((ms) => {
                            return<BadgerMessage key = {ms.id} {...ms}
                            handleDelete={Delete}> 
                            </BadgerMessage>
                        })

                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}