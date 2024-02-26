import React from "react";
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateGroupMaker } from "../../redux/group";
import { groupDeleteFetch } from "../../redux/group";



const GroupModal = ({group,groups,user,setGroupEdit}) =>{
    const [name, setName]=useState("")
    const dispatch = useDispatch()
    const groupEdit = useSelector((state) => state.groups[group]);
    const {closeModal} = useModal()
    const handleCancel = () => {
        closeModal()
    }

    const handleDelete = (e) => {
        let check = confirm("Delete this Group?")
        if (check === true){
        dispatch(groupDeleteFetch(group))
        closeModal()
        setGroupEdit("")
        }
    }
    const handleName = (e)=> setName(e.target.value)
    const handleSubmit = () =>{
        // e.preventDefault()
        if (name.length >= 1){
        const payload = {
                        name,name,
                        id:parseInt(group),
                        user_id:user.id
                        }

        dispatch(updateGroupMaker(payload,group))
        closeModal()
    }
    else {
        alert("Name is required")
    }
    }

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
        className="Edit Group"
        onSubmit={handleSubmit}
        >
        <h2>Group Name</h2>
        <input
            type = "text"
            name = "Name"
            defaultValue={groupEdit.name}
            onChange={handleName}
        ></input>
        <div>
        <button
        className="submitGroupButton"
        type = "submit"
        onClick={handleSubmit}
        >Save Group</button>
        </div>
        </form>
        </div>
    )
}

export default GroupModal
