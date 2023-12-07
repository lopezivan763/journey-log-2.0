import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto is-success p-4">
      <div className="container text-center text-light mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-secondary mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by Ivan Lopez, Max Blaul and Jackson Neuman. 
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
