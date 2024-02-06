

import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
import { useState } from "react";
import Splash from "../Splash/splash";


function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
    <hr className='solid'/>
    <div >

    <section>
    {sessionUser ? <div className="navFlexBox">
      <div >
        <h1 className="title">Pentacle Mail</h1>
        <h3
        style={{padding: 10}}
        >As Above, So Below.</h3>
      </div>
      <div>
      <h1 className="fa-regular fa-star fa-spin"></h1>
      </div>

      <div className="Profile" >
      <NavLink to='/'>Home</NavLink>
      <ProfileButton className="profileButton" />
      </div>

    </ div> :
    <div className="notLoggedIn">
      <div>
      <NavLink to='/Splash'>Home</NavLink>
      </div>
      <div>
        <NavLink to='signup'>Get Started</NavLink>
      </div>
      <div>
        <NavLink to='login'>Log In</NavLink>
      </div>
    </div>

    }

    </section>

  </div>
  <hr className='solid'/>
  </>
  );
}

export default Navigation;
