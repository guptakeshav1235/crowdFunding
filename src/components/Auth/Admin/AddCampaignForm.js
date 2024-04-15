import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/Admin.css";

function AddCampaignForm() {
  const [formData, setFormData] = useState({
    title: "",
    creator: "",
    goal: 0,
    equityShares: 0,
    description: "",
  });
  const navigation = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to submit campaign data
    // console.log("Submitted:", formData);

    try {
      const response = await fetch("https://localhost:7063/api/campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Campaign added successfully");
        toast.success("Campaign added successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigation("/dashboard");
        }, 2000);
      } else {
        console.error("Failed to add campaign");
        toast.error("Failed to add campaign", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error adding campaign:", error);
    }
  };

  return (
    <div className="add-campaign-container">
      <div className="add-campaign-form">
        <h2>Add New Campaign</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="creator">Creator</label>
            <input
              type="text"
              id="creator"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="goal">Goal</label>
            <input
              type="number"
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="equityShares">Equity Shares</label>
            <input
              type="decimal"
              id="equityShares"
              name="equityShares"
              value={formData.equityShares}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="interactive-elements">
            <Link to="/dashboard" className="back-btn">
              Go Back
            </Link>
            <button type="submit-campaign" className="submit-campaign">
              Add Campaign
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddCampaignForm;
