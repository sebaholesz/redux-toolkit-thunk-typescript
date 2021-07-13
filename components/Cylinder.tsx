import React, { FC } from "react";

import { useAppSelector } from "../redux/store/index";

const Cylinder:FC = () => {
  const isEngineOn = useAppSelector((state) => state.car.isEngineOn);
  
  return (
    <div
      style={{
        borderRadius: "100%",
        width: "80px",
        height: "80px",
        margin: "30px",
        backgroundColor: isEngineOn ? "green" : "red",
      }}
    ></div>
  );
};

export default Cylinder;
