import React from "react";
import ImageChooser from "./ImageChooser";
import "./Email.css"
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import {makeStyles} from "@material-ui/core"
import { getAllImages } from "../../redux/images";
import { imageDeleteFetch } from "../../redux/images";
import { useModal } from "../../context/Modal";


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
      width: "200px",
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

const ImageGallery = ({passDown,banner, setBanner}) =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const images = useSelector((state)=>state.images)
    const {user, contacts, groups}=passDown
    const [showImage, setShowImage] =useState("")
    const {closeModal}=useModal()


    console.log("image Modal", images)


    return (
        <>
        <div className="imageGalleryBox">
        {/* <ImageChooser passDown={passDown}/>
        <h2>Uploaded Images in Gallery</h2> */}
        {Object.values(images).length>=1?Object.values(images).map(image=>{
            <span><div className={classes.pictureContainer}>
            <img className={classes.picture} src={image.url} alt="logo" />
            </div></span>
        }):null}
        <div className="pictureBox">
        {Object.values(images).map(image=>{
            return(
            <span><div className={classes.pictureContainer}>
            <img className={classes.picture} src={image.url} alt="logo" onClick={(e)=>{
                setBanner(image.url)
                setShowImage(image.url)
                }} />
            </div></span>)})}</div>
            <button
            onClick={closeModal}
            >Use Image</button>
        </div>
        <div className={classes.pictureContainer} >
            {showImage.length>=1?(<img className={classes.picture} src={showImage} alt="logo" />):null}
            </div>
        </>
    )
}

export default ImageGallery
