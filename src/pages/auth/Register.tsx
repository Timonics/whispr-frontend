import React, { useState } from "react";
import { Link } from "react-router";
import Loading from "../../components/load";
import type { AuthData } from "../../interfaces/auth.interface";
import useAuth from "../../hooks/useAuth";

const Register: React.FC = () => {
  const { registerUser, isLoading } = useAuth();
  const [formData, setFormData] = useState<AuthData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    registerUser(userData);
  };

  return (
    <div className="md:flex md:justify-between md:gap-10 p-2 md:p-10 w-full bg-accent/5">
      {isLoading && <Loading />}
      <div className="flex flex-col gap-8 w-full md:w-2/3 p-6 md:bg-black">
        <div className="text-center leading-4 flex flex-col gap-2">
          <h1 className="font-bold outfit text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] text-center">
            Welcome to{" "}
            <span className="text-primary text-xl sm:text-2xl lg:text-3xl outfit">
              Whispr.
            </span>
          </h1>
          <p className="text-[10px] sm:text-[11px] lg:text-xs font-extralight text-muted-foreground">
            Stay connected. Start conversations. Share moments.
          </p>
        </div>
        <form
          id="signupForm"
          className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 lg:gap-6">
            <label className="flex items-center gap-2 w-full border-b-[1.5px] border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-5 md:size-6 text-primary/30"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"></path>
              </svg>
              <input
                type="text"
                className="p-1 w-full bg-[#40444800] outline-none outfit"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className="flex items-center gap-2 w-full border-b-[1.5px] border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-5 md:size-6 text-primary/30"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"></path>
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"></path>
              </svg>
              <input
                type="text"
                className="p-1 w-full bg-[#40444800] outline-none outfit"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label className="flex items-center gap-2 w-full border-b-[1.5px] border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-5 md:size-6 text-primary/30"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <input
                type="password"
                className="p-1 w-full bg-[#40444800] outline-none outfit"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <label className="flex items-center gap-2 w-full border-b-[1.5px] border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-5 md:size-6 text-primary/30"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <input
                type="password"
                className="p-1 w-full bg-[#40444800] outline-none outfit"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </label>
          </div>
        </form>
        <p className="text-[9px] sm:text-[10px] lg:text-xs font-extralight ">
          Already have a{" "}
          <span className="text-[11px] lg:text-[13px] font-bold outfit text-primary">
            Whispr.
          </span>{" "}
          account?{" "}
          <Link
            className="font-bold outfit text-xs sm:text-base text-[#FFB6C1] underline underline-offset-1"
            to="../../auth/log-in"
          >
            Log in
          </Link>
        </p>
        <button
          form="signupForm"
          type="submit"
          className="w-full p-3 cursor-pointer h-[40px] text-base flex items-center justify-center rounded-lg outfit font-bold bg-primary text-[#FFB6C1] transition duration-500 ease-in-out hover:bg-[#FFB6C1] hover:text-[#1D232A]"
        >
          Create your account
        </button>
        <p className="text-[9px] font-thin text-center sm:text-[10px] md:text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
          <span className="font-semibold outfit text-white">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="font-semibold outfit text-white">
            Privacy Policy
          </span>
          .
        </p>
      </div>
      <div className="max-md:hidden flex flex-col items-center justify-center gap-5 p-2 md:w-1/3 xl:w-[600px]">
        <div className="flex flex-col gap-2 xl:hidden">
          <div className="flex gap-2">
            <div className="size-[80px] rounded-lg shadow-xl bg-[#4044486d]"></div>
            <div className="size-[80px] rounded-lg shadow-xl bg-[#4044486d]"></div>
          </div>
          <div className="flex gap-2">
            <div className="size-[80px] rounded-lg shadow-xl bg-[#4044486d]"></div>
            <div className="size-[80px] rounded-lg shadow-xl bg-[#4044486d]"></div>
          </div>
        </div>
        <div className="xl:flex hidden items-center justify-center gap-3 w-full h-full">
          <div className="rounded-lg shadow-xl bg-[#4044486d] w-1/3 h-[60%] my-4"></div>
          <div className="flex flex-col w-1/3 h-full gap-2">
            <div className="rounded-lg shadow-xl bg-[#4044486d] h-[55%]"></div>
            <div className="rounded-lg shadow-xl bg-[#4044486d] h-[45%]"></div>
          </div>
          <div className="rounded-lg shadow-xl bg-[#4044486d] w-1/3 h-[80%]"></div>
        </div>
        <div className="text-center space-y-0.5">
          <h1 className="outfit font-bold text-2xl lg:text-3xl text-primary">
            Whispr.
          </h1>
          <p className="text-[9px] font-extralight lg:text-xs">
            Conversations made easy, whispers made seamless.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
