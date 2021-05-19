import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import React, { useState } from 'react';
import { red, blue, green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

export default function CustomCarousel () {
    const [open, setOpen] = useState(false);
   
    return (
        <div style={{ position: 'relative', width: '100%', height: 500 }}>
            <Button color='white' onClick={() => setOpen(true)}>Open Carousel</Button>
            <AutoRotatingCarousel
                label='See What We Do!'
                open={open}
                onClose={() => setOpen(false)}
                onStart={() => setOpen(false)}
                style={{ position: 'absolute' }}
            >
                <Slide 
                    media = {<img src='https://external-preview.redd.it/CSVwH8lIonZ9Rrh6Y2rjBPToSv-GztQDGdYzLcHB8_k.jpg?auto=webp&s=b08f0781847a2017fde0cf926eb1cf7a1509899f' />}
                    mediaBackgroundStyle = {{ backgroundColor: red[400] }}
                    style = {{ backgroundColor: red[600] }}
                    title = "Check out our customers' big wins!"
                    subtitle = 'Big dubs!!!😂'
                />
                <Slide 
                    media = {<img src='https://cdn.vox-cdn.com/thumbor/6oEPJ9s5H9rzubYWS-LKBWhNE9k=/0x0:3000x2225/1200x800/filters:focal(1082x339:1562x819)/cdn.vox-cdn.com/uploads/chorus_image/image/66609943/GettyImages_137497593.0.jpg' />}
                    mediaBackgroundStyle = {{ backgroundColor: red[400] }}
                    style = {{ backgroundColor: red[600] }}
                    title = 'Tiger.'
                    subtitle = 'Cutie 🥰!'
                />                
            </AutoRotatingCarousel>
        </div>
    )
}

