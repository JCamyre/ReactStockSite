import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{position: 'relative', backgroundColor: '#e5e5e5', display: 'flex', width: 'auto'}}>
            <div style={{alignItems: 'center', padding: '25px 25px 25px 25px'}}>
                <div>
                    <Link path='/aboutus'>
                        <p>About us</p>
                    </Link>
                    <Link path='contactus'>
                        <p>Contact us!</p>
                    </Link>
                </div>
                <div>
                    <a href='https://www.instagram.com/realmizkif/' target='_blank' rel='noreferrer noopener'>
                        <i className='fab fa-instagram' style={{fontSize: '48px', color: 'rgb(0, 0, 0)'}}/>
                    </a>
                    <a target='_blank' rel="noreferrer noopener" href='https://github.com/JCamyre'>
                        <i className="fab fa-github" style={{fontSize: '48px', color: 'rgb(0, 0, 0)'}} />
                    </a>
                </div>
            </div>

        </footer>
    )
}

export default Footer
