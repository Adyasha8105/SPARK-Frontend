/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { FadeLoader } from "react-spinners";
import Lottie from "lottie-react";
import { MdDashboard, MdFolder, MdPerson } from "react-icons/all";
import SideBarAnimation from "../../images/SideBarAnimation.json";
import {
  doctorLogout,
  patientLogout,
} from "../../redux/actions/userAuthAction.js";
import { HiLogout } from "react-icons/hi";
import { updatePatientAsync } from "../../redux/actions/updateUserAction.js";
import { createPatientProfile } from "../../redux/actions/userRegisterAction.js";

function PatientProfile() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(0);

  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");
  const [bloodgp, setBloodgp] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState(""); //Shree this is the error message for create Patient,please display it
  const dispatch = useDispatch();
  const [isUpdated, setIsUpdated] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const registeredUser = useSelector((state) => state.profileReducer);
  const authUser = useSelector((state) => state.authReducer);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (!authUser.isSignedUp) history.push("/");
    if (authUser.type === "doctor") history.goBack();
    setIsUpdated(false);
    if (registeredUser.name) {
      setIsAlreadyRegistered(true);
      setAge(registeredUser.age);
      setName(registeredUser.name);
      setAddress(registeredUser.address);
      setBloodgp(registeredUser.bloodgp);
      setDob(registeredUser.dob);
      setEmail(registeredUser.email);
      setGender(registeredUser.gender);
      setProvince(registeredUser.state);
      setCity(registeredUser.city);
      setPostal(registeredUser.pincode);
    }
  }, []);

  useEffect(() => {
    setLoading(false);
    if (isUpdated && !registeredUser.errorMessage) history.push("/dashboard");
    else if (registeredUser.isLoading) console.log("Loading");
    else if (registeredUser.errorMessage)
      setMessage(registeredUser.errorMessage);
    else if (registeredUser.registered && !authUser.isLoggedIn)
      history.push({
        pathname: "/signin",
        state: {
          type: "patient",
        },
      });
  }, [registeredUser]);

  const handleProfile = () => {
    history.push("/profile");
  };

  const handleDashboard = () => {
    history.push("/dashboard");
  };

  const handleInventory = () => {
    history.push("/inventory");
  };

  const handleLogout = () => {
    setLoading(true);
    if (currentUser.type === "doctor")
      dispatch(doctorLogout(currentUser.access, currentUser.phoneno));
    else dispatch(patientLogout(currentUser.access, currentUser.phoneno));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isAlreadyRegistered)
      dispatch(
        createPatientProfile({
          id: authUser.id,
          name: name,
          age: age,
          city: city,
          address: address,
          state: province,
          pincode: postal,
          dob: dob,
          phone: authUser.phoneno,
          gender: gender,
          bloodGp: bloodgp,
          email: email,
        })
      );
    else {
      setIsUpdated(true);
      dispatch(
        updatePatientAsync(
          JSON.stringify({
            name: name,
            age: age,
            city: city,
            address: address,
            state: province,
            pincode: postal,
            dob: dob,
            gender: gender,
            bloodGp: bloodgp,
            email: email,
            phoneNo: authUser.phoneno,
          })
        )
      );
    }
  };
  if (loading) {
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
      <div className="main-dashboard">
        <aside id="sidenav-open" className="h-screen">
          <nav className="flex flex-col justify-between h-full p-5 bg-gray-50">
            <div className="sidebar-title self-center my-10 uppercase text-2xl tracking-widest2 font-bold text-dark">
              Spark
            </div>
            <div>
              <button
                onClick={handleDashboard}
                className="flex items-center p-3 mb-4 rounded-xl hover:bg-gray-200"
              >
                <MdDashboard className="mr-3 text-3xl text-primary" />
                <span className="text-gray-900 text-xl">Dashboard</span>
              </button>

              <button
                onClick={handleProfile}
                className="flex items-center p-3 mb-4 rounded-xl hover:bg-gray-200"
              >
                <MdPerson className="mr-3 text-3xl text-primary" />
                <span className="text-gray-900 text-xl">Profile</span>
              </button>

              <button
                onClick={handleInventory}
                className="flex items-center p-3 mb-4 rounded-xl hover:bg-gray-200"
              >
                <MdFolder className="mr-3 text-3xl text-primary" />
                <span className="text-gray-900 text-xl">Inventory</span>
              </button>
            </div>

            <div className="grid justify-between w-64">
              <Lottie animationData={SideBarAnimation} />
              <div className="flex mt-2 bg-dark text-white cursor-pointer md:rounded-md items-center justify-center rounded-lg ">
                <button
                  className="flex space-x-3 py-2 px-6 text-md items-center justify-center"
                  onClick={handleLogout}
                >
                  <HiLogout className="text-lg" />
                  <p>Logout</p>
                </button>
              </div>
            </div>
          </nav>
          <a
            href="/profile"
            id="sidenav-close"
            title="Close Menu"
            aria-label="Close Menu"
          ></a>
        </aside>
        <main className="overflow-y-scroll h-screen">
          <header className="flex items-center justify-between p-4 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <a
                href="#sidenav-open"
                className="visible sm:hidden"
                title="Open Menu"
                aria-label="Open Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </a>
            </div>
          </header>

          <div className="w-full flex flex-col">
            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
            <div className="mt-10 sm:mt-0">
              <div className="p-6">
                <div className="md:col-span-1">
                  <h1 className="text-dark font-bold md:text-3xl text-2xl">
                    Personal Information
                  </h1>
                  <p className="mt-1 mb-5 md:text-lg text-md text-gray-600">
                    This information will be displayed to organisation so be
                    careful what you share.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form action="#" method="POST" onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-md font-medium text-gray-700"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              required
                              value={name}
                              className="mt-1 p-2 text-md focus:ring-primary focus:border-primary block w-full shadow-sm border-gray-300 rounded-md"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="phoneno"
                              className="block text-md font-medium text-gray-700"
                            >
                              Phone number
                            </label>
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              autoComplete="phone"
                              value={authUser.phoneno}
                              disabled
                              className="mt-1 p-2 md:text-md focus:ring-primary focus:border-primary block w-full shadow-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-2">
                            <label
                              htmlFor="date-of-birth"
                              className="block text-md font-medium text-gray-700"
                            >
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              name="date-of-birth"
                              id="date-of-birth"
                              autoComplete="date-of-birth"
                              required
                              value={dob}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setDob(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-2">
                            <label
                              htmlFor="age"
                              className="block text-md font-medium text-gray-700"
                            >
                              Age
                            </label>
                            <input
                              type="number"
                              name="age"
                              id="age"
                              autoComplete="age"
                              required
                              value={age}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-2">
                            <label
                              htmlFor="bloodgp"
                              className="block text-md font-medium text-gray-700"
                            >
                              Blood Group
                            </label>
                            <input
                              type="text"
                              name="bloodgp"
                              id="bloodgp"
                              autoComplete="bloodgp"
                              required
                              value={bloodgp}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setBloodgp(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="email-address"
                              className="block text-md font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <input
                              type="text"
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              required
                              value={email}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="gender"
                              className="block text-md font-medium text-gray-700"
                            >
                              Gender
                            </label>
                            <select
                              name="gender"
                              id="gender"
                              required
                              value={gender}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="female">Female</option>
                              <option value="male">Male</option>
                              <option value="other">Others</option>
                            </select>
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="street-address"
                              className="block text-md font-medium text-gray-700"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              required
                              autoComplete="street-address"
                              value={address}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <label
                              htmlFor="city"
                              className="block text-md font-medium text-gray-700"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              required
                              value={city}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label
                              htmlFor="state"
                              className="block text-md font-medium text-gray-700"
                            >
                              State / Province
                            </label>
                            <input
                              type="text"
                              name="state"
                              id="state"
                              required
                              value={province}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setProvince(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-md font-medium text-gray-700"
                            >
                              ZIP / Postal
                            </label>
                            <input
                              type="text"
                              name="postal-code"
                              id="postal-code"
                              autoComplete="postal-code"
                              required
                              value={postal}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setPostal(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        {isAlreadyRegistered ? (
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-primary hover:opacity-85 focus:outline-none"
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-primary hover:opacity-85 focus:outline-none"
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}

export default PatientProfile;
