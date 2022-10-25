import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Col as BCol } from "react-bootstrap";
import axios from "axios";
import useTheme from "../../../hooks/useTheme";
import close from "./utils/close.png";
import useActiveWeb3React from "../../../hooks/useMetaMask";

interface StyledProps {
  isDark?: boolean;
  isMobile?: boolean;
  show?: boolean;
  left?: boolean;
}

const FlexCol = styled(BCol)`
  min-height: ${({ isMobile }: StyledProps) =>
    isMobile ? "calc(100vh - 204px);" : "calc(100vh - 267px);"};
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: auto;
  flex: 1;
  flex-wrap: wrap;
`;
const AdminTable = styled.div`
  width: ${({ isMobile }: StyledProps) => (isMobile ? "90%" : "60%")};
  height: auto;
  display: flex;
  background: yellow;
  margin: auto;
  border-radius: 20px;
  flex-direction: column;
`;
const THeader = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: #02042b;
  color: #fff;
  border-radius: 20px 20px 0 0;
`;
const TableBody = styled.div`
  display: flex;
  width: 100%;
  min-height: 200px;
  justify-content: space-around;
  padding: 20px;
  background-color: #874452;
  color: #fff;
  border-radius: 0 0 20px 20px;
  flex-direction: column;
`;
const TableContent = styled.div`
  display: flex;
`;
const TableLeft = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;
const TableRight = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
`;
const H1 = styled.h1`
  font-size: 20px;
  text-align: center;
`;
const Close = styled.img`
  width: 20px;
  height: 20px;
`;
const AddNewAdmin = styled.div`
  margin: auto;
  width: ${({ isMobile }: StyledProps) => (isMobile ? "90%" : "60%")};
  height: 60px;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  background: #87445299;
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 15px;
  color: #fff;
  margin: 5px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #ffffff88;
    font-size: 15px;
  }
  :-ms-input-placeholder {
    color: #ffffff88;
  }
`;
const AddButton = styled.button`
  border-radius: 10px;
  background-color: #02042b;
  color: #fff;
`;
const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [adminAccount, setAdminAccount] = useState("");
  const { account } = useActiveWeb3React();
  const { isMobile } = useTheme()

  // eslint-disable-next-line no-restricted-globals
  const API =
    location.hostname === "localhost"
      ? "http://localhost:8080"
      : "https://bedrock-backend.vercel.app";

  useEffect(() => {
    async function data() {
      await axios
        .get(`/api/getAdmins`)
        .then((res) => {
          setAdmins(res.data.admins);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    data();
  }, [API]);

  function RemoveAdmin(id) {
    const data = {
      id,
      state: false,
    };
    axios
      .post(`${API}/postAdmin`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function AddAdmin() {
    const data = {
      account: adminAccount,
      state: true,
    };
    axios
      .post(`${API}/postAdmin`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <FlexCol isMobile={isMobile}>
      <AdminTable isMobile={isMobile}>
        <THeader>
          <H1 style={{ width: "70%" }}>Address</H1>
          <H1 style={{ width: "30%" }}>Remove Admin</H1>
        </THeader>
        <TableBody>
          {admins.length !== 0 &&
            admins.map((admin, index) => {
              return (
                <React.Fragment key={index}>
                  <TableContent>
                    <TableLeft>
                      <p>{admin.account}</p>
                    </TableLeft>
                    <TableRight>
                      {account.toLowerCase() !==
                        admin.account.toLowerCase() && (
                        <Close
                          src={close.src}
                          alt="close"
                          onClick={() => RemoveAdmin(admin._id)}
                        />
                      )}
                    </TableRight>
                  </TableContent>
                </React.Fragment>
              );
            })}
        </TableBody>
      </AdminTable>
      <AddNewAdmin isMobile={isMobile}>
        <Input
          type="text"
          placeholder="Address"
          onChange={(e) => setAdminAccount(e.target.value)}
        />
        <AddButton onClick={() => AddAdmin()}>Add</AddButton>
      </AddNewAdmin>
    </FlexCol>
  );
};

export default Admin;
