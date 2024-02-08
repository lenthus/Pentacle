import React from "react";
import "./Contacts.css"
import { useState } from "react";



const AddContact = ({user,contacts}) =>{
    const [firstname, setFirstname]= useState("")
    const [lastname, setLastname]= useState("")
    const [email_address, setEmail_address] = useState("")
    const [group, setGroup] = useState("")

    const handleSubmit = () =>{
        // e.preventDefault()
        if (email_address.length >= 1){
        const payload = {
                        firstname:firstname,
                        lastname:lastname,
                        email_address:email_address,
                        group:group,
                        }

        dispatch(updateContactMaker(payload,contact.id))
        closeModal()
    }
    else {
        alert("Email Address is required")
    }
    }

    const handleFirstname = (e)=> setFirstname(e.target.value)
    const handleLastname = (e)=> setLastname(e.target.value)
    const handleEmail = (e)=> setEmail_address(e.target.value)
    const handleGroup = (e)=> setGroup(e.target.value)

    return(
        <><div className="AddContactBox">
        <h1>Add A New Contact</h1>
        <form className="newContactForm" onSubmit={handleSubmit} >

        </form>

        </div></>
    )
}

export default AddContact
