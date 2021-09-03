import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/patientDashboard/patientDashboard";
import PatientProfile from "./pages/patientDashboard/patientProfile";
import DoctorProfile from "./pages/doctorDashboard/DoctorProfile";
import DoctorDashboard from "./pages/doctorDashboard/DoctorDashboard";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/Signup";
import Inventory from "./pages/inventory";

function App() {
  return (
    <div className="App font-sans">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/profile">
            <PatientProfile />
          </Route>
          <Route exact path="/inventory">
            <Inventory />
          </Route>
          <Route exact path="/doctor-profile">
            <DoctorProfile />
          </Route>
          <Route exact path="/doctor-dashboard">
            <DoctorDashboard />
          </Route>
          <Route
            exact
            path="/signin"
            render={(props) => <SignIn {...props} />}
          ></Route>
          <Route
            exact
            path="/signup"
            render={(props) => <SignUp {...props} />}
          ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
