import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer' style={{position: 'relative', backgroundColor: '#e5e5e5', display: 'flex', width: 'auto'}}>
            <div className='foot-container' style={{alignItems: 'center', padding: '25px 25px 25px 25px', display: 'block', position: 'relative', textAlign: 'left'}}>
                <div style={{alignItems: 'center'}}>
                    <Link className='footer-links' path='/about'>
                        <p>About us</p>
                    </Link>
                    <Link className='footer-links' path='/contactus'>
                        <p>Contact us!</p>
                    </Link>
                </div>
                <div style={{alignItems: 'center', float: 'right'}}>
                    <a className='footer-logo' href='https://www.instagram.com/realmizkif/' target='_blank' rel='noreferrer noopener'>
                        <i className='fab fa-instagram' style={{fontSize: '48px', color: 'rgb(0, 0, 0)'}}/>
                    </a>
                    <a className='footer-logo' target='_blank' rel="noreferrer noopener" href='https://github.com/JCamyre'>
                        <i className="fab fa-github" style={{fontSize: '48px', color: 'rgb(0, 0, 0)'}} />
                    </a>
                </div>
            </div>

        </footer>
    )
}

export default Footer
