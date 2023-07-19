import './Header.css';

export default function Header() {
  return (
    <ul className="navbar">
      <li className="nav-item">Weather</li>

      <li className="nav-item">Alert</li>
      <li className="nav-item">Map</li>
      <li className="nav-item">Satellite</li>
      <li className="nav-item">News</li>
    </ul>
  );
}
