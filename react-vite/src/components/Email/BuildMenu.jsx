import React from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ImageModal from "./ImageModal";

const BuildMenu = () =>{
    return (
        <>
        <div>
        <OpenModalButton
        buttonText={"Images"}
        modalComponent={ImageModal}
        buttonClass={"imageModalButton"}
        />
        

        </div>
        </>
    )
}

export default BuildMenu
