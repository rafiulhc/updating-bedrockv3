import React from 'react';
import { FormContext } from '../../contexts/FormContext';

interface BLOptions {
    defaultSelection: string;
    selectionIndex: number;
    field: '1' | '2';
}
export const useBL = ({ defaultSelection, selectionIndex, field }: BLOptions) => {
    const menuRef = React.useRef<HTMLDivElement>();
    const formContext = React.useContext(FormContext);

    React.useLayoutEffect(() => {
        menuRef.current.style.display = 'none';
    }, [])

    const toggleMenu = () => {
        if (menuRef.current.style.display === 'none') {
            menuRef.current.style.display = 'flex';
        } else {
            menuRef.current.style.display = 'none';
        }
    }
    const hideMenu = () => {
        menuRef.current.style.display = 'none';
    }
    return {menuRef, toggleMenu, hideMenu, formContext}
}