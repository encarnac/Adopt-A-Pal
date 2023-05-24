import { React, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function LoginModal(props) {
  const loginModal = props.loginModal;
  const closeLoginModal = props.handleLoginModal;
  const openSignupModal = props.handleSignupModal;
  const navigate = useNavigate();

  const goToSignup = () => {
    closeLoginModal();
    openSignupModal();
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!loginModal) return null;

  const handleSignIn = async (event) => {
    event.preventDefault();
    const loginUrl = "/api/sessions";
    const credentials = {
      email,
      password,
    };
    
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      if (response.ok) {
        // Sign-in successful
        const data = await response.json();
        // Perform any necessary actions with the token or user data
        const token = data.token;
        // Save the token in localStorage
        localStorage.setItem('token', token);

        // Redirect to "/dashboard" after successful sign-in
        navigate("/dashboard");
      } else {
        // Sign-in failed
        // Handle the failed sign-in, display an error message, etc.
      }
    } catch (error) {
      // Handle any errors that occurred during the sign-in process
      console.error("Sign-in error:", error);
    }
  };

  return (
    <>
      <div className="fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white rounded-[35px] min-w-[30rem] px-8 pt-6 pb-10 opacity-95">
          {/* CLOSE BUTTON */}
          <div className="flex justify-end">
            <IoClose onClick={() => closeLoginModal()} />
          </div>
          {/* MODAL FOR LOGIN FORM */}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center mt-2">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-[#714949]">
              Welcome Back!
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
              <div>
                <label
                  htmlFor="email"
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
                  value={email} // Set the value from the state variable
                  onChange={(e) => setEmail(e.target.value)} // Update the state variable on change
                />
              </div>
              <div>
                <label
                  htmlFor="password"
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
                  value={password} // Set the value from the state variable
                  onChange={(e) => setPassword(e.target.value)} // Update the state variable on change
                />
              </div>
              <button
                type="submit"
                className="w-full text-white font-medium px-4 py-2 rounded-full bg-[#F2968F] hover:bg-[#ef8e87] "
              >
                Sign In
              </button>
            </form>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?
              <button
                onClick={() => goToSignup()}
                className="font-medium hover:underline text-[#EE765E]"
              >
                &nbsp;Sign Up
              </button>
            </p>
            <div className="divider">or</div>
            <button
              type="submit"
              className="w-full text-white font-medium gap-2 px-4 py-2 rounded-full btn btn-info btn-outline no-animation "
            >
              <img
                src="https://img.icons8.com/color/48/null/google-logo.png"
                className="w-6" alt=""
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
