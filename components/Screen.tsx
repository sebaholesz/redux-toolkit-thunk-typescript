import React, { FC } from "react";

import {
  carActions,
  fix,
  useAppDispatch,
  useAppSelector,
} from "../redux/store";

const Screen: FC = () => {
  const dispatch = useAppDispatch();
  const isEngineOn = useAppSelector((state) => state.car.isEngineOn);
  const oilLevel = useAppSelector((state) => state.car.oilLevel);
  const error = useAppSelector((state) => state.car.error);
  const isBeingFixed = useAppSelector((state) => state.car.isBeingFixed);

  const carStartHandler = () => {
    dispatch(carActions.start());
  };

  const carStopHandler = () => {
    dispatch(carActions.stop());
  };

  const carGoHandler = () => {
    dispatch(carActions.go(Math.random() * 100));
  };

  const fixHandler = () => {
    dispatch(fix());
  };

  return (
    <>
      <button disabled={isEngineOn || oilLevel === 0} onClick={carStartHandler}>
        Start
      </button>
      <button disabled={!isEngineOn} onClick={carStopHandler}>
        Stop
      </button>
      <button disabled={!isEngineOn} onClick={carGoHandler}>
        Go
      </button>
      <div
        style={{
          width: "50%",
          borderRadius: "10px",
          boxShadow: "0 0 5px rgba(1,1,1,0.5)",
          height: "120px",
          backgroundColor: "lightblue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {error && (
          <>
            <h3>{error}</h3>
            <button onClick={fixHandler}>Fix it</button>
          </>
        )}
        {isBeingFixed && <h3>Car is being fixed...</h3>}
      </div>
    </>
  );
};

export default Screen;
