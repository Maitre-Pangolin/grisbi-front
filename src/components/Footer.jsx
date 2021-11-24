import React from "react";
import { selectCurrentMonthTotals } from "../features/Totals/totalsSlice";
import { useSelector } from "react-redux";
import { getCurrentDateString } from "../utils";

const Footer = () => {
  const currentTotal = useSelector(selectCurrentMonthTotals);
  const currentBudget = 1500; //Use select on budget slice
  const isOverBudget = currentTotal > currentBudget;
  return (
    <footer>
      <h3>
        {getCurrentDateString()} :{" "}
        <span style={{ color: isOverBudget ? "red" : "green" }}>
          {currentTotal} / {currentBudget}
        </span>{" "}
        CAD
      </h3>
    </footer>
  );
};

export default Footer;
