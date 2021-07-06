import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer' style={{position: 'relative', backgroundColor: '#e5e5e5', display: 'flex', width: 'auto', zIndex: 0}}>
            <div className='foot-container'>
                <ul className='footer-menu'>
                    <li className='footer-item'>
                        <Link className='footer-link' path='/about'>
                            <p>About us</p>
                        </Link>
                    </li>
                    <li className='footer-item'>
                        <Link className='footer-link' path='/contactus'>
                            <p>Contact us!</p>
                        </Link>
                    </li>
                    <div class='wrapper'>
                        <li className='footer-item' style={{padding: '0px 10px'}}>
                            <div class='icon instagram'>
                                <div class='tooltip'>Instagram</div>
                                    <span>
                                        <a className='footer-logo' href='https://www.instagram.com/realmizkif/' target='_blank' rel='noreferrer noopener'>
                                            <i className='fab fa-instagram' style={{fontSize: '24px'}}/>
                                        </a>
                                    </span>
                            </div>
                        </li>
                        <li className='footer-item' style={{padding: '0px 10px'}}>
                            <div class='icon github'>
                                <div class='tooltip'>Github</div>
                                    <span>
                                        <a className='footer-logo' target='_blank' rel="noreferrer noopener" href='https://github.com/JCamyre'>
                                            <i id='github' className="fab fa-github" style={{fontSize: '24px'}} />
                                        </a>
                                    </span>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
