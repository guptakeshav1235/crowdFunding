import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/PaymentPage.css";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [errorToast, setErrorToast] = useState("");
  const [successToast, setSuccessToast] = useState("");
  const [amount, setAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [userId, setUserId] = useState("");
  const [campaignId, setCampaignId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const navigation = useNavigate();

  useEffect(() => {
    // Fetch the amount from local storage when the component mounts
    const storedAmount = localStorage.getItem("contributionAmount");

    const storedUserId = localStorage.getItem("userId");
    const storedCampaignId = localStorage.getItem("campaignId");

    if (storedAmount) {
      setAmount(parseFloat(storedAmount));
    }

    if (storedUserId) {
      setUserId(storedUserId);
    }

    if (storedCampaignId) {
      setCampaignId(storedCampaignId);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing || !stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      const contributionResponse = await fetch(
        "https://localhost:7063/api/contribution",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            CampaignId: campaignId,
            UserId: userId,
            Amount: amount,
          }),
        }
      );

      if (!contributionResponse.ok) {
        throw new Error("Failed to add contribution");
      }

      // Proceed with Stripe payment
      const paymentIntentResponse = await fetch(
        "https://localhost:7063/api/Payments/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: amount,
          }),
        }
      );

      if (!paymentIntentResponse.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await paymentIntentResponse.json();

      if (data.clientSecret) {
        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        if (result.paymentIntent.status === "succeeded") {
          console.log(data);
          toast.success("Payment successful", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigation("/reports");
          }, 1000);
        } else {
          throw new Error("Unexpected payment status");
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-form-container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <label className="card-details-label">
          Card details
          <CardElement className="card-element" />
        </label>
        <button type="submit" className="pay-button" disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay ${amount}`}
        </button>
      </form>
      {errorToast && <div className="toast error">{errorToast}</div>}
      {successToast && <div className="toast success">{successToast}</div>}
      <ToastContainer />
    </div>
  );
};

export default PaymentForm;
