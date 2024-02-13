import React from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ImageModal from "./ImageModal";

const BuildMenu = ({passDown}) =>{
    const {user, contacts, groups, images}=passDown
    return (
        <>
        <div>
        <OpenModalButton
        buttonText={"Images"}
        modalComponent={<ImageModal passDown={passDown}/>}
        buttonClass={"imageModalButton"}
        />


        </div>
        </>
    )
}

export default BuildMenu
