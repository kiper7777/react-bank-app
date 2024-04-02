import "./index.css";
import welcome from './component/welcome/welcome.svg';
// import '.App.tsx';

export default function Welcome({ children, className, button }) {
  return (
    <div className="welcome">
      <div className="welcome-title">Hello!</div>;
      <p className="welcome-description">Welcome to bank app</p>
      <img src={welcome} className="welcome-image" alt="image"/>;
      <div className="welcome-button">
        <button>Sign Up</button>
        <button>Sign Up</button>
      </div>
    </div>
  )
}
