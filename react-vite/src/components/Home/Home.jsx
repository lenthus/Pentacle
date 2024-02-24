import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {useNavigate, Navigate} from 'react-router-dom'
import { useState, useEffect } from "react";
import { getAllContacts } from "../../redux/contact";
import { getAllGroups } from "../../redux/group";
import { getAllImages } from "../../redux/images";
import { getAllEmails } from "../../redux/email";
import { getAllHistorys } from "../../redux/history";
import { NavLink } from "react-router-dom";
import "./Home.css"




const Home = () =>{
    const user = useSelector((state) => state.session.user);
    const emails = useSelector((state) => state.emails);
    const groups = useSelector((state) => state.groups);
    const contacts = useSelector((state) => state.contacts)
    const images = useSelector((state) => state.images)
    const historys = useSelector((state) => state.historys)
    const navigate = useNavigate();
    // const user = sessionUser
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const userNotLogged = !user?true:false;
    console.log(emails)
    useEffect(()=>{
        if(userNotLogged){
        navigate('../splash')
        }
    },[userNotLogged])


    useEffect(()=>{
        dispatch(getAllContacts(user.id))
        .then(() => dispatch(getAllGroups(user.id)))
        .then(() => dispatch(getAllImages(user.id)))
        .then(() => dispatch(getAllEmails(user.id)))
        .then(() => dispatch(getAllHistorys(user.id)))
        .then(() => setIsLoading(false));
    },[dispatch])
    // console.log(user)
    if (user){
    return (
        <>
        <div className="homeBox">
        <div className="userStats">
            <h2>Welcome {user.username}</h2>
            <h2>Personal User Email: {user.email}</h2>
        </div>
        <div className="userStats">
            <h1>User Stats:</h1>
            <h4>Emails: {Object.values(emails).length}</h4>
            <h4>Groups: {Object.values(groups).length}</h4>
            <h4>Images: {Object.values(images).length}</h4>
            {/* <h4>Sent Emails: {Object.values(historys).length}</h4> */}
            <h4>Total Contacts: {Object.values(contacts).length}</h4>
        </div>
        <div className="quickLinks">
        <h1>Quick Links:</h1>
        <div>
        <NavLink to='Email'>Start A new Email</NavLink>
        </div>
        <div>
        <NavLink to='Email'>Create/Edit Contacts</NavLink>
        </div>
        </div>
        </div>
        </>
    )}else{
        return (
            <div>Not signed in</div>
        )
    }
}

export default Home
