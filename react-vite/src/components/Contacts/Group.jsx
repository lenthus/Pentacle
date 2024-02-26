import React from "react";
import "./Contacts.css"
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { createGroupMaker } from "../../redux/group";
import { getAllGroups } from "../../redux/group";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import GroupModal from "./GroupModal";


const Group = ({user, contact, groups}) =>{
    const dispatch = useDispatch()

    const [name, setName]=useState("")
    const [groupEdit, setGroupEdit] = useState("")

    const handleName = (e)=> setName(e.target.value)
    const handleGroupEdit = (e)=> setGroupEdit(e.target.value)

    const handleSubmit =async (e) => {
        e.preventDefault()
        if (name.length >1){

        const payload = {
                        name:name,
                        user_id:user.id
                        }
        let newGroup = await dispatch(createGroupMaker(payload))
        dispatch(getAllGroups(user.id))
        setName("")
    }}

    return (
        <>
        <div className="GroupBox">
        <div>
        <h1>Groups</h1>
        <h3>Select a group to Edit</h3>
        <select
        type = "dropdown"
        defaultValue=""
        onChange={handleGroupEdit}
        placeholder="Select a Group"
        >
        <option key='blankKey' hidden value >Select a Group</option>
        {groups?Object.values(groups).map(group =>(<option value={group.id}>{group.name}</option>)):placeholder="Create a Group"}
        </select>
        {groupEdit?(<OpenModalButton
        buttonClass={"fa-regular fa-pen-to-square"}
        // onButtonClick={handleCompleted}
        modalComponent={<GroupModal group={groupEdit} groups={groups} user={user}/>}
        />):null}
        <form
         onSubmit={handleSubmit}
        >
        <div>
        <h3>Create a New Group</h3>

        <input
            type = "text"
            name = "name"
            value={name}
            placeholder="Enter a Group Name"
            onChange={handleName}
        ></input>
        <h3>(Press Enter After Typing Name)</h3>
        </div>
        </form>
        </div>
        </div>
        </>
    )
}

export default Group
