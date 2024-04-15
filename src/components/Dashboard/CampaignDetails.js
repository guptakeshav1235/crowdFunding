// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import ContributionForm from "./ContributionForm";
// import "../../styles/CampaignDetails.css";
// import { useUserContext } from "../../context/UserContext";
// import image from "../../images/image2.jpg";
// import PaymentReports from "../Reports/PaymentReports";

// function CampaignDetails({ dummyData, setDummyData, addContribution }) {
//   const navigation = useNavigate();
//   const { user } = useUserContext();

//   const { id } = useParams();
//   const [showContributionForm, setShowContributionForm] = useState(false);
//   const [userContribution, setUserContribution] = useState(null);
//   const [campaign, setCampaign] = useState(null);
//   const [contributions, setContributions] = useState([]);

//   useEffect(() => {
//     const fetchCampaignDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://localhost:7063/api/campaign/${id}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setCampaign(data);
//           setContributions(data.contributions);
//         } else {
//           console.error("Error fetching campaign details");
//         }
//       } catch (error) {
//         console.error("Error fetching campaign details", error);
//       }
//     };
//     fetchCampaignDetails();
//   }, [id]);

//   useEffect(() => {
//     const storedUserContribution = localStorage.getItem(
//       `userContribution-${id}`
//     );

//     if (storedUserContribution) {
//       setUserContribution(JSON.parse(storedUserContribution));
//     }
//   }, [id]);

//   useEffect(() => {
//     if (campaign) {
//       const storedCampaign = localStorage.getItem(`campaign-${id}`);
//       if (storedCampaign) {
//         const storedData = JSON.parse(storedCampaign);
//         setDummyData((prevData) =>
//           prevData.map((item) =>
//             item.id === storedData.id ? storedData : item
//           )
//         );
//       }
//     }
//   }, [id, setDummyData, campaign]);

//   const handleContributeClick = () => {
//     if (user) {
//       localStorage.setItem("campaignId", id);
//       setShowContributionForm(true);
//     } else {
//       localStorage.setItem("campaignIdToRedirect", id);
//       navigation("/login");
//     }
//   };

//   const handleContributionSubmit = (contributionAmount) => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const backerName = storedUser ? storedUser.email : "John Doe";

//     const updatedUserContribution = {
//       campaignID: campaign.id,
//       amount: contributionAmount,
//     };
//     setUserContribution(updatedUserContribution);
//     localStorage.setItem(
//       `userContribution-${id}`,
//       JSON.stringify(updatedUserContribution)
//     );

//     const updatedData = dummyData.map((item) =>
//       item.id === campaign.id
//         ? {
//             ...item,
//             currentAmount: item.currentAmount + contributionAmount,
//             backers: item.backers + 1,
//           }
//         : item
//     );

//     localStorage.setItem(`campaign-${id}`, JSON.stringify(updatedData[0]));

//     setDummyData(updatedData);
//     setShowContributionForm(false);

//     const newContribution = {
//       id: Date.now(),
//       campaignTitle: campaign.title,
//       backer: backerName,
//       amount: contributionAmount,
//       date: new Date().toISOString(),
//     };

//     addContribution(newContribution);
//   };

//   return (
//     <>
//       <div className="campaign-home-container">
//         <div className="campaign-image-container">
//           <img src={image} alt={campaign?.title} />
//         </div>

//         <div className="campaign-content-container">
//           <h2>{campaign?.title}</h2>
//           <p>{campaign?.description}</p>
//           <p>
//             <span className="detail-label">Creator:</span> {campaign?.creator}
//           </p>
//           <p>
//             <span className="detail-label">Goal:</span> ${campaign?.goal}
//           </p>
//           <p>
//             <span className="detail-label">Current Amount:</span> $
//             {campaign?.currentAmount}
//           </p>
//           <p>
//             <span className="detail-label">Backers:</span> {campaign?.backers}
//           </p>
//           <p>
//             <span className="detail-label">Equity Shares:</span>
//             {campaign?.equityShares}%
//           </p>

//           <div className="interactive-elements">
//             <Link to="/dashboard" className="back-btn">
//               Back to Dashboard
//             </Link>
//             <button onClick={handleContributeClick} className="contribute-btn">
//               Contribute
//             </button>
//           </div>
//         </div>
//       </div>
//       {showContributionForm && (
//         <ContributionForm
//           campaign={campaign}
//           userContribution={userContribution}
//           onSubmit={handleContributionSubmit}
//           onClose={() => setShowContributionForm(false)}
//         />
//       )}
//       {campaign && campaign.contributions && (
//         <PaymentReports contributions={contributions} />
//       )}
//     </>
//   );
// }

