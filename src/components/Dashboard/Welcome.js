import React, { useEffect, useState } from "react";
import "../../styles/Welcome.css";
import { Link } from "react-router-dom";
// import { useContributionContext } from "../../context/ContributionContext";

function WelcomePage() {
  // const { contributions } = useContributionContext();
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("https://localhost:7063/api/campaign");
        if (response.ok) {
          const data = await response.json();
          setCampaigns(data);
        } else {
          console.error("Error fetching campaigns");
        }
      } catch (error) {
        console.error("Error fetching campaigns", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="welcome-container">
      <h2>Welcome to Our Crowdfunding Dashboard</h2>
      <p>
        Explore exciting projects, track your contributions, and stay updated on
        the latest campaigns.
      </p>
      <div className="campaign-list">
        <h3>Ongoing Campaigns</h3>
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-item">
            <h4>{campaign.title}</h4>
            <p>Creator: {campaign.creator}</p>
            <p>Goal: ${campaign.goal}</p>
            <p>Current Amount: ${campaign.currentAmount}</p>
            <p>Backers: {campaign.backers}</p>
            <p>Equity Shares:{campaign.equityShares}%</p>

            <Link to={`/campaign/${campaign.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WelcomePage;
