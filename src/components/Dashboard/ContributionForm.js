import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/ContributionForm.css";
import { useNavigate } from "react-router-dom";

function ContributionForm({ onSubmit, onClose, campaign }) {
  const [contributionAmount, setContributionAmount] = useState("");

  const navigation = useNavigate();

  const handleAmountChange = (e) => {
    // setContributionAmount(parseFloat(e.target.value));
    setContributionAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(contributionAmount, 10) > campaign.goal) {
      toast.error("No more contribution now", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // console.log(`Contribution submitted: $${contributionAmount}`);
    onSubmit(parseInt(contributionAmount, 10));

    localStorage.setItem("contributionAmount", contributionAmount);

    navigation("/payment");

    // Close the form
    onClose();
  };

  return (
    <div className="contribution-form-container">
      <div className="contribution-form">
        <h3>Contribute to {campaign.title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contributionAmount">Contribution Amount ($)</label>
            <input
              type="number"
              id="contributionAmount"
              value={contributionAmount}
              onChange={handleAmountChange}
              required
            />
          </div>
          <div className="button-container">
            <button type="contribute">Contribute</button>
            <button type="cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ContributionForm;
