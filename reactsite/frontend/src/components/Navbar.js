import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

export default function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navbar, setNavbar] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    // When ever the screen is resized, run showButton to check to see window's width. If less than or equal to 960, don't show button. 
    window.addEventListener('resize', showButton);

    const changeBackground = () => {
        if(window.scrollY > 150){
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    // "Listens" for when user scrolls. When they scroll, run changeBackground.
    window.addEventListener('scroll', changeBackground);

    return (
        <nav className={navbar ? 'navbar active' : 'navbar'}>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    yo <i className="fas fa-rocket" style={{color: '#fff'}} />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        {/* We don't want menu open once we click to go to a different page.  */}
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        {/* We don't want menu open once we click to go to a different page.  */}
                        <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                            About Us
                        </Link>
                    </li>
                    <li className='nav-item'>
                        {/* We don't want menu open once we click to go to a different page.  */}
                        <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>Sign Up</Button>}
            </div>
        </nav >
    )
}

// export default Navbar
