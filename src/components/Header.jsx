import React from "react";
import { Link } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BarChartIcon from "@mui/icons-material/BarChart";
import ROUTES from "../app/routes";

const Header = () => {
  return (
    <header>
      <Link to='/'>
        <h1>GRISBI</h1>
      </Link>
      <nav>
        <Link to={ROUTES.currentMonthlyRoute()}>
          <BarChartIcon fontSize='large' style={{ margin: "0 40px" }} />
        </Link>
        <Link to={ROUTES.monthsRoute()}>
          <CalendarTodayIcon fontSize='large' />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
