import { Outlet, Link } from "react-router-dom";
import { Fragment, 
         useContext 
        } from "react";

import { ReactComponent as CrownLogo } from '../../../assets/crown.svg';
import { UserContext } from "../../../contexts/user.contexts";
import { CartContext } from "../../../contexts/cart.context";

import { signOutUser } from "../../../services/firebase/firebase.services";

import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import './navigation.styles.scss';

const Navigation = () =>{
  const { currentUser, 
          // setCurrentUser 
        } = useContext(UserContext);

  // const signOutHandler = async() => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // }

  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
              SHOP
          </Link>
          <Link className="nav-link" to="/contacts">
              CONTACTS
          </Link>
          {
            currentUser ? 
            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span> : 
            <Link className="nav-link" to="/auth">SIGN IN</Link>
          }
          <CartIcon/>
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet/>
    </Fragment>
  );
}

export default Navigation