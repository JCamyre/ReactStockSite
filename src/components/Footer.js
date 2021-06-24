import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div style={{alignItems: 'center', padding: '25px 25px 25px 25px', }}>
                {/* <div>
                    <Button>
                        <p>About us</p>
                        <Link />
                    </Button>
                    <Button>
                        <p>Contact us!</p>
                        <Link />
                    </Button>
                </div> */}
                <div>
                    <a href='#'>
                        <i class='fab fa-instagram' style={{fontSize: '48px'}}/>
                    </a>
                    <a href='https://github.com/JCamyre'>
                        <i class="fab fa-github" style={{fontSize: '48px'}} />
                    </a>
                </div>
            </div>

        </footer>
    )
}

export default Footer
