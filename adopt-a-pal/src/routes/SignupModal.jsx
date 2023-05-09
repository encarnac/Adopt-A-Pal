import { React, useState } from "react";
import { IoClose } from "react-icons/io5";

function SignupModal(props) {
  const signupModal = props.signupModal;
  const handleClose = props.handleSignupModal;

  const goToLogin = () => {}

  const [email, setEmail] = useState("");
  const [password, setPassoed] = useState("");

  if (!signupModal) return null;

  return (
    <>
      <div className="fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white rounded-[35px] min-w-[30rem] px-8 pt-6 pb-10 opacity-95">
          {/* CLOSE BUTTON */}
          <div className="flex justify-end">
            <IoClose onClick={() => handleClose(false)} />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center mt-2">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-[#714949]">
              Create Account
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
                  placeholder="name@example.com"
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
                Create Account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?
                <a
                  href=""
                  className="font-medium hover:underline text-[#EE765E]"
                >
                  {" "}
                  Login{" "}
                </a>
              </p>
            </form>

            <div className="divider">or</div>
            <button
              type="submit"
              className="w-full text-white font-medium gap-2 px-4 py-2 rounded-full btn btn-info btn-outline no-animation "
            >
              <img
                src="https://img.icons8.com/color/48/null/google-logo.png"
                className="w-6"
              />
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupModal;
