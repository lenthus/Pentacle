import React from "react";
import "./Contacts.css"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditContactModal from "./EditContactModal";
import { useState } from "react";

const ContactList = ({contacts,user,groups}) =>{
    const [groupEdit, setGroupEdit]= useState("")
    const handleGroupEdit = (e)=> setGroupEdit(e.target.value)


    const groupFilter = Object.values(contacts).filter((contact)=>Object.keys(contact.groups).includes(groupEdit))


    return (
        <>
        <div
        className="ContactListBox"
        >
        <h1>Contacts for {user?.username} by Group</h1>
        <select
        style={{width:'50%',height:30}}
        type = "dropdown"
        defaultValue=""
        onChange={handleGroupEdit}
        placeholder="Select a Group"
        >
        <option key='blankKey' hidden value >Select a Group</option>
        {groups?Object.values(groups).map(group =>(<option value={group.id}>{group.name}</option>)):placeholder="Create a Group"}
        </select>
        <ol>
        {groupFilter.map(contact =>(
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
