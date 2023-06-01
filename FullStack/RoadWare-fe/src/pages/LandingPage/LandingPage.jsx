import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import("./LandingPage.css");
function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">

      <div className="welcome-container">
        <h1>RoadWare</h1>
        <h4>Your Ultimate Safe Route Companion!</h4>
        <img
          className="landingpageimage"
          src="https://res.cloudinary.com/dcidne2pg/image/upload/v1685563481/ou0g6ro74dgtm8p6jju07kc0sf_3_1_wru1nt.png"
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
