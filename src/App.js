import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import WelcomePage from "./components/Dashboard/Welcome";
import CampaignDetails from "./components/Dashboard/CampaignDetails";
import GoalSettings from "./components/Settings/GoalSettings";
import PaymentReports from "./components/Reports/PaymentReports";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Footer from "./components/Shared/Footer";
import Home from "./components/Shared/Home";
import image from "./images/image2.jpg";
import { UserProvider, useUserContext } from "./context/UserContext";
import PaymentPage from "./components/Payment/PaymentPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UserList from "./components/Auth/Admin/UpdateCampaignForm";
import UpdateCampaignForm from "./components/Auth/Admin/UpdateCampaignForm";
import AllCampaigns from "./components/Auth/Admin/AllCampaigns";
import AddCampaignForm from "./components/Auth/Admin/AddCampaignForm";
import AllUsers from "./components/Auth/Admin/AllUsers";
// import { ContributionProvider } from "./context/ContributionContext";

const stripePromise = loadStripe(
  "pk_test_51Oqs2rK55Ul79p2zt3GLyCynXLoLkyQPKOzLIuocAEuF6rd00RXyQiv79UC3L4Cfen4NPelyYBYIYfVsmw4ZyQuK00tT2KC13i"
);

function App() {
  // Load dummyData and contributions from local storage or use default values
  const [dummyData, setDummyData] = useState(() => {
    const storedData = localStorage.getItem("dummyData");
    return storedData
      ? JSON.parse(storedData)
      : [
          {
            id: 1,
            title: "Project A: Innovative Tech Solution",
            creator: "John Doe",
            goal: 5000,
            currentAmount: 0,
            backers: 0,
            equityShares: 2,
            image: image,
            description:
              "This project aims to develop an innovative tech solution that will revolutionize the industry. We are seeking support to fund research, development, and production.Welcome to the future of groundbreaking technology with Project A! We invite you to join us on an extraordinary journey of innovation and progress. At the intersection of creativity and cutting-edge technology, Project A aims to redefine the landscape of the industry. Our Vision is Imagine a world where boundaries are pushed, and possibilities are endless. Project A is more than just a venture; it's a commitment to creating a transformative tech solution that will revolutionize how we live, work, and interact with the world around us. By supporting Project A, you become an integral part of this journey. Your contribution fuels research, development, and production, propelling us closer to a future where possibilities are limitless. ",
          },
          {
            id: 2,
            title: "Project B: Eco-friendly Product",
            creator: "Jane Smith",
            goal: 10000,
            currentAmount: 0,
            backers: 0,
            equityShares: 2,
            image: image,
            description:
              "Join us in creating a sustainable future! Project B focuses on developing an eco-friendly product that will reduce environmental impact. Your contribution will make a difference.",
          },
        ];
  });

  const [contributions, setContributions] = useState(() => {
    const storedContributions = localStorage.getItem("contributions");
    return storedContributions ? JSON.parse(storedContributions) : [];
  });

  useEffect(() => {
    // Save dummyData and contributions to local storage whenever they change
    localStorage.setItem("dummyData", JSON.stringify(dummyData));
    localStorage.setItem("contributions", JSON.stringify(contributions));
  }, [dummyData, contributions]);

  const addContribution = (contribution) => {
    setContributions((prevContributions) => [
      ...prevContributions,
      contribution,
    ]);
  };

  const { user } = useUserContext();

  return (
    <UserProvider>
      <Router>
        <div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/admin" element={<Admin />} /> */}
              <Route path="/admin/add-campaign" element={<AddCampaignForm />} />
              <Route path="/admin/all-campaigns" element={<AllCampaigns />} />
              <Route
                path="/admin/update-campaign/:id"
                element={<UpdateCampaignForm />}
              />
              <Route path="/admin/all-users" element={<AllUsers />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route
                path="/dashboard"
                element={<WelcomePage dummyData={dummyData} />}
              />
              <Route
                path="/reports"
                element={
                  <PaymentReports
                    contributions={contributions}
                    dummyData={dummyData}
                  />
                }
              />

              <Route
                path="/payment"
                element={
                  <Elements stripe={stripePromise}>
                    <PaymentPage />
                  </Elements>
                }
              />
              <Route
                path="/campaign/:id"
                element={
                  <CampaignDetails
                    dummyData={dummyData}
                    setDummyData={setDummyData}
                    addContribution={addContribution}
                    user={user}
                  />
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
