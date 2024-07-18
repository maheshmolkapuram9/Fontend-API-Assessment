import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const location = useLocation();

    return ( 
        <div className="header">
            <h1><Link to="/">Frontend API Assessment</Link></h1>
            <div>
                {location.pathname !== "/add" &&
                <Link to="/add">+ Add new post</Link>
                }
            </div>
        </div>
     );
}
 
export default Header;