import { React, useState } from "react";
import NavBar from './navbar';
import Header from './header';
import Features from './features';
import Footer from './footer';
import Modal from './modal';

function Landing( props ) {
    // State of the modal is set to either login, signup, or false and is toggled by NavBar/Modal and displayed in Landing
    const [modalState, setModalState] = useState( false );
    

    const handleModalState = (e) => {
        setModalState(e);
    };

    return (
      <>
        <Modal {...{ modalState, handleModalState }} />
        <NavBar {...{ handleModalState }} />
        <Header />
        <Features />
        <Footer />
      </>
    );
};

export default Landing;
