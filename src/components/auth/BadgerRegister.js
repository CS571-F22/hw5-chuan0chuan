import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { BadgerAuthContext } from '../../context/BadgerAuthContext';
import { BadgerUserContext } from '../../context/BadgerUserContext';

export default function BadgerRegister() {
    const [authToken, setAuthToken] = useContext(BadgerAuthContext);
    const [username, setUsername] = useContext(BadgerUserContext);
    //set controlled const for username, password and repassword
    const [usernameVal, setUsernameVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const navigate= new useNavigate();
    const [repasswordVal, setRepasswordVal] = useState("");
    //TODO Create the register component.
    function handleRegister(){
        /*before fetching, check user has input a username and password. I'm not check repassword is empty in here.
        Because I think if user did not entry repassword, the next alert"Your passwords do not match!" is more matched. */
        if(usernameVal ==="" || passwordVal===""){
            alert("You must provide both a username and password!");
        }
        //before fetching, check user has input same password and repassword also can't be null
        else if(!passwordVal.match(repasswordVal) || repasswordVal===""){
            alert("Your passwords do not match!");
        }
         else {
        //fetch the information within this url, after users input their username and password
        fetch("https://www.coletnelson.us/cs571/f22/hw5/api/register",{
            method: "POST" ,
            headers :{
                "Content-Type" : "application/json"
            },
            body: 
            //below is js object, need be changed to json,service only accpect json
            JSON.stringify(
            {
                username: usernameVal, //assign value to username
                password: passwordVal,
                refCode: "bid_fa16ab48cc7f"
            })
        }).then(res =>{
            //If res.status is 409 then tell the user the name already exist
            if(res.status === 409){
                alert("That username has already been taken!");
            }if(res.status === 200) {
        return res.json()
            }
        }).then(json =>{
                setAuthToken(json.token);
                setUsername(json.user.username);
                navigate('/');
        })
        console.log(username);
    }
    }
    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="registerUsername">Username</Form.Label>
            <Form.Control value={usernameVal} id ="registerUsername" onChange={(e)=> setUsernameVal(e.target.value)}></Form.Control>
            <Form.Label htmlFor="registerPassword">Password</Form.Label>
            <Form.Control value={passwordVal} id ="registerPassword" type="password" onChange={(e)=> setPasswordVal(e.target.value)}></Form.Control>
            <Form.Label htmlFor="registerRepassword">Repeat Password</Form.Label>
            <Form.Control value={repasswordVal} id ="registerRepassword" type="password" onChange={(e)=> setRepasswordVal(e.target.value)}></Form.Control>
            <Button onClick = {handleRegister} >Register</Button>
        </Form>
    </>
}