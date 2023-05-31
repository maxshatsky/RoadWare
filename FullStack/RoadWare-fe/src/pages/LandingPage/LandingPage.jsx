import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to RoadWare</h1>
      <Button onClick={() => navigate("/navigation")}>Get Started!</Button>
    </div>
  );
}

export default LandingPage;
