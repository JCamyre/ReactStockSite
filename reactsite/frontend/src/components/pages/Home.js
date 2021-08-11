import React from 'react';
import { Grid, Typography } from '@material-ui/core';
// import HeroSection from '../HeroSection.js';
// import Cards from '../Cards.js';
// import Chart from '../Chart';
// import Parallax from '../Parallax';
// import bg_img from '../../images/bg-img-1.jpg';
import SearchBar from '../SearchBar';

  
export default function Home() {
    const background_image = require("../../images/bg-img-3.jpg").default;

    return (
        
        <div>
            <Grid container spacing={1}>
            {/* Good video for a drop down menu: https://www.youtube.com/watch?v=IF6k0uZuypA */}
                <Grid item align='center' style={{margin: 'auto'}}>
                    <div style={{backgroundImage: "url(" + background_image + ")", backgroundSize: 'auto', 
                        boxShadow: '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)', 
                        width: '50%', height: '750px',padding: '0px 35px 0px 35px', position: 'relative',
                        filter: 'brightness(90%)'}}>
                        <Grid item xs={12} align='flex-start' style={{filter: 'brightness(100%)', position: 'relative', left: '-500px', top: '345px'}}>
                            <SearchBar />
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={12} align='center' style={{padding: '0px 75px', zIndex: 1}}>
                    <div className="container" style={{margin: 'auto', fontWeight: '300px', fontFamily: ['Roboto', 'Helvetica'], padding: '40px 60px',
                        lineHeight: '1.5em', borderRadius: '6px',
                        boxShadow: '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)'}}>
                        <p>Product info here.</p>
                        <Grid item xs={12} align='center'>
                            <h2>YO</h2>
                        </Grid>
                        <Grid item xs={12} align='center'>
                            <h5>YO</h5>
                        </Grid>
                        <Grid item xs={12} align='center'>
                            <h3>Every landing page needs a small description after the big bold title, 
                                that's why we added this text here. Add here all the information that 
                                can make you or your product create the first impression.
                            </h3>                        
                        </Grid>
                        <Grid item xs={12} align='center'>
                            <img style={{height: 'auto', width: '100%', borderRadius: '6px'}} alt='panda'
                            src='https://im-media.voltron.voanews.com/Drupal/01live-166/styles/sourced/s3/2019-04/3ED6FCAB-D280-4197-8B02-BCCD9846076A.jpg?itok=EKczHCGX' />
                        </Grid>
                    </div>
                </Grid>
                {/* <Grid item xs={12} align='center'>
                    <CustomCarousel />
                </Grid> */}
            </Grid>        
        </div>
    );
}
