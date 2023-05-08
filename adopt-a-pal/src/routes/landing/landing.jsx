import { React } from "react";
import NavBar from './navbar';
import Header from './header';
import Features from './features';
import Footer from './footer';

function Landing( props ) {
    return(
        <>
            <NavBar/>
            <Header/>
            <Features/>
            <Footer/>
        </>
    );
};

export default Landing;
