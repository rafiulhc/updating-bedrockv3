/**
 * Default margins
 */
import React, { CSSProperties, PropsWithChildren } from "react";
import styled from "styled-components";

interface SectionMarginProps extends PropsWithChildren {
    style?: CSSProperties;
}
const Margins = styled.div`
`
export const SectionMargin: React.FC<SectionMarginProps> =
    ({
        children,
        style,
    }: SectionMarginProps) => {
    return (
        <Margins style={{marginTop: '30px', marginBottom: '30px', ...style}}>
            {children}
        </Margins>
    )

}