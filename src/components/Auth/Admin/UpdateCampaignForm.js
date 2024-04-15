import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/Admin.css";

function UpdateCampaignForm({ match }) {
  const [formData, setFormData] = useState({
    title: "",
    creator: "",
    goal: 0,
    equityShares: 0,
    description: "",
  });
  const navigation = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(
          `https://localhost:7063/api/campaign/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error("Failed to fetch campaign");
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };
    fetchCampaign();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7063/api/campaign/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Campaign updated successfully");
        toast.success("Campaign updated successfully", {
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
        console.error("Failed to update campaign");
        toast.error("Failed to update campaign", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
    }
  };

  return (
    <div className="update-campaign-container">
      <div className="update-campaign-form">
        <h2>Update Campaign</h2>
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
            <Link to="/admin/all-campaigns" className="back-btn">
              Go Back
            </Link>
            <button type="submit" className="submit-campaign">
              Update Campaign
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateCampaignForm;
