import { Link } from "react-router-dom"

import CROWN from './assets/crown.svg'

import './navigation.styles.scss'

export const NavigationBar = () => {
  return (
    <nav className="navigation">
      <div className="logo-container">
        <Link className="nav-link" to="/">
          <img
            className="logo"
            src={CROWN}
          />
        </Link>
      </div>
      <div className="nav-links-container">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="shop">Shop</Link>
        <Link className="nav-link" to="signIn">Sign-In</Link>
      </div>
    </nav>
  )
}
