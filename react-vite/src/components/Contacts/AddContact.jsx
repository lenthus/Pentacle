import React from "react";
import "./Contacts.css"
import { useState } from "react";
import { createContactMaker } from "../../redux/contact";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";



const AddContact = ({user,contacts}) =>{
    const [firstname, setFirstname]= useState("")
    const [lastname, setLastname]= useState("")
    const [email_address, setEmail_address] = useState("")
    const [group, setGroup] = useState("")
    const dispatch = useDispatch()


    const handleSubmit = () =>{
        // e.preventDefault()
        if (email_address.length >= 1){
        const payload = {
                        firstname:firstname,
                        lastname:lastname,
                        email_address:email_address,
                        group:group,
                        user_id:user.id
                        }

        dispatch(createContactMaker(payload))
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
        <form className="newContactForm" >
        <h3>First Name</h3>
        <input
            type = "text"
            name = "First Name"
            defaultValue={firstname}
            onChange={handleFirstname}
        ></input>
        <h3>Last Name</h3>
        <input
            type = "text"
            name = "Last Name"
            defaultValue={lastname}
            onChange={handleLastname}
        ></input>
        <h2>Email Address</h2>
        <input
            type = "text"
            name = "Email"
            defaultValue={email_address}
            onChange={handleEmail}
        ></input>
         <div>
        <h3>Groups</h3>
        <select
        type = "dropdown"
        defaultValue=""
        // onChange={}
        >
        {}
        {/* <option value="1">Easy</option>
        <option value="2">Medium</option>
        <option value="3">Hard</option> */}
        </select>
        </div>
        <div>
        <button
        className="submitContactButton"
        type = "submit"
        onClick={handleSubmit}
        >Save Contact</button>
        </div>
        </form>

        </div></>
    )
}

export default AddContact
