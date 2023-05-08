const Header = () => {
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
            <button className="bg-[#F2968F] hover:bg-[#ef8e87] text-white w-[7em] rounded-full font-medium font-small my-6 mx-auto md:mx-0 py-2">
              Get Started
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Header;
