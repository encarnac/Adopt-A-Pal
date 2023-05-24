import { React, useState } from "react";
import NavBar from './navbar';
import Header from './header';
import Features from './features';
import Footer from './footer';
import LoginModal from '../login-signup/LoginModal';
import SignupModal from "../login-signup/SignupModal";

function Landing( props ) {
  // State of the login modal is toggled by NavBar/Modal and displayed over Landing
  const [loginModal, setLoginModal] = useState(false);
  const handleLoginModal = () => {
    setLoginModal(!loginModal);
  };

  // State of the signup modal is toggled by NavBar/Modal and displayed over Landing
  const [signupModal, setSignupModal] = useState(false);
  const handleSignupModal = () => {
    setSignupModal(!signupModal);
  };

  return (
    <>
      <LoginModal
        {...{ loginModal, handleLoginModal, signupModal, handleSignupModal }}
      />
      <SignupModal
        {...{ signupModal, handleSignupModal, loginModal, handleLoginModal }}
      />
      <NavBar {...{ handleLoginModal, handleSignupModal }} />
      <Header {...{ signupModal, handleSignupModal }} />
      <Features />
      <Footer {...{ signupModal, handleSignupModal }} />
    </>
  );
};

export default Landing;
