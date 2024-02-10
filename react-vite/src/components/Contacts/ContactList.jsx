import React from "react";
import "./Contacts.css"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditContactModal from "./EditContactModal";

const ContactList = ({contacts,user,groups}) =>{

    console.log("from Contactlist",user)
    console.log("from Contactlist",contacts)
    return (
        <>
        <div
        className="ContactListBox"
        >
        <h1>Contacts for {user.username}</h1>
        <ol>
        {Object.values(contacts).map(contact =>(
        <li key={contact.id}>Name: {`${contact.firstname} ${contact.lastname}  `}
        <i className="fa-regular fa-envelope"></i>{ contact.email_address}
        <OpenModalButton
        buttonClass={"fa-regular fa-pen-to-square"}
        // onButtonClick={handleCompleted}
        modalComponent={<EditContactModal contact={contact} groups={groups}/>}
        />
        </li>

        ))}
        </ol>
        </div>
        </>
    )
}

export default ContactList
