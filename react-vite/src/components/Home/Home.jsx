import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {useNavigate} from 'react-router-dom'
import { useState } from "react";


const Home = () =>{
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    console.log(sessionUser)

    return (
        <>
        <div>Hello from Home</div>
        </>
    )
}

export default Home
