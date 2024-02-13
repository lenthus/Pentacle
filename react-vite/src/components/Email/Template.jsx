import React from "react";
import ImageChooser from "./ImageChooser";
import ImageGallery from "./ImageGallery";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ImageWindow from "./ImageWindow";
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles(() => ({
    labelLogo: {
      display: "flex",
      flexDirection: "row-reverse",
      width: "292px",
      margin: "auto",
      justifyContent: "space-between",
      color: "#9A9A9C",
      font: "inherit",
      fontSize: "1.18676em",
    },
    logoContainer: {
      margin: "auto",
      marginTop: "40px",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
    },
    button: {
      display: "flex",
      flexDirection: "row",
    },
    buttonText: {
      margin: "auto",
    },
    pictureContainer: {
      height: "100px",
      background: "white",
      width: "100px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundSize: "contain",
      border: "1px solid black",
      margin: "auto",
    },
    picture: {
      maxWidth: "100%",
      maxHeight: "100%",
    },
  }));

const Template = ({passDown}) =>{
    const classes = useStyles()


    const {user, contacts, groups, images}=passDown
    return (
        <>
        <div>
            <h1>Basic Newsletter Template</h1>
        </div>
        <div>
            <h2>Please enter a Banner Image or Group Image</h2>
            <div className="ImageWindowBox">
            <OpenModalButton

            buttonClass={"ImageWindow"}
            modalComponent={<ImageWindow  passDown={passDown} />}
            buttonText={"Choose Banner Image"}
            /></div>
            </div>
        </>
    )
}

export default Template
