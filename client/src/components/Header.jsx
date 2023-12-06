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
    backgroundImage: `url(${Banner})`, // Replace with the path to your image
    backgroundSize: 'cover', // Ensure the image covers the entire header
    backgroundRepeat: 'no-repeat', // Do not repeat the image
  };
  return (
    <header className="text-light mb-4 py-3 flex-row align-center" style={headerStyle}>
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-dark" to="/">
            <h1 className="m-0">Journey Log</h1>
          </Link>
          <p className="m-0 text-dark">Share your travel experience with the world!</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Button color="success"
    size="lg" className='m-4' to="/login" href="/login">
                Login
              </Button>
              <Button color="success" size="lg" className='m-4' to="/signup" href="/signup">
                Signup
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
