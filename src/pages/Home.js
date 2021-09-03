/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import DataDisplay from "../components/landingPage/DataDisplay";
import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import Hero from "../components/landingPage/Hero";
import WhyUs from "../components/landingPage/WhyUs";
import ContactUs from "../components/landingPage/ContactUs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { cleanStateAction } from "../redux/actions/userAuthAction";
import { useDispatch } from "react-redux";

function Home() {
  const currentUser = useSelector((state) => state.authReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanStateAction())
    if (currentUser.isLoggedIn) history.push("/dashboard");
  }, []);
  return (
    <div>
      <Header />
      <Hero />
      <WhyUs />
      <DataDisplay />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Home;
