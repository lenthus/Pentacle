import React from "react";
import ImageChooser from "./ImageChooser";


const Template = ({passDown}) =>{
    const {user, contacts, groups, images}=passDown
    return (
        <>
        <div>
            <h1>Basic Newsletter Template</h1>
        </div>
        <div>
            <h2>Please enter a Banner Image or Group Image</h2>
            {/* <ImageChooser /> */}
            </div>
        </>
    )
}

export default Template