// export default CampaignDetails;

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ContributionForm from "./ContributionForm";
import "../../styles/CampaignDetails.css";
import { useUserContext } from "../../context/UserContext";
import image from "../../images/image2.jpg";
import PaymentReports from "../Reports/PaymentReports";

function CampaignDetails({ dummyData, setDummyData, addContribution }) {
  const navigation = useNavigate();
  const { user } = useUserContext();

  const { id } = useParams();
  const [showContributionForm, setShowContributionForm] = useState(false);
  const [userContribution, setUserContribution] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7063/api/campaign/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setCampaign(data);
          setContributions(data.contributions);
        } else {
          console.error("Error fetching campaign details");
        }
      } catch (error) {
        console.error("Error fetching campaign details", error);
      }
    };
    fetchCampaignDetails();
  }, [id]);

  useEffect(() => {
    const storedUserContribution = localStorage.getItem(
      `userContribution-${id}`
    );

    if (storedUserContribution) {
      setUserContribution(JSON.parse(storedUserContribution));
    }
  }, [id]);

  useEffect(() => {
    if (campaign) {
      const storedCampaign = localStorage.getItem(`campaign-${id}`);
      if (storedCampaign) {
        const storedData = JSON.parse(storedCampaign);
        setDummyData((prevData) =>
          prevData.map((item) =>
            item.id === storedData.id ? storedData : item
          )
        );
      }
    }
  }, [id, setDummyData, campaign]);

  const handleContributeClick = () => {
    if (user && !user.isAdmin) {
      localStorage.setItem("campaignId", id);
      setShowContributionForm(true);
    } else if (!user) {
      localStorage.setItem("campaignIdToRedirect", id);
      navigation("/login");
    }
  };

  const handleContributionSubmit = (contributionAmount) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const backerName = storedUser ? storedUser.email : "John Doe";

    const updatedUserContribution = {
      campaignID: campaign.id,
      amount: contributionAmount,
    };
    setUserContribution(updatedUserContribution);
    localStorage.setItem(
      `userContribution-${id}`,
      JSON.stringify(updatedUserContribution)
    );

    const updatedData = dummyData.map((item) =>
      item.id === campaign.id
        ? {
            ...item,
            currentAmount: item.currentAmount + contributionAmount,
            backers: item.backers + 1,
          }
        : item
    );

    localStorage.setItem(`campaign-${id}`, JSON.stringify(updatedData[0]));

    setDummyData(updatedData);
    setShowContributionForm(false);

    const newContribution = {
      id: Date.now(),
      campaignTitle: campaign.title,
      backer: backerName,
      amount: contributionAmount,
      date: new Date().toISOString(),
    };

    addContribution(newContribution);
  };

  return (
    <>
      <div className="campaign-home-container">
        <div className="campaign-image-container">
          <img src={image} alt={campaign?.title} />
        </div>

        <div className="campaign-content-container">
          <h2>{campaign?.title}</h2>
          <p>{campaign?.description}</p>
          <p>
            <span className="detail-label">Creator:</span> {campaign?.creator}
          </p>
          <p>
            <span className="detail-label">Goal:</span> ${campaign?.goal}
          </p>
          <p>
            <span className="detail-label">Current Amount:</span> $
            {campaign?.currentAmount}
          </p>
          <p>
            <span className="detail-label">Backers:</span> {campaign?.backers}
          </p>
          <p>
            <span className="detail-label">Equity Shares:</span>
            {campaign?.equityShares}%
          </p>

          <div className="interactive-elements">
            <Link to="/dashboard" className="back-btn">
              Back to Dashboard
            </Link>
            {!user || (user && !user.isAdmin) ? (
              <button
                onClick={handleContributeClick}
                className="contribute-btn"
              >
                Contribute
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {showContributionForm && (
        <ContributionForm
          campaign={campaign}
          userContribution={userContribution}
          onSubmit={handleContributionSubmit}
          onClose={() => setShowContributionForm(false)}
        />
      )}
      {campaign && campaign.contributions && (
        <PaymentReports contributions={contributions} />
      )}
    </>
  );
}

export default CampaignDetails;
