import React, { FC } from "react";

import { useAppSelector } from "../redux/store";

const Oil:FC = () => {
  const oilLevel = useAppSelector((state) => state.car.oilLevel);
  
  return (
    <div
      style={{
        height: "150px",
        width: "80px",
        border: "1px solid grey",
        display: "flex",
        alignItems: "end",
      }}
    >
      <div
        style={{
          height: `${oilLevel}%`,
          width: "100%",
          backgroundColor: "yellow",
          borderRadius: "5px",
        }}
      ></div>
    </div>
  );
};

export default Oil;
