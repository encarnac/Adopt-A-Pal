import { React, useState } from "react";
import NavBar from './navbar';
import Header from './header';
import Features from './features';
import Footer from './footer';
import LoginModal from '../LoginModal';
import SignupModal from "../SignupModal";

function Landing( props ) {
  // State of the login modal is toggled by NavBar/Modal and displayed over Landing
  const [loginModal, setLoginModal] = useState(false);
  const handleLoginModal = (e) => {
    setLoginModal(e);
  };

  // State of the signup modal is toggled by NavBar/Modal and displayed over Landing
  const [signupModal, setSignupModal] = useState(false);
  const handleSignupModal = (e) => {
    setSignupModal(e);
  };

  return (
    <>
      <LoginModal {...{ loginModal, handleLoginModal }} />
      <SignupModal {...{ signupModal, handleSignupModal }} />
      <NavBar {...{ handleLoginModal, handleSignupModal }} />
      <Header {...{ signupModal, handleSignupModal }} />
      <Features />
      <Footer {...{ signupModal, handleSignupModal }} />
    </>
  );
};

export default Landing;
