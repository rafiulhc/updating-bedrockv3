import React from 'react';
import styled from 'styled-components';

const SelectButtonBorder = styled.div`
    padding: 2px;
    border-radius: 60px;
    background: rgb(236,136,64);
    background: linear-gradient(to bottom, #EC884540, #87324240);
    width: 100%;
`

const SelectButton = styled.button`
    color: #ffffff;
    background-color: #000216;
    box-shadow: inset 0px 4px 50px rgba(209, 115, 93, 0.25);
    border-radius: 60px;
    width: 100%;
    padding: 4px 30px;
    font-size: 24px;
    font-weight: 400;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:focus {
        border: none;
        outline: none;
    }
`

const SelectionOptionsContainer = styled.div`
width: 100%;
    max-height: 600px;
    background-color: rgba(0,0,0,0.95);
    position: absolute;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 10;
`

const SelectionOption = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 100%;
    padding: 20px 25px;
    color: #ffffff;
    gap: 25px;

    background-color: rgba(0,0,0,0);
    &:hover {
        background-color: rgba(255,255,255,0.25);
        cursor: pointer;
    }
`

export interface Data {
    text: string;
    value: string;
}

interface SelectProps {
    data: Data[];
    onSelection: (val: Data) => void;
}
export const Select: React.FC<SelectProps> = ({data, onSelection}: SelectProps) => {
    const menuRef = React.useRef<HTMLDivElement>();
    const [selected, setSelected] = React.useState<string | null>(null)

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

    return (
        <div style={{position: 'relative'}}>
            <SelectButtonBorder>
                <SelectButton onClick={() => {toggleMenu()}}>
                    <div>                        
                        {selected ? selected : 'Choose One'}
                    </div>
                    <img src='images/arrowdown.png' />
                </SelectButton>
            </SelectButtonBorder>
            <SelectionOptionsContainer ref={menuRef}>
                {data.map((val, index) => (
                    <SelectionOption key={val.text} onClick={() => {
                        hideMenu();
                        setSelected(val.text);
                        onSelection(val)
                    }}>
                        {val.text}
                    </SelectionOption>
                ))}
            </SelectionOptionsContainer>
        </div>
    )
}