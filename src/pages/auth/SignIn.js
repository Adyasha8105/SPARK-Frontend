import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanStateAction,
  doctorLogin,
  patientLogin,
} from "../../redux/actions/userAuthAction";
import { FadeLoader } from "react-spinners";
import { Redirect, useHistory } from "react-router";
import { useEffect } from "react";

export default function SignIn(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authReducer);
  const [isSignUpClicked, setSignUpClicked] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const type = props.history.location.state.type;

  useEffect(() => {
    dispatch(cleanStateAction());
    if (currentUser.isLoggedIn) history.push("/dashboard");
  }, []);

  useEffect(() => {
    if (currentUser.isLoginLoading) {
      console.log("LOADING");
    } else {
      setLoading(false);
      if (currentUser.isLoginError) setErrMessage(currentUser.isLoginError);
      else if (
        currentUser.isLoggedIn &&
        currentUser.isRegistered &&
        currentUser.type === "patient"
      )
        history.push("/dashboard");
      else if (
        currentUser.isLoggedIn &&
        currentUser.isRegistered &&
        currentUser.type === "doctor"
      )
        history.push("/doctor-dashboard");
      else if (
        currentUser.isLoggedIn &&
        !currentUser.isRegistered &&
        currentUser.type === "patient"
      )
        history.push("/profile");
      else if (
        currentUser.isLoggedIn &&
        !currentUser.isRegistered &&
        currentUser.type === "doctor"
      )
        history.push("/doctor-profile");
      else if (currentUser.isLoginError == "") setErrMessage("");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      phoneNo: phone,
      password: password,
    };
    setLoading(true);
    if (type === "patient") dispatch(patientLogin(JSON.stringify(data)));
    else dispatch(doctorLogin(JSON.stringify(data)));
  };

  if (isSignUpClicked) {
    return (
      <Redirect
        to={{
          pathname: "/signup",
          state: {
            type: type,
          },
        }}
      />
    );
  } else if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FadeLoader color={"#3DA0DE"} loading={true} size={150} />
      </div>
    );
  } else
    return (
      <section className="absolute w-full h-full overflow-hidden">
        <div className="min-h-screen bg-primary flex justify-center items-center">
          <div className="absolute w-60 h-60 rounded-xl bg-light -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
          <div className="absolute w-48 h-48 rounded-xl bg-light -bottom-1 -right-5 transform rotate-12 hidden md:block"></div>
          <div className="top-0 w-full h-full">
            <div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className=" mb-3">
                        <h6 className="text-primary text-2xl font-bold">
                          Sign In
                        </h6>
                      </div>

                      <hr className="mt-3 border-b-1 border-primary" />
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <form>
                        <div className="relative w-full mb-3">
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Phone no."
                            style={{ transition: "all .15s ease" }}
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Password"
                            style={{ transition: "all .15s ease" }}
                          />
                        </div>

                        <div className="text-center mt-6">
                          <button
                            className="bg-primary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                            onClick={handleSubmit}
                          >
                            Sign In
                          </button>
                        </div>
                      </form>
                      <div className="mt-6 text-center">
                        <div className="text-sm text-primary">
                          New Member?{" "}
                          <span
                            className="underline cursor-pointer text-primary"
                            href="/"
                            onClick={(e) => setSignUpClicked(true)}
                          >
                            Sign Up
                          </span>
                        </div>
                        <div className="mt-3 text-red-600">{errMessage}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-40 h-40 absolute bg-light rounded-full top-0 right-12 hidden md:block"></div>
          <div className="w-20 h-40 absolute bg-light rounded-full bottom-20 left-20 transform rotate-45 hidden md:block"></div>
        </div>
      </section>
    );
}
