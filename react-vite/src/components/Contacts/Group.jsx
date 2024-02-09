import React from "react";
import "./Contacts.css"
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";


const Group = () =>{
    const dispatch = useDispatch()

    return (
        <>
        <div className="GroupBox">
        <div>
        <h3>Groups</h3>
        <select
        type = "dropdown"
        defaultValue=""
        // onChange={}
        >
        <option value="1">Easy</option>
        <option value="2">Medium</option>
        <option value="3">Hard</option>
        </select>
        </div>
        </div>
        </>
    )
}

export default Group
