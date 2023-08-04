import './Logo.scss';
import logo from '../../assets/images/logo.png';

const Logo = () => {
  return (
    <div className="logo">
      <img className="rounded w-100 h-100" src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
