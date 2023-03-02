import ProfileImage from "../assets/images/profile.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <span>All Rights Reserved &copy; {year} Nagarro</span>
      <img
        alt="logo"
        src={"/images/nagarro.svg"}
        height={20}
        style={{ marginLeft: 8 }}
      />
    </div>
  );
}
