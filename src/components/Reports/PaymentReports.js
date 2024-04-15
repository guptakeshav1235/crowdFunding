// import React, { useEffect, useState } from "react";
// import "../../styles/PaymentReports.css"; // Make sure to create this file for styling
// import { useUserContext } from "../../context/UserContext";
// import { Link } from "react-router-dom";

// function PaymentReports() {
//   const [contributions, setContributions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { user, loading: userLoading } = useUserContext();

//   useEffect(() => {
//     if (!user && !userLoading) {
//       // User is not logged in
//       setLoading(false);
//       return;
//     }
//     fetchContributions();
//   }, [userLoading, user]);

//   const fetchContributions = async () => {
//     try {
//       // const username = "Keshav Gupta";
//       // const email = "guptakeshav1235@gmail.com";
//       // const password =
//       //   "$2a$11$5kSa1orWXwUWSKdwQP5Rm.ePACrK9IZgfW4X.ZRHPu9Ok9153iE0W";

//       if (!user) {
//         throw new Error("User not logged in");
//       }

//       const { username, email, password } = user;

//       const url = new URL("https://localhost:7063/api/reports");
//       url.searchParams.append("username", username);
//       url.searchParams.append("email", email);
//       url.searchParams.append("password", password);

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch data: ${response.status} ${response.statusText}`
//         );
//       }

//       const data = await response.json();
//       setContributions(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to fetch data. Please try again later.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="payment-reports-container">
//       <h2>Payment Reports</h2>
//       {loading ? (
//         <p className="loading-message">Loading...</p>
//       ) : !user ? (
//         <div className="login-message">
//           <p>Please login to view payment reports.</p>
//           <Link to="/login" className="login-link">
//             Login
//           </Link>
//         </div>
//       ) : (
//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>Campaign</th>
//                 <th>Backer</th>
//                 <th>Amount</th>
//                 <th>Equity Share Percentage</th>
//                 {/* <th>Date</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {contributions.length > 0 ? (
//                 contributions.map((contribution, index) => (
//                   <tr key={index}>
//                     <td>{contribution.campaignTitle}</td>
//                     <td>{contribution.backer}</td>
//                     <td>${contribution.amount}</td>
//                     <td>{contribution.equityOffered.toFixed(2)}%</td>{" "}
//                     {/* Calculate equity share percentage */}
//                     {/* <td>
//                       {contribution.date
//                         ? new Date(contribution.date).toLocaleString()
//                         : "N/A"}
//                     </td> */}
//                   </tr>
//                 ))
//               ) : (
//                 <tr key="no-contributions">
//                   <td colSpan="5">No contributions available.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PaymentReports;

import React, { useEffect, useState } from "react";
import "../../styles/PaymentReports.css"; // Make sure to create this file for styling
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

function PaymentReports() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, loading: userLoading } = useUserContext();

  useEffect(() => {
    if (!user && !userLoading) {
      // User is not logged in
      setLoading(false);
      return;
    }

    if (user && user.isAdmin) {
      // Fetch contributions for all users only if the logged-in user is an admin
      fetchContributionsForAllUsers();
    } else if (user) {
      // Fetch contributions for the logged-in user
      fetchContributionsForUser(user.username, user.email, user.password);
    } else {
      setLoading(false);
    }
  }, [userLoading, user]);

  const fetchContributionsForAllUsers = async () => {
    try {
      const response = await fetch("https://localhost:7063/api/all-reports", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setContributions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  };

  const fetchContributionsForUser = async (username, email, password) => {
    try {
      const url = new URL("https://localhost:7063/api/reports");
      url.searchParams.append("username", username);
      url.searchParams.append("email", email);
      url.searchParams.append("password", password);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setContributions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="payment-reports-container">
      <h2>Payment Reports</h2>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : !user ? (
        <div className="login-message">
          <p>Please login to view payment reports.</p>
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Backer</th>
                <th>Amount</th>
                <th>Equity Share Percentage</th>
                {/* <th>Date</th> */}
              </tr>
            </thead>
            <tbody>
              {contributions.length > 0 ? (
                contributions.map((contribution, index) => (
                  <tr key={index}>
                    <td>{contribution.campaignTitle}</td>
                    <td>{contribution.backer}</td>
                    <td>${contribution.amount}</td>
                    <td>{contribution.equityOffered.toFixed(2)}%</td>{" "}
                    {/* Calculate equity share percentage */}
                    {/* <td>
                      {contribution.date
                        ? new Date(contribution.date).toLocaleString()
                        : "N/A"}
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr key="no-contributions">
                  <td colSpan="5">No contributions available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PaymentReports;
