import React, { FC, useEffect } from "react";

import { carActions, useAppDispatch, useAppSelector } from "../redux/store";
import Cylinder from "./Cylinder";
import OilPump from "./OilPump";

const Engine:FC = () => {
  const dispatch = useAppDispatch();
  const oilLevel = useAppSelector((state) => state.car.oilLevel);

  useEffect(() => {
    if (oilLevel === 0) dispatch(carActions.notifyError());
  }, [oilLevel, dispatch]);

  return (
    <>
      <Cylinder />
      <OilPump />
    </>
  );
};

export default Engine;
