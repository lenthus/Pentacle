import React from "react";
import ImageChooser from "./ImageChooser";
import "./Email.css"
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import {makeStyles} from "@material-ui/core"
import { getAllImages } from "../../redux/images";


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

const ImageModal = ({passDown}) =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const {user, contacts, groups, images}=passDown

    console.log("image Modal", Object.values(images))

    useEffect(()=>{
        dispatch(getAllImages(user.id))
    },[])

    return (
        <>
        <div className="imageModalBox">
        <ImageChooser passDown={passDown}/>
        <h2>Uploaded Images in Gallery</h2>
        {Object.values(images).length>=1?Object.values(images).map(image=>{
            <span><div className={classes.pictureContainer}>
            <img className={classes.picture} src={image.url} alt="logo" />
            </div></span>
        }):null}
        <div>
        {Object.values(images).map(image=>{
            return(
            <span><div className={classes.pictureContainer}>
            <img className={classes.picture} src={image.url} alt="logo" />
            </div></span>)})}</div>
        </div>
        </>
    )
}

export default ImageModal
