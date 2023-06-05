import { Link } from "react-router-dom";

function Footer(props) {
  const handleSignupModal = props.handleSignupModal;
  return (
    <div
      className=" w-full rounded-t-[55px] bg-white text-[#714949] shadow-xl mt-24"
      id="contact-us"
    >
      {/* FOOTER CONTAINER */}
      <div className="xl:px-40 pb-12 px-20  ">
        {/* TOP */}
        <div className="w-full pt-12 flex flex-col md:flex-row space-y-5 md:justify-between">
          {/* LEFT COLUMN - CALL TO ACTION BUTTON */}
          <div className=" md:w-2/5 flex flex-col space-y-5 justify-items-center">
            <p className="opacity-60 text-[24px] md:text-[35px] md:text-[55px] text-[#714949] text-start font-bold">
              Ready to find the <span className="text-[#FF7578]">one</span>?
            </p>
            <div className="flex flex-row md:justify-start">
              <Link onClick={() => handleSignupModal(true)}>
                <button className="bg-[#F2968F] hover:bg-[#ef8e87] rounded-full md:mx-0 px-8 py-2 md:py-4 text-white text-lg font-medium ">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN - SOCIAL ICON LINKS */}
          <div className="flex space-x-5 text-[40px]">
            <a href="https://github.com/Spatch7/Adopt-A-Pal">
              <svg
                stroke="#714949"
                fill="#714949"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
              </svg>
            </a>
            <a href="unknown@gmail.com">
              <svg
                stroke="#714949"
                fill="#714949"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="opacity-60 pt-2 mt-5 text-[20px]">
          <p>© All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
