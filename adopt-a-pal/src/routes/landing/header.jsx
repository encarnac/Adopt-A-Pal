import { Link } from "react-router-dom";

function Header(props) {
  const handleSignupModal = props.handleSignupModal;

  return (
    <>
      <div className="w-fullpy-16 min-h-screen flex items-center px-4" id="#">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          {/*HEADER IMG*/}
          <img
            className="mx-auto my-4"
            src={require("../../assets/header-image.jpeg")}
            alt="/"
          />

          {/*HEADER TITLE*/}
          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-[55px] text-[#714949] md:text-left">
              Swipe. <span className="text-[#FF7578]">Adopt.</span> Love.
            </h1>
            <div className="flex flex-row md:justify-start ml-8 md:ml-0">
              <Link onClick={() => handleSignupModal(true)}>
                <button className="bg-[#F2968F] hover:bg-[#ef8e87] text-white w-[8em] rounded-full font-medium font-small my-6 mx-auto md:mx-0 py-4">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
