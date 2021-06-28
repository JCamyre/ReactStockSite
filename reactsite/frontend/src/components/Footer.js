import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer' style={{position: 'relative', backgroundColor: '#e5e5e5', display: 'flex', width: 'auto'}}>
            <div className='foot-container'>
                <Link className='footer-link' path='/about'>
                    <p>About us</p>
                </Link>
                <Link className='footer-link' path='/contactus'>
                    <p>Contact us!</p>
                </Link>
                <ul className='footer-menu'>
                    <li className='footer-item'>
                        <a className='footer-logo' href='https://www.instagram.com/realmizkif/' target='_blank' rel='noreferrer noopener'>
                            <i className='fab fa-instagram' style={{fontSize: '48px'}}/>
                        </a>
                    </li>
                    <li className='footer-item'>
                        <a className='footer-logo' target='_blank' rel="noreferrer noopener" href='https://github.com/JCamyre'>
                            <i className="fab fa-github" style={{fontSize: '48px'}} />
                        </a>
                    </li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer
