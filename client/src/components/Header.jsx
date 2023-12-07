import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Auth from '../utils/auth';
import Banner from '../../public/banner.jpg'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const headerStyle = {
    backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.9), rgba(260, 26, 26, 0.1)), url(${Banner})`, 
    backgroundSize: 'cover', // Ensure the image covers the entire header
    backgroundRepeat: 'no-repeat', // Do not repeat the image
    padding: '20px', // Added padding for better spacing
    position: 'relative', 
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Box shadow effect
    borderRadius: '10px', // Rounded corners for the card
  };

  return (
    <header className="text-light mb-4 py-3" style={headerStyle}>
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <Link className="text-decoration-none" to="/">
            <h1 className="m-0 text-dark">Journey Log</h1>
          </Link>
          <p className="m-0 text-dark">Share your travel experience with the world!</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <div className="d-flex align-items-center">
              <Link className="btn btn-lg btn-secondary me-3" to="/me">
                {Auth.getProfile().data.username}'s Profile
              </Link>
              <Button color="danger" size="lg" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="d-flex">
              <Button color="dark" size="lg" className="me-3" to="/login">
                Login
              </Button>
              <Button color="dark" size="lg" to="/signup">
                Signup
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
