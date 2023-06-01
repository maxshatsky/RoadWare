import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import NavigationPage from "./pages/NavigationPage/NavigationPage";
import LegendColors from "./pages/NavigationPage/LegendColors";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/navigation"} element={<NavigationPage />} />
      </Routes>
    </div>
  );
}

export default App;
