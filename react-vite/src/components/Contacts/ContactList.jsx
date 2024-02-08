import React from "react";
import "./Contacts.css"

const ContactList = ({contacts,user}) =>{

    console.log("from Contactlist",user)
    console.log("from Contactlist",contacts)
    return (
        <>
        <div
        className="ContactListBox"
        >
        <h1>Contacts for {user.username}</h1>
        <ul>
        {Object.values(contacts).map(contact =>(<li>{contact.firstname}</li>))}
        </ul>
        </div>
        </>
    )
}

export default ContactList
