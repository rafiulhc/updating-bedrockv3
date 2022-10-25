import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Card } from "../Card/Card";

const SectionContainer = styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    padding: 30px;
`
const Form = styled.form`
    box-sizing: border-box;
    display: grid;
    place-items: center;
    width: 100%;
    padding: 7% 10%;
`

interface SwapFormProps extends PropsWithChildren {
    onSubmit: React.FormEventHandler<HTMLFormElement>
}
export const SwapForm: React.FC<SwapFormProps> = ({children, onSubmit}: SwapFormProps) => {
    return (
        <SectionContainer>
            <Card maxWidth="763px">
                <Form onSubmit={onSubmit}>
                    {children}
                </Form>
            </Card>

        </SectionContainer>
    )
}