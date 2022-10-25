import React, { PropsWithChildren } from 'react';
import { CardBorder } from './CardBorder';
import { CardContainer } from './CardContainer';


type PixelValue = `${number}px`;
type PercentValue = `${number}%`;
interface CardProps extends PropsWithChildren {
    height?: PixelValue | PercentValue;
    width?: PixelValue | PercentValue;
    border?: PixelValue;
    maxWidth?: PixelValue | PercentValue;
}
export const Card: React.FC<CardProps> = ({children, height, width, border, maxWidth}: CardProps) => {
    return (
        <CardBorder maxWidth={maxWidth} style={{height: height, width: width, padding: border}}>
            <CardContainer maxWidth={maxWidth} style={{height: '100%'}}>
                {children}
            </CardContainer>
        </CardBorder>
    )
}