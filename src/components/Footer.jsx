import React from "react";
import { selectCurrentMonthTotals } from "../features/Totals/totalsSlice";
import { useSelector } from "react-redux";
import { getCurrentDateString } from "../utils";
import { Snackbar } from "@mui/material";

const FooterMessage = () => {
  const currentTotal = useSelector(selectCurrentMonthTotals);
  const currentBudget = 1500; //Use select on budget slice
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p
        style={{
          fontWeight: "bold",
          textDecorationLine: "underline",
          margin: "5px 5px",
        }}>
        {getCurrentDateString()}
      </p>
      <p
        style={{
          margin: "5px 5px",
          textAlign: "center",
        }}>
        {currentTotal?.toFixed(0)} / {currentBudget?.toFixed(0)} CAD
      </p>
    </div>
  );
};

const Footer = () => {
  const remaining = 1500 - useSelector(selectCurrentMonthTotals); //replace by budget slice
  const isOverBudget = remaining < 0;
  return (
    <footer>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={true}
        message={<FooterMessage />}
        action={
          <h2 style={{ color: isOverBudget ? "red" : "green" }}>
            {remaining} CAD
          </h2>
        }
      />
    </footer>
  );
};

export default Footer;
