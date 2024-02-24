import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";
import { getAllContacts } from "../../redux/contact";
import { getAllGroups } from "../../redux/group";
import { getAllImages } from "../../redux/images";
import { getAllEmails } from "../../redux/email";
import { getAllHistorys } from "../../redux/history";
import { NavLink } from "react-router-dom";




const Home = () =>{
    const user = useSelector((state) => state.session.user);
    const emails = useSelector((state) => state.emails);
    const groups = useSelector((state) => state.groups);
    const contacts = useSelector((state) => state.contacts)
    const images = useSelector((state) => state.images)
    const historys = useSelector((state) => state.historys)
    // const user = sessionUser
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    console.log(emails)


    useEffect(()=>{
        dispatch(getAllContacts(user.id))
        .then(() => dispatch(getAllGroups(user.id)))
        .then(() => dispatch(getAllImages(user.id)))
        .then(() => dispatch(getAllEmails(user.id)))
        .then(() => dispatch(getAllHistorys(user.id)))
        .then(() => setIsLoading(false));
    },[dispatch])
    // console.log(user)

    return (
        <>
        <div>
            {/* <h2>Welcome {user}</h2> */}

        <div>
            <h1>User Stats:</h1>
            <h4>Emails: {Object.values(emails).length}</h4>
            <h4>Groups: {Object.values(groups).length}</h4>
            <h4>Images: {Object.values(images).length}</h4>
            <h4>Sent Emails: {Object.values(historys).length}</h4>
            <h4>Total Contacts: {Object.values(contacts).length}</h4>
        </div>
        <h1>Quick Links:</h1>
        <div>
        <NavLink to='Email'>Start A new Email</NavLink>
        </div>
        <div>
        <NavLink to='Email'>Create/Edit Contacts</NavLink>
        </div>
        </div>
        </>
    )
}

export default Home
