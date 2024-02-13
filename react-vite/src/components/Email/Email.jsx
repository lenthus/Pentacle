
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




const Email = () =>{
    const user = useSelector((state) => state.session.user);
    const images = useSelector((state)=>state.images)
    const contacts = useSelector((state)=> state.contacts)
    const groups = useSelector((state) => state.groups)

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()

    const passDown = {images, user,contacts, groups}


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
