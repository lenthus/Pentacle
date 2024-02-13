import React from "react";
import { useState, useCallback } from "react";
import {makeStyles} from "@material-ui/core"
import { createImageMaker } from "../../redux/images";
import { useSelector, useDispatch } from "react-redux";
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


const ImageChooser = ({passDown}) => {
    const [logo, setLogo] = useState("")
    const dispatch = useDispatch()
    const {user, contacts, groups, images}=passDown
    const classes = useStyles()
    const [loaded, setLoaded]=useState(false)

    const handleCreateBase64 = useCallback(async (e) =>{
        const file = e.target.files[0]
        const base64 = await converToBase64(file)
        setLogo(base64)
        e.target.value=""
    },[])
    const deleteImage = (e)=>{
        e.preventDefault()
        setLogo(null)
    }


    const converToBase64 = (file) => {
        return new Promise ((resolve, reject)=> {
            const fileReader = new FileReader();
            if(!file){
                alert("Please select an image")
            }else{
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                }
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    const handleSave =async (e) => {
        e.preventDefault()
        if (logo){

        const payload = {
                        url:logo,
                        user_id:user.id
                        }
        let newImage = await dispatch(createImageMaker(payload))
        // .then(() => dispatch(getAllImages(user.id)))
        // .then(()=>setLoaded(true))
        setLogo("")
    }}
    console.log("from chooser",user)

    return <><div>
        <div className={classes.logoContainer}>
        <label className={classes.labelLogo} htmlFor="contained-button-file">
            <div className={classes.buttonContainer}>
                <div className={classes.button}>
                    <p className={classes.buttonText}>Choose Image</p>
                </div>

            {logo?(<div className={classes.button}>
                <p onClick={deleteImage}
                   className={classes.buttonText}
                >Delete Image
                </p></div>):null}
                {logo?(<div className={classes.button}>
                <p onClick={handleSave}
                   className={classes.buttonText}
                >Save Image
                </p></div>):null}
                </div>
            {logo?(<span><div className={classes.pictureContainer}>
                <img className={classes.picture} src={logo} alt="logo" />
                </div></span>):null}
        </label>

        </div>
        <input
        id="contained-button-file"
        type="file"
        accept="image/*, png, jpeg, jpg"
        style={{display: "none"}}
        name="logo"
        onChange={handleCreateBase64}
        />
        </div></>
}


export default ImageChooser
