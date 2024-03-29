
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
import { useState } from "react";
import Splash from "../Splash/splash";
import pentacle from "../../../public/pentacle.png"


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
      <img src={pentacle} alt="pentacle" id="pentacle"/>
      </div>

      <div className="Profile" >
      <NavLink to='/'>Home</NavLink>
      <NavLink to='Email'>Email</NavLink>
      <NavLink to='Contacts'>Contacts</NavLink>

      <ProfileButton className="profileButton" />
      </div>

    </div> :
    <div className="notLoggedIn">
      <div className="navFlexBox">
      <div >
        <h1 className="title">Pentacle Mail</h1>
        <h3
        style={{padding: 10}}
        >As Above, So Below.</h3>
      </div>
      <div>
      <img src={pentacle} alt="pentacle" id="pentacle"/>
      </div>
      <div className="Profile">
      <NavLink to='/Splash'>Home</NavLink>
      <NavLink to='signup'>Get Started</NavLink>
      <NavLink to='login'>Log In</NavLink>
      </div>
    </div></div>

    }

    </section>

  </div>
  <hr className='solid'/>
  </>
  );
}

export default Navigation;
