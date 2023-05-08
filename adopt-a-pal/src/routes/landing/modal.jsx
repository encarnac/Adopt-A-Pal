import { React, useState } from "react";
import { IoClose } from "react-icons/io5";

function Modal(props) {
  const visible = props.modalState;
  const handleClose = props.handleModalState;

  const [email, setEmail] = useState('');
  const [password, setPassoed] = useState('');

  if (!visible) return null;

  return (
    <>
      <div className="fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="flex justify-items-end"></div>
        <div className="bg-white rounded-[35px] h-[50vh] min-w-[30rem] p-8 opacity-95">
          {/* CLOSE BUTTON */}
          <IoClose onClick={() => handleClose(false)} />
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center mt-2">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-[#714949]">
              Welcome back!
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-[#714949] text-start"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" border border-[#9F9F9F] text-[#714949] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   placeholder-gray-400 text-[#714949] focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-[#714949] text-start"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-[#9F9F9F] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   placeholder-gray-400 text-[#714949] focus:ring-blue-500 focus:border-blue-500"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white font-medium px-4 py-2 rounded-full bg-[#F2968F] hover:bg-[#ef8e87] "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?
                <a
                  href=""
                  className="font-medium hover:underline text-[#EE765E]"
                > Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
