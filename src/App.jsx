import React, { useState } from "react";
import LogoScreen from "./components/LogoScreen";
import QRScanner from "./components/QRScanner";
import DestinationInput from "./components/DestinationInput";
import MapView from "./components/MapView";

function App() {
  const [step, setStep] = useState("logo");
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleLogoFinish = () => setStep("scan");
  const handleScanSuccess = (data) => {
    setSource(data);
    setStep("input");
  };
  const handleDestinationSubmit = (dest) => {
    setDestination(dest);
    setStep("map");
  };

  return (
    <>
      {step === "logo" && <LogoScreen onFinish={handleLogoFinish} />}
      {step === "scan" && <QRScanner onScanSuccess={handleScanSuccess} />}
      {step === "input" && <DestinationInput onSubmit={handleDestinationSubmit} />}
      {step === "map" && <MapView from={source} to={destination} />}
    </>
  );
}

export default App;
