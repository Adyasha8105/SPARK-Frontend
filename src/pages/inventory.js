/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import WaitingListItemButton from "../components/WaitingListItemButton";
import {
  cancelAppointmentAction,
  getAppointmentAction,
} from "../redux/actions/appointmentAction";
import Lottie from "lottie-react";
import { MdDashboard, MdFolder, MdPerson } from "react-icons/all";
import SideBarAnimation from "../images/SideBarAnimation.json";
import {
  doctorLogout,
  patientLogout,
} from "../redux/actions/userAuthAction.js";
import InventoryAnimation from "../images/InventoryAnimation.json";
import { HiLogout } from "react-icons/hi";

function Inventory() {
  const currentUser = useSelector((state) => state.authReducer);
  let appointmentList = useSelector(
    (state) => state.appointmentReducer.appointments
  );
  const loadingApt = useSelector((state) => state.appointmentReducer.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [cancelItem, setCancelItem] = useState(null);

  useEffect(() => {
    if (!currentUser.isLoggedIn) history.push("/");
    fetchAllAppointments();
  }, []);
  const fetchAllAppointments = () => {
    //------------FETCHES LIST OF APPOINTMENT FOR THE CURRENT LOGGED IN PATIENT----------------------//
    const data = {
      pphoneNo: currentUser.phoneno,
      // status: "queued",
      forUser: currentUser.type,
    };
    dispatch(getAppointmentAction(data));
  };
  useEffect(() => {
    setLoading(false);
    if (currentUser.isLogout) history.push("/");
  }, [currentUser]);
  useEffect(() => {
    if (cancelItem) {
      handleCancelAppointment();
    }
  }, [cancelItem]);
  const handleCancelAppointment = () => {
    //----------------FUNCTION TO CANCEL APPOINTMENT-----------------------//

    // to remove the "Z" at the end of createdat
    // const formatted = appointmentDetails(appointmentDate).createdat;
    // formatted = formatted.slice(0, -1);

    const cancelData = {
      pphoneno: cancelItem.pphoneno,
      dphoneno: cancelItem.dphoneno,
      aptdate: cancelItem.apdate,
      createdat: cancelItem.createdat.slice(0, -1),
    };

    dispatch(cancelAppointmentAction(cancelData));
  };

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

  // appointmentList = appointmentList.filter(appointment => appointment.status!=='completed')
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
          href="/inventory"
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
          {appointmentList.length < 1 ? (
            <section className="flex flex-wrap p-6 justify-evenly">
              <div className="items-center mt-4">
                <h1 className="text-dark font-bold md:text-3xl text-2xl">
                  No Appointments!!
                </h1>
                <p className="mt-1 mb-5 md:text-lg text-md text-gray-600">
                  You have no appointments yet. Go to Dashboard to create your
                  appointment.
                </p>
              </div>
              <div className="w-72">
                <Lottie animationData={InventoryAnimation} />
              </div>
            </section>
          ) : (
            <div className="mt-10 sm:mt-0">
              <div className="p-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0 space-y-5">
                    <h1 className="text-dark text-2xl lg:text-3xl md:text-3xl">
                      Your Appointments
                    </h1>
                    <h3 className="text-gray-400 text-xl  md:text-2xl">
                      Total appointments: {appointmentList.length}
                    </h3>

                    <div className="flex flex-wrap">
                      {appointmentList.map((item, index) => {
                        return (
                          <div className="p-4 lg:w-1/4 w-full" key={index}>
                            <div className="grid border-2 border-gray-200 px-4 py-6 rounded-lg">
                              <h2 className="title-font text-center font-medium text-2xl md:text-lg lg:text-xl 2xl:text-3xl text-gray-900">
                                {item.apdate}
                              </h2>
                              <p className="leading-relaxed capitalize mt-5">
                                Type: {item.type}
                              </p>
                              <p className="truncate mt-2">
                                Symptoms: {item.symptoms}{" "}
                              </p>

                              <div className="mt-4 flex justify-center">
                                <WaitingListItemButton
                                  appointmentStatus={
                                    item.status === "queued"
                                      ? "Cancel"
                                      : item.status
                                  }
                                  onClickFunc={handleCancelAppointment}
                                  item={item}
                                  isClicked={setCancelItem}
                                  loading={loadingApt}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Inventory;
