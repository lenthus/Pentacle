import React, { useEffect, useState } from "react";
import AddContact from "./AddContact";
import Group from "./Group";
import ContactList from "./ContactList";
import "./Contacts.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllContacts } from "../../redux/contact";

const Contacts = () => {
    const user = useSelector((state) => state.session.user);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userNotLogged = !user?true:false;
    const contacts = useSelector((state)=> state.contacts)

    useEffect(()=>{
        if(userNotLogged){
        navigate('../splash')
        }
    },[userNotLogged])

    useEffect(()=>{
        dispatch(getAllContacts(user.id))
        .then(() => setIsLoading(false));
    },[dispatch])
    // const passDown = {contacts}
    console.log("from Contacts contacts",contacts)
    if(!isLoading){

  return (
    <>
      <div className="ContactsBox">
        <div className="AddContactComponent">
          <AddContact user={user} contacts={contacts}/>
          <hr className='solid'/>
        </div>
        <div className="ContactListComponent">
          <ContactList user={user} contacts={contacts}/>
          {/* <hr className='solid'/> */}
        </div>
        <div className="GroupComponent">
          <Group user={user} contacts={contacts}/>
          <hr className='solid'/>
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
