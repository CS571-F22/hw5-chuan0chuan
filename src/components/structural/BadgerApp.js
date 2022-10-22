import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BadgerAuthContext } from '../../context/BadgerAuthContext';
import { BadgerUserContext } from '../../context/BadgerUserContext';
import BadgerLayout from './BadgerLayout';
import BadgerLogin from '../auth/BadgerLogin';
import BadgerRegister from '../auth/BadgerRegister';
import BadgerLogout from '../auth/BadgerLogout';
import BadgerChatroom from '../content/BadgerChatroom';
import BadgerChatHome from '../content/BadgerChatHome';
import BadgerNoMatch from '../content/BadgerNoMatch';


function BadgerApp() {

  const [chatrooms, setChatrooms] = useState([]);
  const [authToken, setAuthToken] = useState(undefined);
  const [username, setUsername] = useState();

  useEffect(() => {
    fetch('https://coletnelson.us/cs571/f22/hw5/api/chatroom').then(res => res.json()).then(json => {
      setChatrooms(json)
    })
  }, []);

  return (
    <BadgerUserContext.Provider value={[username, setUsername]}>
    <BadgerAuthContext.Provider value={[authToken, setAuthToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BadgerLayout chatrooms={chatrooms} />}>
            <Route index element={<BadgerChatHome />} />
            <Route path="/login" element={<BadgerLogin />}></Route>
            <Route path="/register" element={<BadgerRegister />}></Route>
            <Route path="/logout" element={<BadgerLogout />}></Route>
            {
              chatrooms.map(chatroom => {
                return <Route key={chatroom} path={`chatrooms/${chatroom}`} element={<BadgerChatroom name={chatroom}/>} />
              })
            }
            <Route path="*" element={<BadgerNoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BadgerAuthContext.Provider>
    </BadgerUserContext.Provider>
  );
}

export default BadgerApp;
