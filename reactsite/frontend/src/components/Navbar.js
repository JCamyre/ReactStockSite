import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import theme from 'styled-theming';
import { Button } from './Button';
import ToggleMode from './ToggleMode';
import './Navbar.css';

export default function Navbar(props) {
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
                        <Link to='/' className={navbar ? 'nav-links active' : 'nav-links'} onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        {/* We don't want menu open once we click to go to a different page.  */}
                        <Link to='/about' className={navbar ? 'nav-links active' : 'nav-links'} onClick={closeMobileMenu}>
                            About Us
                        </Link>
                    </li>
                    
                    <li className='nav-item'>
                        {/* We don't want menu open once we click to go to a different page.  */}
                        <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Sign Up
                        </Link>
                    </li>
                    <li className='nav-item nav-links'>
                        <ToggleMode />
                    </li>
                    {/* <li className='nav-item'>
                        <button
                            onClick={e =>
                            props.theme.setTheme(
                                props.theme.textZoom === 'normal'
                                ? { ...theme, textZoom: 'magnify' }
                                : { ...theme, textZoom: 'normal' }
                            )
                            }
                        >
                            Toggle text size
                        </button>
                    </li> */}
                </ul>
                {button && <Button buttonStyle='btn--outline'>Sign Up</Button>}
            </div>
        </nav >
    )
}

// export default Navbar
