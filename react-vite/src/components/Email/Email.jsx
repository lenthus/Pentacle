
import ImageModal from "./ImageModal";
import Template from "./Template";
import BuildMenu from "./BuildMenu";
import "./Email.css"
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../redux/group";
import { getAllContacts } from "../../redux/contact";
import { getAllImages } from "../../redux/images";
// import { useState } from "react";
import React, { useEffect, useState } from "react";
import ColorChooser from "../Contacts/ColorChooser";
import { useColor } from "react-color-palette";
import {useNavigate, Navigate} from 'react-router-dom'





const Email = () =>{
    const user = useSelector((state) => state.session.user);
    const images = useSelector((state)=>state.images)
    const contacts = useSelector((state)=> state.contacts)
    const groups = useSelector((state) => state.groups)
    const [bColor, setBColor] = useColor("#f7f7f7");
    const navigate = useNavigate();
    const userNotLogged = !user?true:false;
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const [groupEdit, setGroupEdit] = useState("")

    const passDown = {images, user,contacts, groups, bColor, setBColor, groupEdit, setGroupEdit}
    useEffect(()=>{
        if(userNotLogged){
        navigate('../splash')
        }
    },[userNotLogged])


    useEffect(()=>{
        dispatch(getAllContacts(user.id))
        .then(() => dispatch(getAllGroups(user.id)))
        .then(() => dispatch(getAllImages(user.id)))
        .then(() => setIsLoading(false));
    },[dispatch])

    return (
        <>
        <div className="EmailBox">
        <div className="BuildBox">
            <BuildMenu passDown={passDown}/>
        </div>
        <div className="TemplateBox">
            <Template passDown={passDown}/>
        </div>
        </div>
        </>
    )
}

export default Email
