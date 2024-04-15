import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/Admin.css";
import { Link, useNavigate } from "react-router-dom";

function AllCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const navigation = useNavigate();

  // Fetch all campaigns when the component mounts
  useEffect(() => {
    fetchAllCampaigns();
  }, []);

  // Function to fetch all campaigns from the backend API
  const fetchAllCampaigns = async () => {
    try {
      const response = await fetch("https://localhost:7063/api/campaign");
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data);
      } else {
        console.error("Failed to fetch campaigns");
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  // Function to handle deleting a campaign
  const handleDeleteCampaign = async (id) => {
    // console.log("camapign deleted");
    try {
      const response = await fetch(
        `https://localhost:7063/api/campaign/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Remove the deleted campaign from the list
        setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
        toast.success("Campaign deleted successfully", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      } else {
        console.error("Failed to delete campaign");
        toast.error("Failed to delete campaign", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  return (
    <div className="all-campaigns-container">
      <h2>All Campaigns</h2>
      <Link to="/dashboard" className="back-btn">
        Go Back
      </Link>
      <ul className="campaigns-list">
        {campaigns.map((campaign) => (
          <li key={campaign.id} className="campaign-item">
            <div className="campaign-info">
              <span className="campaign-title">{campaign.title}</span>
              <div className="campaign-actions">
                <button
                  className="campaign-action-button delete-button"
                  onClick={() => handleDeleteCampaign(campaign.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                  className="campaign-action-button edit-button"
                  onClick={() =>
                    navigation(`/admin/update-campaign/${campaign.id}`)
                  }
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default AllCampaigns;
