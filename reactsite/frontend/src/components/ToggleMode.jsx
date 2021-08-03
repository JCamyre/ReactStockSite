import React from 'react';
import {ThemeConsumer} from 'styled-components';
import ToggleButton from './ToggleButton';

export default function ToggleMode() {
    return (
        <button onClick={(e) => props.theme_setter(props.theme.mode === 'dark' ? {...theme, mode: 'light'} : {...theme, mode: 'dark'})}>yo</button>
    )
}