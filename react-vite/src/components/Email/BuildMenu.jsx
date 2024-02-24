import React from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ImageModal from "./ImageModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorChooser from "../Contacts/ColorChooser";
import { useColor } from "react-color-palette";


const BuildMenu = ({passDown}) =>{
    // const [groupEdit, setGroupEdit] = useState("")
    // const [color, setColor] = useState("")
    // const [bColor, setBColor] = useColor("hex", "#00FF00");
    const {user, contacts, groups, images, bColor,
         setBColor, groupEdit, setGroupEdit}=passDown
    const handleGroupEdit = (e)=> setGroupEdit(e.target.value)
    const dispatch = useDispatch()

    const groupCount = ()=> {
        let groupMembers = []
        for (const contact of Object.values(contacts)){
            for (const group of Object.values(contact.groups)){
                if (group.id===parseInt(groupEdit)){
                    groupMembers.push(contact)
                }
            }
        }
        return groupMembers
    }

    const handleSubmit=()=> {
        return (
            <html><p>Test</p></html>
        )
    }

    return (
        <>
        <div>
        <h2>Email Options</h2>
        <div className="buttonContainer">

        <OpenModalButton
        buttonText={"Upload Images"}
        modalComponent={<ImageModal passDown={passDown}/>}
        buttonClass={"imageModalButton"}
        />
        </div>
        <div>
            <h2>Select Group</h2>
            <select
        type = "dropdown"
        defaultValue=""
        onChange={handleGroupEdit}
        placeholder="Select a Group"
        >
        <option key='blankKey' hidden value >Select a Group</option>
        {groups?Object.values(groups).map(group =>(<option value={group.id}>{group.name}</option>)):placeholder="Create a Group"}
        </select>
        {groupEdit?<p>{`Current Contacts Selected: ${groupCount().length}`}</p>:null}
        </div>
        <div>

        </div>
        <div><OpenModalButton
        buttonText = "Choose background Color"
        buttonClass={"backgroundButton"}
        modalComponent={<ColorChooser bColor={bColor} setBColor={setBColor}/>}
        />
        </div>
        <div>
        <button
        onClick={handleSubmit}
            >Send Email</button>
        </div>
        </div>
        </>
    )
}

export default BuildMenu
