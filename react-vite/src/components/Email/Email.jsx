import React from "react";
import ImageModal from "./ImageModal";
import Template from "./Template";
import BuildMenu from "./BuildMenu";
import "./Email.css"



const Email = () =>{
    return (
        <>
        <div className="EmailBox">
        <div className="BuildBox">
            <BuildMenu />
        </div>
        <div className="TemplateBox">
            <Template />
        </div>
        </div>
        </>
    )
}

export default Email
