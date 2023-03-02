import ProfileImage from "../assets/images/profile.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header cards">
      <div className="logo">
        <Link to={"/dashboard"}>
          <img
            alt="logo"
            src={"/images/nagarro.svg"}
            height={35}
            style={{ marginLeft: 8 }}
          />
        </Link>
      </div>
      <input type="text" name="search" placeholder="Search" />
      <div className="profile-info">
        <span>Welcome, Andrew</span>
        <img src={ProfileImage} alt="user" height={48} />
      </div>
    </div>
  );
}
