import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Image1 from "../../images/image1.jpg";
import "../../styles/Home.css"; // Import your custom styles
import { useUserContext } from "../../context/UserContext";

function Home() {
  const { user } = useUserContext();
  const navigation = useNavigate();

  const handleVisitDashboard = () => {
    if (user) {
      navigation("/dashboard");
    } else {
      navigation("/login");
    }
  };

  return (
    <div className="home-container">
      <div className="image-container">
        <img src={Image1} alt="Crowdfunding Website" />
      </div>

      <div className="content-container">
        <h1>Welcome to Our Crowdfunding Platform</h1>
        <p className="tagline">Empowering Dreams, Igniting Innovations</p>
        <p>
          At our crowdfunding platform, we believe in the power of collective
          support to bring great ideas to life. Whether you're an entrepreneur
          with a groundbreaking project or someone passionate about supporting
          innovative ideas, you're in the right place.
        </p>

        <p>
          Our platform connects project creators with backers who share a common
          goal of making ideas a reality. From technology and arts to social
          causes, every contribution makes a difference.
        </p>

        <p>
          Explore the diverse range of campaigns, contribute to projects you're
          passionate about, and be part of the journey of turning dreams into
          reality.
        </p>

        <p>
          Discover innovation and support dreams with our crowdfunding platform.
          Empower creators and entrepreneurs to turn their visions into reality.
          Join a global community of backers who believe in groundbreaking
          projects. Explore a diverse range of campaigns spanning technology,
          art, social impact, and more. With transparent funding goals, engage
          in projects that resonate with your passions. Unleash the power of
          collective support and be a part of transformative journeys. From
          startups to creative endeavors, our platform connects visionaries with
          the backing they need. Elevate ideas, foster collaboration, and make a
          lasting impact on the world. Fuel the future of innovation by
          contributing to campaigns that inspire and shape tomorrow. Join us in
          bringing dreams to life, one pledge at a time.
        </p>

        <div className="benefits">
          <h2>Why Choose Our Crowdfunding Platform?</h2>
          <ul>
            <li>
              Transform Ideas into Reality: Back innovative projects and be part
              of their success story.
            </li>
            <li>
              Diverse Campaigns: Explore a wide range of campaigns, from
              technology and arts to social causes.
            </li>
            <li>
              Community Collaboration: Connect with like-minded individuals who
              share your passion for positive change.
            </li>
            <li>
              Risk-Free Backing: Secure your investment with our transparent and
              secure crowdfunding model.
            </li>
          </ul>
        </div>

        <p>
          Join us in supporting creative projects and groundbreaking ideas.
          Whether you're a creator or a backer, our platform connects you to a
          world of possibilities.
        </p>

        <div className="action-buttons">
          <p>Ready to get started and begin your crowdfunding journey today!</p>
          <div>
            <button onClick={handleVisitDashboard} className="dashboard-link">
              Visit your Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
