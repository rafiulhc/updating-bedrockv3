import React from "react";
import styled from "styled-components";

const ULi = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 60px;

  position: absolute;
  width: 738px;
  height: 19px;
  left: 30%;
  top: 20px;
`;

const Lii = styled.li`
  height: 19px;

  font-family: "Gotham";
  font-style: normal;
  font-weight: 325;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.02em;
  list-style: none;

  color: #ffffff;
`;

const Main = styled.div`
  position: relative;
  height: 9549px;
  width: 100%;

  background: #000216;
`;

function Nav() {

  return (
    <>
      <Main>
       
        <ULi>
          <Lii>Home</Lii>
          <Lii>Swap</Lii>
          <Lii>Earn Bitcoin</Lii>
          <Lii>Projects</Lii>
          <Lii>Stake rock</Lii>
        </ULi>
      </Main>
    </>
  );
}

export default Nav;
