import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250
    });

    scanner.render(
      (decodedText) => {
        scanner.clear();
        onScanSuccess(decodedText);
      },
      (error) => {
        // optional console.log(error)
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error("Clear failed", err));
    };
  }, [onScanSuccess]);

  return (
    <div>
      <h2>Scan the QR code of your location</h2>
      <div id="reader" style={{ width: "100%" }}></div>
    </div>
  );
};

export default QRScanner;
