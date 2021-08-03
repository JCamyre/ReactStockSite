import React from 'react';
import {ThemeConsumer} from 'styled-components';
import ToggleButton from './ToggleButton';

export default function ToggleMode() {
    return (
        <ThemeConsumer>
            {theme => (
                <ToggleButton
                    variant='primary'
                    onClick = {(e) => 
                        theme.setTheme(theme.mode === 'dark' ? {...theme, mode: 'light' } : {...theme, mode: 'dark' })
                    }>
                Toggle Theme
                </ToggleButton>
            )}
        </ThemeConsumer>
    )
}