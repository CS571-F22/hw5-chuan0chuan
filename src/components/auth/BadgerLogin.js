import React, { useContext, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { BadgerAuthContext } from '../../context/BadgerAuthContext';
import { BadgerUserContext } from '../../context/BadgerUserContext';
export default function BadgerLogin() {
    const [authToken, setAuthToken] = useContext(BadgerAuthContext);
    const navigate= new useNavigate();
    const [username, setUsername] = useContext(BadgerUserContext);
    // TODO Create the login component.
    const usernameRef = useRef();
    const passwordRef = useRef();
    function handleRegister(){
        //before fetching, check user has entered username and password
        if(usernameRef ==="" || passwordRef===""){
            alert("You must provide both a username and password!");
        }
        //fetch the infor within this url, only if user enter username and password
        else{
            fetch("https://www.coletnelson.us/cs571/f22/hw5/api/login",{
            method: "POST" ,
            headers :{
                "Content-Type" : "application/json"
            },
            body: 
            //below is js object, need be changed to json,service only accpect json
            JSON.stringify(
            {
                username: usernameRef.current.value, //assign value to username
                password: passwordRef.current.value  //assign value to password
            })
            }).then(res =>{
                //If res.status is 404 then 
                if (res.status === 404){
                    alert("Incorrect username!");
                }
                //If res.status is 409 then 
                if (res.status === 409){
                    alert("Incorrect password!");
                }
                //If the login is successful, the following 200 will be sent and return json. and navigation.
                if(res.status === 200) {
                return res.json()
                }
            })
            .then(json =>{
            setUsername(usernameRef.current.value)
            setAuthToken(json.token);
            navigate('/');
            })
        }  
        

    }

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor="registerUsername">Username</Form.Label>
            <Form.Control ref={usernameRef} id ="registerUsername"></Form.Control>
            <Form.Label htmlFor="registerPassword">Password</Form.Label>
            <Form.Control ref={passwordRef} id ="registerPassword" type="password"></Form.Control>
            <Button onClick = {handleRegister}>Login</Button>
        </Form>
    </>
}