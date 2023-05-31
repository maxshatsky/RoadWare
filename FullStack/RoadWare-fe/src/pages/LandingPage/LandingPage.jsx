import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import("./LandingPage.css");
function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <img
        className="dangerimage"
        src="https://i.ibb.co/BK7WqvT/yield-sign-computer-icons-traffic-sign-clip-art-danger-0e2b58c4f8037fdf22e9b04b4d03b37f.png"
      ></img>

      <div className="welcome-container">
        <h1>Welcome to RoadWare</h1>
        <h4>Your Ultimate Safe Route Companion!</h4>
        <img
          className="landingpageimage"
          src="https://i.ibb.co/VHMXpmr/ou0g6ro74dgtm8p6jju07kc0sf.png"
        ></img>
        <p>
          Safest routes, prevents crashes, highlights dangers. Your ultimate
          safe route companion.
        </p>
        <Button onClick={() => navigate("/navigation")}>Get Started!</Button>
      </div>
    </div>
  );
}

export default LandingPage;
