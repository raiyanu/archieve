import React from "react";
import "./icon.css";

const YourComponent = () => {
  return (
    <div className="icon">
      <svg
        width="375"
        height="311"
        viewBox="0 0 375 311"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fc"
      >
        <g id="logo">
          <path
            id="outer"
            d="M183.946 303.774L6.75056 10.5516C5.54231 8.55221 6.98202 6 9.31814 6H365.652C367.994 6 369.433 8.56493 368.212 10.564L189.074 303.787C187.901 305.707 185.11 305.7 183.946 303.774Z"
            stroke="#0070f0"
            strokeWidth="11"
            style={{ stroke: "#0070f0" }}
          />
          <path
            id="center"
            d="M191.265 13.1661L272.494 149.44C274.48 152.773 272.079 157 268.199 157L104.851 157C100.96 157 98.56 152.752 100.568 149.419L182.687 13.1455C184.637 9.91068 189.331 9.92195 191.265 13.1661Z"
            stroke="#256BF4"
            strokeWidth="9"
          />
        </g>
      </svg>
    </div>
  );
};

export default YourComponent;
