import React from "react";
import ImageChooser from "./ImageChooser";
import ImageGallery from "./ImageGallery";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ImageWindow from "./ImageWindow";
import {makeStyles} from "@material-ui/core"
import { useState, useCallback, useEffect } from "react";
import { TextareaHTMLAttributes } from "react";

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

const Template = ({passDown}) =>{
    const classes = useStyles()
    const [banner, setBanner] = useState("")
    const [event, setEvent] = useState("")
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle]=useState("")
    const [body, setBody]=useState("")
    const [address, setAddress] = useState("")

    const handleTitle = (e)=>setTitle(e.target.value)
    const handleSubTitle = (e)=>setSubTitle(e.target.value)
    const handleBody = (e)=>setBody(e.target.value)
    const handleAddress = (e)=>setAddress(e.target.value)


    const {user, contacts, groups, images}=passDown
    return (
        <>
        <div>
            <h1>Basic Newsletter Template</h1>
        </div>
        <div>
            <h2>Please enter a Banner Image or Group Image</h2>
            <div className="ImageButton">
            <OpenModalButton
            buttonClass={"ImageWindow"}
            modalComponent={<ImageGallery  passDown={passDown} banner={banner} setBanner={setBanner} />}
            buttonText={"Choose Banner Image"}
            /></div>
            <div className={classes.pictureContainer} >
            {banner.length>=1?(<img className={classes.picture} src={banner} alt="logo" />):null}
        </div>
        <div>
            <h2>Title of Mail</h2>
            <input
            name="Title"
            placeholder="title Text"
            type="text"
            value={title}
            onChange={handleTitle}
            >
            </input>
        </div>
        <div>
        <h2>Please enter a Event Image</h2>
            <div className="ImageButton">
            <OpenModalButton
            buttonClass={"ImageWindow"}
            modalComponent={<ImageGallery  passDown={passDown} banner={event} setBanner={setEvent} />}
            buttonText={"Choose Event Image"}
            /></div>
            <div className={classes.pictureContainer} >
            {event.length>=1?(<img className={classes.picture} src={event} alt="logo" />):null}
        </div>
        </div>
        <div>
            <h2>Sub Title</h2>
            <input
            name="Title"
            placeholder="subTitle Text"
            type="textBox"
            value={subTitle}
            onChange={handleSubTitle}
            ></input>

        </div>
        <div>
        <h2>Body of Message</h2>
            <textarea
            name="body"
            onChange={handleBody}
            />
        </div>
        <div>
        <h2>Physical Mailing Address</h2>
            <textarea
            name="address"
            onChange={handleAddress}
            />
        </div>
        </div>
        </>
    )
}

export default Template
