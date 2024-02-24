import React from "react";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { updateContactMaker } from "../../redux/contact";
import { contactDeleteFetch } from "../../redux/contact";
import { useSelector, useDispatch } from "react-redux";

const EditContactModal = ({contact,groups}) =>{
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [firstname, setFirstname]= useState(contact.firstname)
    const [lastname, setLastname]= useState(contact.lastname)
    const [email_address, setEmail_address] = useState(contact.email_address)
    const [groupEdit, setGroupEdit] = useState()
    const handleCancel = () => {
        closeModal()
    }
    const handleDelete = (e) => {
        let check = confirm("Delete this Contact?")
        if (check === true){

        dispatch(contactDeleteFetch(contact.id))
        closeModal()
        }
    }
    const handleSubmit = () =>{
        // e.preventDefault()
        if (email_address.length >= 1){
        const payload = {
                        firstname:firstname,
                        lastname:lastname,
                        email_address:email_address,
                        groups:groupEdit,
                        id:contact.id
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
    const handleGroups = (e)=> setGroupEdit(e.target.value)

console.log("from EditContactModal",contact)

    return (
        <div className="editContactBox">
            <div className="buttonDiv"><button
        className="fa-regular fa-trash-can"
        onClick={handleDelete}
        ></button>
        <button
        className="Button"
        onClick={handleCancel}
        type="cancel"
        >Cancel</button>
        </div>
        <form
        className="Edit Contact"
        onSubmit={handleSubmit}
        >
        <h2>Contact Name</h2>
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
         <h2>What groups is this contact associated with?</h2>
         <h3>Groups</h3>
        <select
        type = "dropdown"
        defaultValue=""
        onChange={handleGroups}
        >
        <option key='blankKey' hidden value >Select a Group</option>
         {groups?Object.values(groups).map(group =>(
         <option value={group.id}>{group.name}</option>
         )):placeholder="User Has No Groups"}
        </select>
        <div>
        <button
        className="submitContactButton"
        type = "submit"
        onClick={handleSubmit}
        >Save Contact</button>
        </div>
        </form>
        </div>
    )
}

export default EditContactModal
