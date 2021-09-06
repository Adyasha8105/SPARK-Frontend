/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import PatientProfileCard from "../../components/PatientProfileCard.jsx";
import Card from "../../components/Card.jsx";
import WaitingListItem from "../../components/DoctorList.js";
import { useSelector } from "react-redux";
import {
  doctorLogout,
  patientLogout,
} from "../../redux/actions/userAuthAction.js";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import {
  getDoctorProfile,
  getAllPatients,
} from "../../redux/actions/getUserAction.js";
import {
  getTodayAppointmentAction,
  updateAppointmentAction,
} from "../../redux/actions/appointmentAction.js";
import { FadeLoader } from "react-spinners";
import DateTime from "../../components/DateTime.js";
import SideBarAnimation from "../../images/SideBarAnimation.json";
import { HiLogout } from "react-icons/hi";
import { MdDashboard, MdPerson } from "react-icons/all";
import InventoryAnimation from "../../images/InventoryAnimation.json";
import { convertTo12 } from "../../utils/time";

function DoctorDashboard() {
  const currentUser = useSelector((state) => state.authReducer);
  const currentPatient = useSelector((state) => state.patientReducer);
  const currentUserDetails = useSelector((state) => state.profileReducer);
  var appointmentList = useSelector(
    (state) => state.todayAppointmentReducer.appointments
  );
  const isUpdated = useSelector(
    (state) => state.todayAppointmentReducer.updated
  );
  const loadingApt = useSelector(
    (state) => state.todayAppointmentReducer.isLoading
  );
  const [applist, setApplist] = useState([]);
  const [latestPatient, setLatestPatient] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const { date, time } = DateTime();

  //--------------COMPONENTS MOUNT THEN THIS IS CALLED--------------------------------------------------------------------//
  useEffect(() => {
    setLoading(true);
    fetchAllAppointments();
    if (!currentUser.isLoggedIn) history.push("/");
    if (currentUser.type === "patient") history.goBack();
    if (currentUser.isLoggedIn && currentUser.isRegistered) {
      dispatch(getDoctorProfile(currentUser.phoneno));
    }
  }, []);

  //---------------APPOINTMENT LIST UPDATED THEN THIS IS CALLED----------------------------------------------------------//
  useEffect(() => {
    fetchAllAppointments();
  }, [isUpdated]);

  useEffect(() => {
    if (appointmentList.length > 0) {
      getCurrentPatientDetails();
      const newArray = [...appointmentList];
      if (newArray.length === 1) newArray[0].status = "Next";
      else newArray[0].status = "Ongoing";
      if (newArray.length > 1) newArray[1].status = "Next";
      setApplist([...newArray]);
    }
  }, [appointmentList]);

  //------------------AUTHUSER CHANGES OR CURRENT PATIENT CHANGES THEN THIS IS CALLED-------------------------------------//
  useEffect(() => {
    setLoading(false);
    if (currentPatient.name !== "") setLatestPatient(currentPatient);
    if (currentUser.isLogout) history.push("/");
  }, [currentUser, currentPatient]);

  // ----------------This should be called once AppointmentList is populated-----------------------------------------------//

  const getCurrentPatientDetails = () => {
    if (appointmentList.length > 0) {
      dispatch(getAllPatients(appointmentList[0].pphoneno));
    } else {
      setLoading(false);
    }
  };

  const handleUpdateAppointment = () => {
    // to remove the "Z" at the end of createdat

    var formatted = appointmentList[0].createdat;
    formatted = formatted.slice(0, -1);

    if (!latestPatient) console.log("NO LATEST PATIENT");
    else {
      const updateData = {
        pphoneno: currentPatient.phoneno,
        dphoneno: currentUser.phoneno,
        apdate: appointmentList[0].apdate,
        createdat: formatted,
        status: "completed",
      };

      dispatch(updateAppointmentAction(updateData));
    }
  };

  const fetchAllAppointments = () => {
    const data = {
      dphoneNo: currentUser.phoneno,
      status: "queued",
      forUser: "doctor",
    };

    dispatch(getTodayAppointmentAction(data));
  };

  const symptoms =
    appointmentList.length > 0
      ? appointmentList[appointmentList.length - 1].symptoms
      : "";

  const handleProfile = () => {
    history.push("/doctor-profile");
  };

  const handleDashboard = () => {
    history.push("/doctor-dashboard");
  };

  const handleLogout = (e) => {
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
            href="/doctor-dashboard"
            id="sidenav-close"
            title="Close Menu"
            aria-label="Close Menu"
          ></a>
        </aside>
        <main className="overflow-y-scroll h-screen">
          <header className="flex items-center justify-between p-4 bg-white z-10">
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
          <div className="md:flex grid items-center justify-between">
            <h1 className="mx-2 text-xl font-bold text-gray-900">
              <input
                type="text"
                className="md:w-96 py-2.5 px-4 md:ml-5 rounded-full outline-none bg-gray-100"
                placeholder="Enter search keywords"
              />
            </h1>
            <p className="text-sm hidden md:flex md:text-xl">
              <span className="text-lg md:text-xl mr-6 text-dark">{date}</span>
              <span className="text-lg md:text-xl md:mr-12 text-dark">
                {time}
              </span>
            </p>
          </div>

          <section className="grid p-6">
            <h1 className="lg:text-4xl md:text-3xl text-xl font-semibold mt-4 text-dark">
              Welcome, {currentUserDetails.name}
            </h1>
            <h4 className="md:text-lg text-md text-gray-600 mt-3">
              You have {appointmentList.length} appointments scheduled for
              today.
            </h4>
            <div className="flex lg:flex-row flex-col space-x-0 lg:space-x-4 justify-start">
              <Card about="Patients" number="189" />
              <Card about="Tests" number="78" />
              <Card about="Cancelled" number="12" />
            </div>
          </section>
          {appointmentList.length > 0 ? (
            <section className="flex flex-wrap">
              <div className="w-full lg:w-2/3">
                <div className="flex flex-col w-full p-6">
                  <div className="grid md:flex flex-row w-full items-center mt-4 justify-between">
                    <h3 className="grid md:flex text-2xl text-md font-bold text-dark">
                      Appointment List
                    </h3>
                  </div>
                  <div className="flex flex-row items-center mt-8">
                    <div className="flex flex-col my-2 space-y-4 w-full overflow-x-auto">
                      {applist.map((item, index) => {
                        return (
                          <WaitingListItem
                            key={index}
                            serialNo={item.serialno}
                            time={`${convertTo12(
                              item.aptime.start
                            )} - ${convertTo12(item.aptime.end)}`}
                            date={date}
                            onClickFunc={() => {
                              handleUpdateAppointment();
                            }}
                            appointmentStatus={item.status}
                            loading={loadingApt}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col flex-grow lg:m-10 mx-auto my-10">
                    <h3 className="grid md:flex text-2xl text-md font-bold text-dark mb-10 pl-4">
                      Patient's details
                    </h3>
                    <PatientProfileCard
                      name={currentPatient.name || ""}
                      symptoms={symptoms}
                      bloodgroup={currentPatient.bloodgp || ""}
                      address={currentPatient.address || ""}
                      phone={currentPatient.phoneno || ""}
                    />
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="flex flex-wrap p-6 justify-evenly">
              <div className="items-center mt-4 self-center">
                <h3 className="mb-5 flex text-2xl text-md font-bold text-dark">
                  You have no appointments for today!!
                </h3>
              </div>
              <div className="w-72">
                <Lottie animationData={InventoryAnimation} />
              </div>
            </section>
          )}
        </main>
      </div>
    );
}

export default DoctorDashboard;
