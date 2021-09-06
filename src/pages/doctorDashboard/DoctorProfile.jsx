/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Lottie from "lottie-react";
import { createDoctorProfile } from "../../redux/actions/userRegisterAction.js";
import SideBarAnimation from "../../images/SideBarAnimation.json";
import {
  doctorLogout,
  patientLogout,
} from "../../redux/actions/userAuthAction.js";
import { HiLogout } from "react-icons/hi";
import { MdDashboard, MdPerson } from "react-icons/all";
import { MdCancel } from "react-icons/md";
import { updateDoctorAsync } from "../../redux/actions/updateUserAction.js";
import { FadeLoader } from "react-spinners";

function SpecializationTag(props) {
  return (
    <div className="flex justify-between items-center px-2 py-1 bg-blue-300 md:ml-6 md:mt-0 mt-2 sm:text-md lg:text-md rounded-3xl">
      <span>{props.tag}</span>
      <i
        className="cursor-pointer ml-2"
        onClick={() => {
          props.onSelect(props.id);
        }}
      >
        <MdCancel color="#ececec" size={20} />
      </i>
    </div>
  );
}

function DoctorProfile() {
  const [name, setName] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [age, setAge] = useState(0);
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState([]);
  const [specializationName, setSpecializationName] = useState([]);
  const [hospital, setHospital] = useState("");
  const [message, setMessage] = useState(""); //Shree this is the error message for create Patient,please display it
  const [workingDays, setWorkingDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const dispatch = useDispatch();
  const [isUpdated, setIsUpdated] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const registeredUser = useSelector((state) => state.profileReducer);
  const authUser = useSelector((state) => state.authReducer);
  const history = useHistory();
  const currentUser = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (!authUser.isSignedUp) history.push("/");
    if (authUser.type === "patient") history.goBack();
    setIsUpdated(false);
    if (registeredUser.name) {
      setIsAlreadyRegistered(true);
      setSpecialization(registeredUser.specializations);
      setAge(registeredUser.age);
      setName(registeredUser.name);
      setAddress(registeredUser.address);
      setQualifications(registeredUser.qualifications);
      setDepartment(registeredUser.department);
      setEmail(registeredUser.email);
      setSpecializationName(registeredUser.specializations[0]);
      setHospital(registeredUser.hospitalName);
      setWorkingDays(registeredUser.workingDays);
      setStartTime(registeredUser.workingHrs.start);
      setEndTime(registeredUser.workingHrs.end);
    }
  }, []);

  useEffect(() => {
    if (!authUser.isSignedUp) history.push("/");
  }, [authUser]); // Shree you can comment this out if needed for testing purposes

  useEffect(() => {
    setLoading(false);
    if (isUpdated && !registeredUser.errorMessage)
      history.push("/doctor-dashboard");
    else if (registeredUser.isLoading) console.log("Loading");
    else if (registeredUser.errorMessage)
      setMessage(registeredUser.errorMessage);
    else if (registeredUser.registered && !authUser.isLoggedIn)
      history.push({
        pathname: "/signin",
        state: {
          type: "doctor",
        },
      });
    // else if (registeredUser.registered && authUser.isLoggedIn)
    //   history.push("/doctor-dashboard");
  }, [registeredUser]);

  const handleDays = (e) => {
    if (workingDays.includes(e.target.name))
      setWorkingDays(
        workingDays.filter((day) => {
          return day !== e.target.name;
        })
      );
    else setWorkingDays([...workingDays, e.target.name]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (startTime > endTime) alert("Starting time cannot be more than ending");

    if (!isAlreadyRegistered)
      dispatch(
        createDoctorProfile(
          JSON.stringify({
            id: authUser.id,
            name: name,
            age: age,
            workingDays: workingDays,
            workingHrs: {
              start: startTime,
              end: endTime,
            },
            address: address,
            qualifications: qualifications,
            phoneNo: authUser.phoneno,
            hospitalName: hospital,
            specialisations: specialization,
            department: department,
            email: email,
            type: "doctor",
          })
        )
      );
    else {
      setIsUpdated(true);
      dispatch(
        updateDoctorAsync(
          JSON.stringify({
            name: name,
            age: age,
            workingDays: workingDays,
            workingHrs: {
              start: startTime,
              end: endTime,
            },
            address: address,
            qualifications: qualifications,
            phoneNo: authUser.phoneno,
            hospitalName: hospital,
            specialisations: specialization,
            department: department,
            email: email,
          })
        )
      );
    }
  };

  const addSpecialization = () => {
    if (specializationName !== "") {
      setSpecialization([...specialization, specializationName]);
      // setSpecializationName("");
    }
  };
  const removeSpecialization = (index) => {
    setSpecialization(specialization.filter((elem, ind) => ind !== index));
  };

  const handleProfile = () => {
    history.push("/doctor-profile");
  };

  const handleDashboard = () => {
    history.push("/doctor-dashboard");
  };

  const handleLogout = () => {
    setLoading(true);
    if (currentUser.type === "doctor")
      dispatch(doctorLogout(currentUser.access, currentUser.phoneno));
    else dispatch(patientLogout(currentUser.access, currentUser.phoneno));
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
        <FadeLoader color={"#3DA0DE"} loading={true} size={200} />
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
                  <div className="px-4 sm:px-0">
                    <h1 className="text-dark text-2xl lg:text-3xl md:text-3xl">
                      Personal Information
                    </h1>
                    <p className="mt-1 mb-5 text-md text-gray-600">
                      This information will be displayed to organisation so be
                      careful what you share.
                    </p>
                  </div>
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
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
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
                              required
                              defaultValue={authUser.phoneno}
                              disabled
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label
                              htmlFor="last-name"
                              className="block text-md font-medium text-gray-700"
                            >
                              Qualifications
                            </label>
                            <input
                              type="text"
                              name="qualifications"
                              id="qualifications"
                              required
                              autoComplete="qualifications"
                              value={qualifications}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) =>
                                setQualifications(e.target.value)
                              }
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label
                              htmlFor="gender"
                              className="block text-md font-medium text-gray-700"
                            >
                              Hospital Name
                            </label>
                            <input
                              type="text"
                              name="hospital"
                              id="hospital"
                              autoComplete="hospital"
                              required
                              value={hospital}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setHospital(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label
                              htmlFor="bloodgp"
                              className="block text-md font-medium text-gray-700"
                            >
                              Department
                            </label>
                            <input
                              type="text"
                              name="department"
                              id="department"
                              autoComplete="department"
                              required
                              value={department}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setDepartment(e.target.value)}
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
                          <div className="col-span-6 ">
                            <label
                              htmlFor="last-name"
                              className="block text-md font-medium text-gray-700"
                            >
                              Specializations
                            </label>
                            <div className="flex justify-between items-center">
                              <input
                                type="text"
                                name="specialization"
                                id="specialization"
                                value={specializationName}
                                autoComplete="specialization"
                                placeholder="Enter a specialization"
                                className="mt-1 p-2 focus:ring-primary focus:border-primary w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                onChange={(e) =>
                                  setSpecializationName(e.target.value)
                                }
                                required
                              />
                              <span
                                className={`inline-flex justify-center py-2 px-4 ml-1 border border-transparent shadow-sm cursor-pointer text-md font-medium rounded-md text-white ${
                                  specializationName.length > 0
                                    ? "bg-primary"
                                    : "bg-blue-100"
                                } hover:opacity-85 focus:outline-none`}
                                onClick={addSpecialization}
                              >
                                Add
                              </span>
                            </div>
                          </div>
                          <div className="grid md:flex">
                            {specialization.map((elem, index) => (
                              <SpecializationTag
                                tag={elem}
                                key={index}
                                id={index}
                                onSelect={removeSpecialization}
                              />
                            ))}
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
                              autoComplete="street-address"
                              required
                              value={address}
                              className="mt-1 p-2 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6">
                            <div className="block text-md font-medium mb-4 text-gray-700">
                              Working Days
                            </div>
                            <div className="grid md:flex">
                              <div className="flex items-center">
                                <input
                                  id="Mon"
                                  name="monday"
                                  type="checkbox"
                                  onChange={(e) => handleDays(e)}
                                  checked={
                                    workingDays.includes("monday")
                                      ? true
                                      : false
                                  }
                                  className="block text-md font-medium text-gray-700"
                                />
                                <label
                                  htmlFor="Mon"
                                  className="block text-md font-medium mr-5 ml-1 text-gray-700"
                                >
                                  Mon
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="Tue"
                                  name="tuesday"
                                  type="checkbox"
                                  onChange={(e) => handleDays(e)}
                                  checked={
                                    workingDays.includes("tuesday")
                                      ? true
                                      : false
                                  }
                                  className="block text-md font-medium text-gray-700"
                                />
                                <label
                                  htmlFor="Tue"
                                  className="block text-md font-medium mr-5 ml-1 text-gray-700"
                                >
                                  Tue
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="Wed"
                                  name="wednesday"
                                  type="checkbox"
                                  onChange={(e) => handleDays(e)}
                                  checked={
                                    workingDays.includes("wednesday")
                                      ? true
                                      : false
                                  }
                                  className="block text-md font-medium text-gray-700"
                                />
                                <label
                                  htmlFor="Wed"
                                  className="block text-md font-medium mr-5 ml-1 text-gray-700"
                                >
                                  Wed
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="Thur"
                                  name="thursday"
                                  type="checkbox"
                                  onChange={(e) => handleDays(e)}
                                  checked={
                                    workingDays.includes("thursday")
                                      ? true
                                      : false
                                  }
                                  className="block text-md font-medium text-gray-700"
                                />
                                <label
                                  htmlFor="Thur"
                                  className="block text-md font-medium mr-5 ml-1 text-gray-700"
                                >
                                  Thur
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="Fri"
                                  name="friday"
                                  type="checkbox"
                                  onChange={(e) => handleDays(e)}
                                  checked={
                                    workingDays.includes("friday")
                                      ? true
                                      : false
                                  }
                                  className="block text-md font-medium text-gray-700"
                                />

                                <label
                                  htmlFor="Fri"
                                  className="block text-md font-medium mr-5 ml-1 text-gray-700"
                                >
                                  Fri
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="Sat"
                                  name="saturday"
                                  type="checkbox"
                                  checked={
                                    workingDays.includes("saturday")
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => handleDays(e)}
                                  className="block text-md font-medium text-gray-700"
                                />

                                <label
                                  htmlFor="street-address"
                                  className="block text-md font-medium mr-5 ml-1 text-gray-700"
                                >
                                  Sat
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="Sun"
                                  name="sunday"
                                  type="checkbox"
                                  onChange={(e) => handleDays(e)}
                                  className="block text-md font-medium text-gray-700"
                                  checked={
                                    workingDays.includes("sunday")
                                      ? true
                                      : false
                                  }
                                />
                                <label
                                  htmlFor="Sun"
                                  className="block text-md font-medium mr-5 ml-1 text-gray-700"
                                >
                                  Sun
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-6">
                            <div className="block text-md font-medium mb-4 text-gray-700">
                              Working Hours
                            </div>
                            <div className="grid md:flex items-center justify-start">
                              <div className="flex items-center justify-start pl-4 pr-1 py-1 bg-blue-300 rounded-3xl">
                                <label
                                  htmlFor="start"
                                  className="block text-md font-medium  mr-3 text-gray-700 rounded-3xl"
                                >
                                  Start Time
                                </label>
                                <input
                                  type="time"
                                  name="start"
                                  id="start"
                                  value={startTime}
                                  onChange={(e) =>
                                    setStartTime(e.target.value + ":00")
                                  }
                                  required
                                  className="block text-md font-medium text-gray-700 px-4 py-1 rounded-3xl focus:outline-none"
                                />
                              </div>
                              <div className="flex items-center justify-start md:ml-6 md:mt-0 mt-5 pl-4 pr-1 py-1 bg-blue-300 rounded-3xl">
                                <label
                                  htmlFor="end"
                                  className="block text-md font-medium  mr-3 text-gray-700"
                                >
                                  End Time
                                </label>
                                <input
                                  type="time"
                                  name="end"
                                  id="end"
                                  value={endTime}
                                  onChange={(e) =>
                                    setEndTime(e.target.value + ":00")
                                  }
                                  required
                                  className="block text-md font-medium text-gray-700 px-4 py-1 rounded-3xl focus:outline-none"
                                />
                              </div>
                            </div>
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

export default DoctorProfile;
