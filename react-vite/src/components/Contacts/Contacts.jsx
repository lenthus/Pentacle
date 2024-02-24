import React, { useEffect, useState } from "react";
import AddContact from "./AddContact";
import Group from "./Group";
import ContactList from "./ContactList";
import "./Contacts.css";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getAllContacts } from "../../redux/contact";
import { getAllGroups } from "../../redux/group";
import {useNavigate, Navigate} from 'react-router-dom'

const Contacts = () => {
    const user = useSelector((state) => state.session.user);
    // if(!user) return <Navigate to='/Splash' replace={true}/>
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userNotLogged = !user?true:false;
    const contacts = useSelector((state)=> state.contacts)
    const groups = useSelector((state) => state.groups)

    useEffect(()=>{
        if(userNotLogged){
        navigate('../splash')
        }
    },[userNotLogged])

    useEffect(()=>{
        dispatch(getAllContacts(user.id))
        .then(() => dispatch(getAllGroups(user.id)))
        .then(() => setIsLoading(false));
    },[dispatch])

    if(!isLoading){

  return (
    <>
      <div className="ContactsBox">
        <div className="AddContactComponent">
          <AddContact user={user} contacts={contacts} groups={groups}/>

        </div>
        <div className="ContactListComponent">
          <ContactList user={user} contacts={contacts} groups={groups}/>

        </div>
        <div className="GroupComponent">
          <Group user={user} contacts={contacts} groups={groups}/>
        </div>
      </div>
    </>
  );}else{
    return (
        <>Loading</>
    )
  }
};

export default Contacts;
